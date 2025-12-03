.PHONY: help setup deploy dev clean test lint build quick-start

# Cores
BLUE=\033[0;34m
GREEN=\033[0;32m
RED=\033[0;31m
NC=\033[0m

help:
	@echo "$(BLUE)═══════════════════════════════════════$(NC)"
	@echo "$(BLUE)   🚀 R3-Builder Make Commands$(NC)"
	@echo "$(BLUE)═══════════════════════════════════════$(NC)"
	@echo ""
	@echo "$(GREEN)Comandos Rápidos:$(NC)"
	@echo "  make quick-start    - Menu interativo (recomendado)"
	@echo "  make setup          - Setup inicial"
	@echo "  make deploy         - Deploy automático"
	@echo "  make dev            - Servidor local"
	@echo ""
	@echo "$(GREEN)Desenvolvimento:$(NC)"
	@echo "  make build          - Compilar projeto"
	@echo "  make test           - Rodar testes"
	@echo "  make lint           - Verificar linting"
	@echo "  make typecheck      - Verificar tipos"
	@echo ""
	@echo "$(GREEN)Limpeza:$(NC)"
	@echo "  make clean          - Limpar build"
	@echo "  make clean-all      - Limpar tudo"
	@echo ""

quick-start:
	@./quick-start.sh

setup:
	@./scripts/setup.sh

deploy:
	@./scripts/auto-deploy.sh

dev:
	@pnpm run dev

build:
	@pnpm run build

test:
	@pnpm run test

test-watch:
	@pnpm run test:watch

lint:
	@pnpm run lint

lint-fix:
	@pnpm run lint:fix

typecheck:
	@pnpm run typecheck

clean:
	@echo "$(BLUE)Limpando build...$(NC)"
	@rm -rf build dist .next .vite
	@echo "$(GREEN)✅ Build limpo$(NC)"

clean-all: clean
	@echo "$(BLUE)Limpando tudo...$(NC)"
	@rm -rf node_modules pnpm-lock.yaml
	@pnpm install
	@echo "$(GREEN)✅ Tudo limpo e reinstalado$(NC)"

install:
	@pnpm install

update:
	@pnpm update

# Aliases úteis
s: setup
d: deploy
b: build
t: test
l: lint
dev-start: dev

# Info
info:
	@echo "$(BLUE)📊 Informações do Projeto:$(NC)"
	@echo ""
	@echo "Node: $$(node -v)"
	@echo "pnpm: $$(pnpm -v)"
	@echo "Wrangler: $$(wrangler --version 2>/dev/null || echo 'Não instalado')"
	@echo ""
	@echo "Git:"
	@echo "  User: $$(git config user.name)"
	@echo "  Email: $$(git config user.email)"
	@echo ""

backup:
	@echo "$(BLUE)💾 Criando backup...$(NC)"
	@mkdir -p backups
	@tar -czf backups/r3-builder-$$(date +%Y%m%d-%H%M%S).tar.gz \
		--exclude=node_modules \
		--exclude=.git \
		--exclude=build \
		--exclude=.next \
		.
	@echo "$(GREEN)✅ Backup criado em backups/$(NC)"

# Docker (se usar)
docker-build:
	@docker build -t r3-builder:latest .

docker-run:
	@docker run -it -p 5173:5173 r3-builder:latest

# Defaults
.DEFAULT_GOAL := help
