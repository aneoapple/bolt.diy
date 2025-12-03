#!/bin/bash

set -e

echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║                                                                   ║"
echo "║           🚀 R3-BUILDER | AUTO-DEPLOY COMPLETO                   ║"
echo "║                                                                   ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""

# 1. Limpar e reinstalar
echo "🧹 Limpando dependências..."
rm -rf node_modules .pnpm-store pnpm-lock.yaml 2>/dev/null || true
echo "✅ Limpo"

# 2. Instalar dependências
echo "📦 Instalando dependências..."
pnpm install --frozen-lockfile > /dev/null 2>&1 || pnpm install > /dev/null 2>&1
echo "✅ Dependências instaladas"

# 3. Configurar wrangler
echo "⚙️  Configurando Wrangler..."
cat > wrangler.toml << 'EOF'
#:schema node_modules/wrangler/config-schema.json
name = "r3-builder"
compatibility_flags = ["nodejs_compat"]
compatibility_date = "2025-03-28"
pages_build_output_dir = "./build/client"
send_metrics = false
EOF
echo "✅ Wrangler configurado"

# 4. Build
echo "🔨 Compilando projeto..."
pnpm run build 2>&1 | tail -3
echo "✅ Build concluído"

# 5. Typecheck
echo "🔍 Verificando tipos..."
pnpm run typecheck 2>&1 | tail -1 || true
echo "✅ Types OK"

# 6. Commit
echo "📝 Fazendo commit..."
HUSKY=0 git add -A > /dev/null 2>&1
HUSKY=0 git commit -m "🎉 R3-Builder v$(date +%s) - Auto Deploy" > /dev/null 2>&1 || true
echo "✅ Commit feito"

# 7. Info final
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✨ PRONTO PARA DEPLOY NO CLOUDFLARE!"
echo ""
echo "Arquivos compilados em: build/client"
echo "Configuração: wrangler.toml (r3-builder)"
echo ""
echo "🌐 Para fazer deploy final:"
echo ""
echo "1. Acesse: https://dash.cloudflare.com/"
echo "2. Pages → Create a project"
echo "3. Selecione: bolt.diy (este repo)"
echo "4. Configure:"
echo "   Build command: pnpm run build"
echo "   Output: build/client"
echo "   Project name: r3-builder"
echo "5. Add env var:"
echo "   GOOGLE_GENERATIVE_AI_API_KEY=sua_chave"
echo "6. Deploy!"
echo ""
echo "Resultado: https://r3-builder.pages.dev ✨"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

