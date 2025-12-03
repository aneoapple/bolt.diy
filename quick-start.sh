#!/bin/bash

# R3-Builder Quick Start - Tudo em um comando!
# Use: curl -fsSL https://seu-dominio/quick-start.sh | bash
# Ou localmente: ./quick-start.sh

set -e

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

clear

# Menu Principal
show_menu() {
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════╗"
    echo "║     🚀 R3-Builder Quick Start Menu    ║"
    echo "╠════════════════════════════════════════╣"
    echo "║ 1) Setup Inicial (primeira vez)        ║"
    echo "║ 2) Deploy Automático                   ║"
    echo "║ 3) Testar Localmente                   ║"
    echo "║ 4) Ver Status                          ║"
    echo "║ 5) Abrir Documentação                  ║"
    echo "╚════════════════════════════════════════╝"
    echo -e "${NC}"
    read -p "Escolha (1-5): " option
}

# Option 1: Setup
setup() {
    echo -e "${BLUE}Iniciando setup...${NC}"
    if [ -f "./scripts/setup.sh" ]; then
        ./scripts/setup.sh
    else
        echo -e "${RED}❌ scripts/setup.sh não encontrado!${NC}"
        exit 1
    fi
}

# Option 2: Deploy
deploy() {
    echo -e "${BLUE}Iniciando deploy automático...${NC}"
    if [ -f "./scripts/auto-deploy.sh" ]; then
        ./scripts/auto-deploy.sh
    else
        echo -e "${RED}❌ scripts/auto-deploy.sh não encontrado!${NC}"
        exit 1
    fi
}

# Option 3: Dev
dev() {
    echo -e "${BLUE}Iniciando servidor de desenvolvimento...${NC}"
    echo -e "${YELLOW}ℹ️  Pressione Ctrl+C para parar${NC}"
    pnpm run dev
}

# Option 4: Status
status() {
    echo -e "${BLUE}📊 Status do Projeto:${NC}"
    echo ""
    
    echo -e "${BLUE}• Node.js:${NC}"
    node -v
    
    echo -e "${BLUE}• pnpm:${NC}"
    pnpm -v
    
    echo -e "${BLUE}• Wrangler:${NC}"
    wrangler --version 2>/dev/null || echo "Não instalado"
    
    echo ""
    echo -e "${BLUE}• Git:${NC}"
    git config user.name
    git config user.email
    
    echo ""
    echo -e "${BLUE}• .env.local:${NC}"
    if [ -f ".env.local" ]; then
        echo "✅ Existe"
        echo "Variáveis:"
        grep "=" .env.local | sed 's/=.*/=***/' | sed 's/^/  /'
    else
        echo "❌ Não encontrado"
    fi
    
    echo ""
    echo -e "${BLUE}• Cloudflare:${NC}"
    if wrangler whoami 2>/dev/null; then
        echo "✅ Autenticado"
    else
        echo "❌ Não autenticado"
    fi
}

# Option 5: Docs
docs() {
    echo -e "${BLUE}📚 Documentação:${NC}"
    echo ""
    echo "1. DEPLOY_READY.md - Visão geral do projeto"
    echo "2. CLOUDFLARE_DEPLOY.md - Guia completo de deploy"
    echo "3. README.md - Documentação principal"
    echo ""
    read -p "Qual arquivo abrir? (1-3): " doc_choice
    case $doc_choice in
        1) cat DEPLOY_READY.md | less ;;
        2) cat CLOUDFLARE_DEPLOY.md | less ;;
        3) cat README.md | less ;;
        *) echo "Inválido" ;;
    esac
}

# Main Loop
while true; do
    show_menu
    
    case $option in
        1) setup ;;
        2) deploy ;;
        3) dev ;;
        4) status ;;
        5) docs ;;
        *) echo -e "${RED}❌ Opção inválida${NC}" ;;
    esac
    
    echo ""
    read -p "Voltar ao menu? (s/n): " back
    if [[ ! $back =~ ^[Ss]$ ]]; then
        echo -e "${GREEN}👋 Até logo!${NC}"
        break
    fi
    clear
done
