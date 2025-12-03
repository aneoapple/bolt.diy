#!/bin/bash

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 🎯 R3-BUILDER | COMANDOS ESSENCIAIS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo "
╔════════════════════════════════════════════════════════════════════════╗
║             🎯 R3-BUILDER | COMANDOS ESSENCIAIS                        ║
║                  (Cole qualquer um abaixo no terminal)                  ║
╚════════════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 COMECE AQUI (Escolha 1):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣  MENU PRINCIPAL (Recomendado):
    make quick-start

2️⃣  DEPLOY DIRETO (Rápido):
    make deploy

3️⃣  SETUP INICIAL (Primeira vez):
    make setup

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 DOCUMENTAÇÃO (Leia em ordem):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2 minutos:    QUICK_START.md
5 minutos:    DEPLOY_READY.md
Passo a passo: DEPLOYMENT_STATUS.md
Completo:     CLOUDFLARE_DEPLOY.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️  CONFIGURAÇÃO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Editar .env.local:
    nano .env.local

Copie UMA destas (Google recomendado):
    GOOGLE_GENERATIVE_AI_API_KEY=sua_chave_google
    OPENAI_API_KEY=sua_chave_openai
    ANTHROPIC_API_KEY=sua_chave_anthropic

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ ATALHOS RÁPIDOS (Make Targets):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Desenvolvimento:
    make dev                  # Dev server (vite)
    make build / make b       # Build apenas
    make test / make t        # Testes
    make lint / make l        # Linting

Deployment:
    make deploy / make d      # Deploy automático
    make setup / make s       # Setup wizard
    make quick-start          # Menu principal

Manutenção:
    make clean                # Remove artifacts
    make clean-all            # Reset total
    make info                 # Informações sistema
    make backup               # Backup tar.gz

Docker:
    make docker-build         # Build imagem
    make docker-run           # Rodar container

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔨 SCRIPTS DIRETOS (Se preferir Shell):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

./quick-start.sh              # Menu principal interativo
./scripts/setup.sh            # Setup wizard
./scripts/auto-deploy.sh      # Deploy totalmente automático
./scripts/deploy.sh           # Menu deploy com 5 opções

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐛 TROUBLESHOOTING:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Erro: pnpm not found
    make setup

Erro: wrangler not found
    make setup

Erro: .env.local não existe
    make setup

Erro: Port 5173 em uso
    PORT=3000 make dev

Erro: Compilação falha
    make clean-all
    make build

Erro: Git auth
    wrangler login

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 VERIFICAÇÕES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Versões instaladas:
    node --version
    pnpm --version
    git --version
    wrangler --version

Status do projeto:
    git status
    git log --oneline -5
    make info

Verificar dependências:
    pnpm list

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💾 BACKUP:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Criar backup local (tar.gz):
    make backup

Backup no navegador (após deploy):
    Procure botão azul (canto inferior direito)
    Clique para acessar StorageBackupManager
    Opcões: Restore, Export, Delete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎬 WORKFLOW TÍPICO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Primeira vez:
    1. nano .env.local
    2. make setup
    3. make deploy

Atualizações:
    1. Edite código
    2. make dev (opcional, para testar)
    3. make deploy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 DICAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Use 'make quick-start' se tiver dúvida
✨ Todo deploy é automático (build→test→push→deploy)
✨ Botão azul no canto inferior direito = Backup
✨ Documentação em DEPLOYMENT_STATUS.md
✨ Todos os scripts têm cores e indicadores de progresso

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 COMEÇAR AGORA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    make quick-start

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
" | tee R3_COMANDOS_ESSENCIAIS.txt

echo ""
echo "📄 Arquivo salvo em: R3_COMANDOS_ESSENCIAIS.txt"
