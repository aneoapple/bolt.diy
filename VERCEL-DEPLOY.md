# 🚀 Guia de Deploy no Vercel - R3-Builder

Este documento explica passo a passo como fazer deploy do **R3-Builder** (bolt.diy) no **Vercel**, uma plataforma otimizada para aplicações Remix/Next.js.

---

## 📋 Sumário
1. [Pré-requisitos](#pré-requisitos)
2. [Configuração no Vercel](#configuração-no-vercel)
3. [Deploy Automático (CI/CD)](#deploy-automático-cicd)
4. [Deploy Manual via CLI](#deploy-manual-via-cli)
5. [Variáveis de Ambiente](#variáveis-de-ambiente)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Pré-requisitos

### **Instalações Locais**
```bash
# 1. Node.js 18.x ou superior
node --version  # Deve ser v18.18.0+

# 2. pnpm (gerenciador de pacotes)
pnpm --version

# 3. Git (para versionamento)
git --version

# 4. Conta no Vercel
# Acesse: https://vercel.com/signup
```

### **Instalar CLI do Vercel (opcional, para deploy manual)**
```bash
npm install -g vercel
# ou
pnpm add -g vercel
```

---

## 🎯 Configuração no Vercel (Recomendado - Deploy Automático)

### **Passo 1: Conectar seu repositório**

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Clique em **"Add New Project"** ou **"Import Project"**
3. Conecte sua conta **GitHub** (ou GitLab/Bitbucket)
4. Selecione o repositório **bolt.diy** ou seu fork
5. Clique em **"Import"**

### **Passo 2: Configurar o Projeto**

Na tela de importação, você verá:

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Remix (detecção automática) |
| **Build Command** | `pnpm install && pnpm build` |
| **Output Directory** | `build/client` |
| **Install Command** | `pnpm install --frozen-lockfile` |
| **Node.js Version** | 18.x |

✅ **Esses valores já estão no `vercel.json`!**

### **Passo 3: Configurar Variáveis de Ambiente**

Clique em **"Environment Variables"** e adicione:

#### **Variáveis Obrigatórias (se usar AI integrado):**
```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_GENERATIVE_AI_API_KEY=AIza...
```

#### **Variáveis Opcionais (por provider):**
```
GROQ_API_KEY=gsk_...
DEEPSEEK_API_KEY=sk-...
MISTRAL_API_KEY=...
```

**Para cada variável:**
1. Adicione o nome e valor
2. Selecione os ambientes onde ela será usada:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### **Passo 4: Deploy**

Clique em **"Deploy"** e aguarde (tempo estimado: 2-5 minutos).

✅ **Seu site estará live em:** `https://seu-projeto.vercel.app`

---

## 🔄 Deploy Automático (CI/CD)

Após a configuração inicial, **todo push para o branch principal** dispara um deploy automático.

### **Configurar Branch para Deploy**

1. Vá em **Settings > Git**
2. Configure:
   - **Production Branch:** `main` (ou `stable`)
   - **Preview Deployments:** Qualquer branch

### **Ativar Deploy Preview para Pull Requests**

1. Em **Settings > Git**
2. Certifique-se de que **"Deploy on Push to main"** está habilitado
3. PRs terão um link de preview automático

---

## 📱 Deploy Manual via CLI

Se preferir deploy via terminal:

### **Autenticar com Vercel**
```bash
vercel login
# Siga as instruções no navegador
```

### **Deploy para Produção**
```bash
vercel --prod
```

### **Deploy para Preview**
```bash
vercel
```

---

## 🔐 Variáveis de Ambiente

### **Adicionar Local (para teste antes de fazer push)**

Crie um arquivo `.env.local` na raiz:

```bash
# .env.local (nunca faça commit deste arquivo!)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_GENERATIVE_AI_API_KEY=AIza...
```

### **Usar no Deploy**

No Vercel Dashboard:
1. **Project Settings** → **Environment Variables**
2. Adicione cada variável e selecione os ambientes

---

## 🐛 Troubleshooting

### **Erro: "JavaScript heap out of memory"**

**Causa:** Projeto é grande demais para a memória padrão do Vercel.

**Solução:**
```bash
# Aumentar limite de memória no vite.config.ts
# Já está configurado com sourcemap: false e minify: 'esbuild'

# Se ainda tiver problema, disable análise de pacotes:
vercel build --cwd . --debug
```

### **Erro 404 ao acessar site**

**Causa:** Output directory configurado errado.

**Solução:**
- Verifique em `vercel.json`: `"outputDirectory": "build/client"` ✅

### **Erro: "Cannot find module '@remix-run/cloudflare'"**

**Causa:** Dependencies ainda referenciando adapters antigos.

**Solução:**
```bash
# Já foi removido! Seu vite.config.ts foi atualizado.
# Se persiste, tente:
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### **Site está muito lento**

**Causa:** Sourcemaps ou assets não minificados.

**Solução:**
- ✅ Já foi otimizado! sourcemap: false no vite.config.ts
- Verifique em vercel.json se `maxLambdaSize` está configurado

### **Preview Deploy Falha**

**Causa:** Falha na build durante PR.

**Solução:**
1. Verifique o **Build & Deployments** logs no Dashboard
2. Rode localmente: `pnpm build`
3. Corrija erros e faça push novamente

---

## 📊 Monitorar Deploy

### **No Dashboard Vercel**

1. **Deployments Tab**: Ver histórico de deploys
2. **Analytics**: Performance, requisições, erros
3. **Logs**: Logs de build e runtime
4. **Web Vitals**: Métricas de performance

### **Via CLI**

```bash
# Ver último deploy
vercel ls

# Ver logs do deploy
vercel logs

# Rollback para versão anterior
vercel rollback
```

---

## 🔗 Recursos Adicionais

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Remix](https://remix.run/docs)
- [Variáveis de Ambiente no Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
- [Performance Tips](https://vercel.com/docs/frameworks/remix#performance-tips)

---

## ✅ Checklist Final de Deploy

- [ ] Repositório foi criado no GitHub / GitLab
- [ ] Conta Vercel criada e conectada
- [ ] Repositório importado no Vercel
- [ ] Build Command: `pnpm install && pnpm build` ✅
- [ ] Output Directory: `build/client` ✅
- [ ] Node.js Version: 18.x ✅
- [ ] Variáveis de Ambiente adicionadas (OPENAI_API_KEY, etc)
- [ ] Primeiro deploy realizado
- [ ] Site acessível em `https://seu-projeto.vercel.app`
- [ ] Preview deployments funcionando (PRs)
- [ ] Analytics habilitado
- [ ] Custom domain configurado (opcional)

---

**Dúvidas?** Revise os logs no Vercel Dashboard ou rode `pnpm build` localmente para validar.

**Última atualização:** 4 de Dezembro de 2025
