#!/bin/bash

# 🚀 Deploy Rápido para Vercel
# Uso: bash vercel-quick-deploy.sh [--prod]

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 R3-Builder Deploy para Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Verificar se tem mudanças não commitadas
if ! git diff-index --quiet HEAD --; then
    echo "❌ Erro: Você tem mudanças não commitadas."
    echo "   Execute: git add . && git commit -m 'sua mensagem'"
    exit 1
fi

# Build local
echo ""
echo "📦 Limpando build anterior..."
rm -rf build

echo "🔨 Fazendo build..."
pnpm install --frozen-lockfile
pnpm build

echo ""
echo "✅ Build concluído com sucesso!"

# Deploy
PROD_FLAG=""
if [ "$1" = "--prod" ]; then
    PROD_FLAG="--prod"
    echo "🌍 Preparando DEPLOY EM PRODUÇÃO..."
else
    echo "👁️  Preparando DEPLOY EM PREVIEW..."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Próximo passo: vercel $PROD_FLAG"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Deseja continuar? (s/n)"
read -r response

if [ "$response" = "s" ] || [ "$response" = "S" ]; then
    vercel $PROD_FLAG
    echo ""
    echo "✅ Deploy concluído!"
else
    echo "❌ Deploy cancelado."
    exit 0
fi
