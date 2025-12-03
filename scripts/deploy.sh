#!/bin/bash

# R3-Builder Deploy Helper
# Simplifica o deploy para Cloudflare Pages

set -e

echo "🚀 R3-Builder Deploy Helper"
echo "=================================="
echo ""

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar pnpm
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm não encontrado. Instale com: npm install -g pnpm${NC}"
    exit 1
fi

# Menu
echo -e "${BLUE}Escolha uma opção:${NC}"
echo "1) Build local (teste)"
echo "2) Deploy via CLI (wrangler)"
echo "3) Apenas push para GitHub (auto-deploy)"
echo "4) Criar backup antes do deploy"
echo "5) Ver variáveis de ambiente"
echo ""
read -p "Opção (1-5): " option

case $option in
    1)
        echo -e "${BLUE}📦 Compilando projeto...${NC}"
        pnpm run build
        echo -e "${GREEN}✅ Build concluído!${NC}"
        echo ""
        echo -e "${BLUE}🧪 Testando localmente (Ctrl+C para sair)...${NC}"
        pnpm run start
        ;;
    
    2)
        echo -e "${BLUE}📦 Compilando projeto...${NC}"
        pnpm run build
        echo -e "${GREEN}✅ Build concluído!${NC}"
        echo ""
        echo -e "${BLUE}🚀 Fazendo deploy via Wrangler...${NC}"
        pnpm run deploy
        echo -e "${GREEN}✅ Deploy concluído!${NC}"
        ;;
    
    3)
        echo -e "${BLUE}📝 Verificando mudanças...${NC}"
        git status
        echo ""
        read -p "Tem certeza que deseja fazer push? (s/n): " confirm
        if [ "$confirm" = "s" ]; then
            read -p "Mensagem de commit: " message
            git add .
            git commit -m "$message"
            git push origin main
            echo -e "${GREEN}✅ Push concluído! Deploy automático iniciado.${NC}"
        fi
        ;;
    
    4)
        echo -e "${BLUE}💾 Criar backup...${NC}"
        cat > /tmp/backup.js << 'EOF'
import StorageBackup from '/Users/ale/bolt.diy/app/lib/utils/storage-backup.ts';
const backupId = StorageBackup.createBackup('Pre-deployment backup');
console.log('✅ Backup criado: ' + backupId);
EOF
        echo -e "${GREEN}✅ Lembre-se de clicar em 'Novo Backup' na aplicação web!${NC}"
        ;;
    
    5)
        echo -e "${BLUE}📋 Verificando .env.local...${NC}"
        if [ -f .env.local ]; then
            echo -e "${GREEN}✅ Arquivo encontrado${NC}"
            echo "Variáveis configuradas:"
            grep "=" .env.local | sed 's/=.*/=***/' | sed 's/^/   /'
        else
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
            echo -e "${GREEN}✅ Template criado em .env.local${NC}"
            echo -e "${BLUE}Configure suas chaves de API e execute novamente.${NC}"
        fi
        ;;
    
    *)
        echo -e "${RED}Opção inválida!${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Operação concluída!${NC}"
echo -e "${GREEN}================================${NC}"
