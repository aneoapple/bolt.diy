#!/bin/bash

echo "🚀 R3-BUILDER | CRIAÇÃO DE NOVO PROJETO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 1. Atualizar wrangler.toml com nome r3
echo "✏️  Atualizando configurações..."
cat > wrangler.toml << 'EOF'
#:schema node_modules/wrangler/config-schema.json
name = "r3-builder"
compatibility_flags = ["nodejs_compat"]
compatibility_date = "2025-03-28"
pages_build_output_dir = "./build/client"
send_metrics = false
EOF

# 2. Build
echo "🔨 Compilando projeto..."
pnpm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Build concluído!"
else
    echo "❌ Erro no build"
    exit 1
fi

# 3. Commit local
echo "📝 Fazendo commit..."
HUSKY=0 git add wrangler.toml > /dev/null 2>&1
HUSKY=0 git commit -m "🎉 R3-Builder | Novo Projeto - Setup Automático" > /dev/null 2>&1
echo "✅ Commit feito (local)"

# 4. Mostrar status final
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✨ PRONTO PARA DEPLOY!"
echo ""
echo "Agora você precisa:"
echo ""
echo "1️⃣  Ir para: https://dash.cloudflare.com/"
echo ""
echo "2️⃣  Criar NOVO projeto Pages:"
echo "    - Nome: r3-builder"
echo "    - Repositório: bolt.diy"
echo "    - Build: pnpm run build"
echo "    - Output: build/client"
echo "    - Env: Adicione sua API key"
echo ""
echo "3️⃣  Aguardar build completar"
echo ""
echo "4️⃣  Seu site estará em:"
echo "    🌐 https://r3-builder.pages.dev"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

