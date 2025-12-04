#!/bin/bash
# Fully automated helper for deploying R3-Builder to Vercel

set -euo pipefail

PROJECT_NAME="${VERCEL_PROJECT_NAME:-r3-builder}"
REPO_NAME="${VERCEL_REPO_NAME:-bolt.diy}"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT_DIR/.env.local"
REQUIRED_KEYS=("GOOGLE_GENERATIVE_AI_API_KEY" "OPENAI_API_KEY" "ANTHROPIC_API_KEY")
COLOR_RESET="\033[0m"
COLOR_STEP="\033[1;36m"
COLOR_OK="\033[1;32m"
COLOR_ERR="\033[1;31m"

step() {
  echo -e "${COLOR_STEP}\n➡️  $1${COLOR_RESET}"
}

ok() {
  echo -e "${COLOR_OK}✅ $1${COLOR_RESET}"
}

fail() {
  echo -e "${COLOR_ERR}❌ $1${COLOR_RESET}" >&2
  exit 1
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    fail "Ferramenta '$1' não encontrada. Instale e execute novamente. Sugestão: $2"
  fi
}

step "Verificando ferramentas"
require_cmd pnpm "npm install -g pnpm"
require_cmd vercel "npm install -g vercel"

if ! vercel whoami >/dev/null 2>&1; then
  step "Autenticando no Vercel"
  vercel login || fail "Login no Vercel cancelado. Execute 'vercel login' e rode o script novamente."
fi
ok "Autenticação confirmada"

step "Verificando .env.local"
if [ ! -f "$ENV_FILE" ]; then
  cp "$ROOT_DIR/.env.example" "$ENV_FILE" 2>/dev/null || true
  fail ".env.local não existe. Criei um template se disponível. Preencha com suas chaves e rode o script de novo."
fi

ENV_ARGS=()
for key in "${REQUIRED_KEYS[@]}"; do
  value="$(grep -E "^$key=" "$ENV_FILE" | tail -n 1 | cut -d '=' -f2- || true)"
  if [ -n "$value" ]; then
    ENV_ARGS+=("--env" "$key=$value")
  fi
done

if [ ${#ENV_ARGS[@]} -eq 0 ]; then
  fail "Nenhuma chave de LLM encontrada em .env.local. Adicione pelo menos uma (Google/OpenAI/Anthropic)."
fi
ok "Variáveis de ambiente detectadas"

step "Instalando dependências"
pnpm install --frozen-lockfile >/dev/null
ok "Dependências instaladas"

step "Executando build local"
pnpm run build >/dev/null
ok "Build gerado"

step "Ligando diretório ao projeto Vercel"
vercel link --project "$PROJECT_NAME" --yes --cwd "$ROOT_DIR" >/dev/null 2>&1 || true
ok "Diretório pronto"

step "Iniciando deploy"
vercel deploy \
  --cwd "$ROOT_DIR" \
  --name "$PROJECT_NAME" \
  --prod \
  --yes \
  --confirm \
  --build-env NODE_ENV=production \
  "${ENV_ARGS[@]}" || fail "Falha no comando vercel deploy"

ok "Deploy enviado! Confira o dashboard Vercel para o domínio final."
