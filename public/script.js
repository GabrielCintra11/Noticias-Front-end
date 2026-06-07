// URL do back-end publicado no Render
const API_URL = "https://noticias-backend-5ded.onrender.com";

// Consulta a rota /v1 ao carregar a página
async function chamarAPIv1() {
  const elemento = document.getElementById("resposta-v1");
  elemento.textContent = "Consultando...";

  try {
    const resposta = await fetch(`${API_URL}/v1`);
    const dados = await resposta.json();
    elemento.textContent = `${dados.message} — chamada em ${dados.chamada_em}`;
  } catch (erro) {
    elemento.textContent = "Erro ao consultar /v1: " + erro.message;
  }
}

// Carrega todas as notícias
async function carregarNoticias() {
  const container = document.getElementById("noticias");
  const mensagem = document.getElementById("mensagem");

  container.innerHTML = '<div class="loading">⏳ Carregando notícias...</div>';
  mensagem.innerHTML = "";

  try {
    const response = await fetch(`${API_URL}/noticias`);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const dados = await response.json();

    if (dados.noticias.length === 0) {
      container.innerHTML =
        '<p style="text-align: center; color: #999;">Nenhuma notícia encontrada</p>';
      return;
    }

    container.innerHTML = dados.noticias
      .map(
        (noticia) => `
      <div class="noticia">
        <h3>${noticia.titulo}</h3>
        <p>${noticia.descricao}</p>
        <div class="noticia-meta">
          <span class="categoria">${noticia.categoria}</span>
          <span>📅 ${noticia.data}</span>
          <span>🆔 ID: ${noticia.id}</span>
          <button class="btn-delete" onclick="deletarNoticia(${noticia.id})">🗑️ Remover</button>
        </div>
      </div>
    `
      )
      .join("");
  } catch (erro) {
    container.innerHTML = `<p style="color: red; text-align:center;">❌ Erro ao carregar: ${erro.message}</p>`;
  }
}

// Adiciona uma nova notícia
async function adicionarNoticia() {
  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const categoria = document.getElementById("categoria").value.trim();
  const mensagem = document.getElementById("mensagem");

  if (!titulo || !descricao) {
    mensagem.style.cssText = "background:#fff3f3; color:#c0392b;";
    mensagem.textContent = "⚠️ Título e descrição são obrigatórios!";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/noticias`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo,
        descricao,
        categoria: categoria || "Geral",
        data: new Date().toISOString().split("T")[0],
      }),
    });

    if (!response.ok) throw new Error("Erro ao adicionar");

    mensagem.style.cssText = "background:#f0fff4; color:#276749;";
    mensagem.textContent = "✅ Notícia adicionada com sucesso!";

    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("categoria").value = "";

    await carregarNoticias();
  } catch (erro) {
    mensagem.style.cssText = "background:#fff3f3; color:#c0392b;";
    mensagem.textContent = "❌ Erro ao adicionar: " + erro.message;
  }
}

// Remove uma notícia
async function deletarNoticia(id) {
  try {
    await fetch(`${API_URL}/noticias/${id}`, { method: "DELETE" });
    await carregarNoticias();
  } catch (erro) {
    alert("Erro ao remover: " + erro.message);
  }
}

// Inicialização
chamarAPIv1();
carregarNoticias();
