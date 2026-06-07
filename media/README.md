# Evidências — Front-End (Parte 2)

Esta pasta contém as evidências de execução do front-end com Nginx em container Docker, conforme exigido na Parte 2.

## Evidências necessárias

1. `01-frontend-nginx-8080.png` — Front-end aberto na porta `8080` do Codespaces, servido por Nginx em container Docker.
2. `02-frontend-consumindo-api.png` — Front-end consumindo a API do back-end em execução via Docker na porta 5000 do Codespaces.
3. `03-vercel-deployments.png` — Painel Deployments da Vercel com histórico de deploy do front-end.
4. `04-tag-v1.1.0.png` — Evidência da tag v1.1.0 no repositório front-end.

> **Instrução**: No Codespaces, executar `docker build -t noticias-front .` e depois `docker run -p 8080:80 noticias-front`, então acessar a porta 8080.
