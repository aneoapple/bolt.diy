#!/bin/bash

echo "🚀 R3-BUILDER | DEPLOY PARA CLOUDFLARE PAGES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verificar autenticação
echo "✅ Verificando autenticação Cloudflare..."
if [ ! -f ~/.wrangler/config.toml ]; then
    echo "❌ Você não está autenticado no Cloudflare!"
    echo ""
    echo "Execute primeiro:"
    echo "  pnpm exec wrangler login"
    echo ""
    exit 1
fi

echo "✅ Autenticação encontrada!"
echo ""

# Build
echo "🔨 Building projeto..."
pnpm run build || exit 1
echo "✅ Build concluído!"
echo ""

# Deploy
echo "🌐 Fazendo deploy para: r3-builder.pages.dev"
echo ""
pnpm exec wrangler pages deploy build/client --project-name r3-builder

echo ""
echo "✨ Deploy concluído!"
echo "🌐 Seu projeto está em: https://r3-builder.pages.dev"
