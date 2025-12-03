#!/bin/bash

# R3-Builder Setup Automático
# Configura tudo para começar

set -e

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

clear
echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║      🛠️  R3-Builder Setup Automático   ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

# Step 1: Verificar Node/NPM
echo -e "${BLUE}📋 Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado!${NC}"
    echo "Instale em: https://nodejs.org/"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js ${NODE_VERSION}${NC}"

# Step 2: Instalar pnpm
echo ""
echo -e "${BLUE}📦 Configurando pnpm...${NC}"
npm install -g pnpm
PNPM_VERSION=$(pnpm -v)
echo -e "${GREEN}✅ pnpm ${PNPM_VERSION}${NC}"

# Step 3: Instalar Wrangler
echo ""
echo -e "${BLUE}🌐 Instalando Wrangler (Cloudflare)...${NC}"
pnpm install -g wrangler
echo -e "${GREEN}✅ Wrangler instalado${NC}"

# Step 4: Criar .env.local
echo ""
echo -e "${BLUE}🔑 Configurando variáveis de ambiente...${NC}"

if [ -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local já existe${NC}"
else
    cat > .env.local << 'EOF'
# === Chaves de API para LLM ===
# Escolha pelo menos 1 provider

# Google Gemini (GRATUITO - Recomendado)
# Obter em: https://aistudio.google.com/app/apikey
GOOGLE_GENERATIVE_AI_API_KEY=sua_chave_aqui

# OpenAI (Pago)
# Obter em: https://platform.openai.com/api-keys
# OPENAI_API_KEY=sua_chave_aqui

# Anthropic Claude (Pago)
# Obter em: https://console.anthropic.com/
# ANTHROPIC_API_KEY=sua_chave_aqui

# Outros providers (opcional)
# MISTRAL_API_KEY=sua_chave_aqui
# GROQ_API_KEY=sua_chave_aqui
# PERPLEXITY_API_KEY=sua_chave_aqui
EOF
    echo -e "${GREEN}✅ .env.local criado${NC}"
    echo -e "${YELLOW}⚠️  Configure suas chaves antes do deploy!${NC}"
fi

# Step 5: Git Setup
echo ""
echo -e "${BLUE}📝 Configurando Git...${NC}"

if ! git config user.name &> /dev/null; then
    read -p "Nome para commits (Git): " GIT_NAME
    git config user.name "$GIT_NAME"
fi

if ! git config user.email &> /dev/null; then
    read -p "Email para commits (Git): " GIT_EMAIL
    git config user.email "$GIT_EMAIL"
fi

echo -e "${GREEN}✅ Git configurado${NC}"

# Step 6: Instalar dependências
echo ""
echo -e "${BLUE}📦 Instalando dependências do projeto...${NC}"
pnpm install
echo -e "${GREEN}✅ Dependências instaladas${NC}"

# Step 7: Build Test
echo ""
echo -e "${BLUE}🔨 Testando build...${NC}"
pnpm run build
echo -e "${GREEN}✅ Build funcionando${NC}"

# Step 8: Cloudflare Login
echo ""
echo -e "${BLUE}🔐 Fazendo login no Cloudflare...${NC}"
wrangler login
echo -e "${GREEN}✅ Autenticado no Cloudflare${NC}"

# Summary
echo ""
echo -e "${GREEN}"
echo "╔════════════════════════════════════════╗"
echo "║      ✅ SETUP CONCLUÍDO COM SUCESSO   ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${BLUE}📋 Próximos passos:${NC}"
echo ""
echo "1️⃣  Configure suas chaves de API em .env.local:"
echo "   nano .env.local"
echo ""
echo "2️⃣  Execute deploy automático:"
echo "   ./scripts/auto-deploy.sh"
echo ""
echo "3️⃣  Ou teste localmente primeiro:"
echo "   pnpm run dev"
echo ""

echo -e "${YELLOW}📚 Recursos úteis:${NC}"
echo "  • Google Gemini API: https://aistudio.google.com/app/apikey"
echo "  • OpenAI API: https://platform.openai.com/api-keys"
echo "  • Documentação: ./CLOUDFLARE_DEPLOY.md"
echo ""

echo -e "${GREEN}🎉 R3-Builder está pronto para ir ao ar!${NC}"
echo ""
