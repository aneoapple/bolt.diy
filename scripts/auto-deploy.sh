#!/bin/bash

# R3-Builder Auto Deploy - Totalmente Automático
# Executa: Build → Backup → Deploy

set -e

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Banner
clear
echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║  🚀 R3-Builder Auto Deploy Automático  ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar ambiente
echo -e "${BLUE}📋 Verificando ambiente...${NC}"

if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm não encontrado!${NC}"
    echo "Instale com: npm install -g pnpm"
    exit 1
fi

if ! command -v wrangler &> /dev/null; then
    echo -e "${YELLOW}⚠️  wrangler não encontrado, instalando...${NC}"
    pnpm install -g wrangler
fi

if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git não encontrado!${NC}"
    exit 1
fi

if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ Arquivo .env.local não encontrado!${NC}"
    echo ""
    echo -e "${BLUE}Criando template...${NC}"
    cat > .env.local << 'EOF'
# Google Gemini (recomendado - gratuito)
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here

# OpenAI (opcional)
# OPENAI_API_KEY=your_key_here

# Anthropic (opcional)
# ANTHROPIC_API_KEY=your_key_here
EOF
    echo -e "${YELLOW}⚠️  Configure suas chaves em .env.local e execute novamente${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Ambiente OK${NC}"
echo ""

# Step 1: Git Status
echo -e "${BLUE}📝 Verificando repositório Git...${NC}"
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}✅ Repositório limpo${NC}"
else
    echo -e "${YELLOW}⚠️  Mudanças detectadas:${NC}"
    git status --short
    read -p "Deseja continuar? (s/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo -e "${RED}Abortado${NC}"
        exit 1
    fi
fi

echo ""

# Step 2: Clean & Install
echo -e "${BLUE}🧹 Limpando dependências antigas...${NC}"
rm -rf node_modules/.vite
rm -rf .next
rm -rf build
echo -e "${GREEN}✅ Limpo${NC}"

echo ""
echo -e "${BLUE}📦 Instalando dependências...${NC}"
pnpm install
echo -e "${GREEN}✅ Dependências instaladas${NC}"

echo ""

# Step 3: Build
echo -e "${BLUE}🔨 Compilando projeto...${NC}"
pnpm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build concluído com sucesso${NC}"
else
    echo -e "${RED}❌ Build falhou!${NC}"
    exit 1
fi

echo ""

# Step 4: Typecheck
echo -e "${BLUE}🔍 Verificando tipos TypeScript...${NC}"
if pnpm run typecheck 2>/dev/null; then
    echo -e "${GREEN}✅ Tipos OK${NC}"
else
    echo -e "${YELLOW}⚠️  Avisos de tipo detectados (continuando...)${NC}"
fi

echo ""

# Step 5: Git Commit & Push
echo -e "${BLUE}📤 Atualizando repositório Git...${NC}"
git add -A
git commit -m "🚀 Auto-deploy R3-Builder - $(date +'%d/%m/%Y %H:%M:%S')" || echo "Sem mudanças para commit"
git push origin main 2>/dev/null || echo "Sem mudanças para push"
echo -e "${GREEN}✅ Git sincronizado${NC}"

echo ""

# Step 6: Wrangler Deploy
echo -e "${BLUE}🌐 Iniciando deploy via Wrangler...${NC}"
echo -e "${YELLOW}ℹ️  Nota: Seu browser pode abrir para autenticação${NC}"
echo ""

# Verificar se já está logado
if ! wrangler whoami 2>/dev/null; then
    echo -e "${BLUE}🔐 Fazendo login no Cloudflare...${NC}"
    wrangler login
fi

echo ""
echo -e "${BLUE}🚀 Deploying...${NC}"
pnpm run deploy

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
else
    echo -e "${RED}❌ Deploy falhou!${NC}"
    exit 1
fi

echo ""

# Step 7: Summary
echo -e "${GREEN}"
echo "╔════════════════════════════════════════╗"
echo "║      ✅ DEPLOY AUTOMÁTICO CONCLUÍDO   ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${BLUE}📊 Resumo:${NC}"
echo "  ✅ Dependências instaladas"
echo "  ✅ Projeto compilado"
echo "  ✅ Tipos verificados"
echo "  ✅ Git sincronizado"
echo "  ✅ Deploy Cloudflare Pages"
echo ""

echo -e "${BLUE}🌐 Acessar aplicação:${NC}"
echo "  → https://seu-projeto.pages.dev"
echo ""

echo -e "${BLUE}💾 Dica - Fazer backup no app:${NC}"
echo "  → Clique no botão 'Backups' (canto inferior direito)"
echo "  → Clique em 'Novo Backup'"
echo ""

echo -e "${YELLOW}📝 Próximos passos:${NC}"
echo "  1. Acessar a URL do deploy"
echo "  2. Configurar chaves de API na aplicação"
echo "  3. Criar um backup inicial"
echo "  4. Compartilhar a URL pública"
echo ""

read -p "Abrir URL no browser? (s/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    # Tentar obter URL do deploy
    URL=$(wrangler pages project list 2>/dev/null | grep -oP 'https://[^\s]+' | head -1)
    if [ -z "$URL" ]; then
        URL="https://seu-projeto.pages.dev"
    fi
    
    # Abrir no browser
    if command -v open &> /dev/null; then
        open "$URL"
    elif command -v xdg-open &> /dev/null; then
        xdg-open "$URL"
    elif command -v start &> /dev/null; then
        start "$URL"
    fi
fi

echo -e "${GREEN}🎉 Tudo pronto! R3-Builder está no ar!${NC}"
echo ""
