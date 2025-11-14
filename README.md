# 🎨 Email Classifier - Frontend

Interface web responsiva para o sistema de classificação automática de emails com IA.

Desenvolvido como parte do desafio técnico da **AutoU**.

---

## 🚀 Demo Online

**🌐 Aplicação:** https://email-classifier-front.vercel.app

**🔌 API Backend:** https://github.com/pedrofroeder/email-classifier

---

## 📋 Sobre

Frontend em React com Vite e Tailwind CSS para o Email Classifier. Permite classificação de emails via texto direto ou upload de arquivos (.txt, .pdf) com drag-and-drop.

---

## ✨ Funcionalidades

- ✅ Interface responsiva (mobile-first)
- ✅ Dois modos de entrada: texto ou arquivo
- ✅ Drag-and-drop para upload de arquivos
- ✅ Validação de arquivos (.txt, .pdf, máximo 5MB)
- ✅ Feedback visual de loading e erros
- ✅ Cópia de resposta sugerida com um clique
- ✅ Modal de ajuda com instruções
- ✅ Scroll suave para resultados
- ✅ Design clean e profissional

---

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Framework CSS utilitário
- **JavaScript (ES6+)**
- **Vercel** - Hospedagem

---

## 🚀 Instalação e Uso

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/pedrofroeder/email-classifier-front.git
cd email-classifier-front
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute em desenvolvimento:**
```bash
npm run dev
```

Acesse: `http://localhost:5173`

### Build para Produção
```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`

---

## 🔗 Integração com Backend

O frontend se comunica com a API backend via fetch:
```javascript
const API_URL = "https://email-classifier-api-h7rv.onrender.com";
```

**Repositório do backend:** https://github.com/pedrofroeder/email-classifier

---

## 📱 Responsividade

A interface adapta-se automaticamente para diferentes tamanhos de tela:

- **Mobile** (< 640px): Layout compacto, otimizado para toque
- **Tablet** (640px - 1024px): Layout intermediário
- **Desktop** (> 1024px): Layout completo com espaçamentos amplos

---

## 🎨 Design System

### Cores Principais
- **Primária:** Blue 600 (#2563EB)
- **Secundária:** Slate 800 (#1E293B)
- **Sucesso:** Green 800
- **Alerta:** Amber 800
- **Erro:** Red 800

### Componentes
- Cards com shadow e border-radius suave
- Botões com estados hover e disabled
- Inputs com foco visual claro
- Feedback de drag-and-drop
- Animações sutis (fade-in, slide-up)

---

## 🧩 Estrutura de Componentes
```jsx
App.jsx
├── Header (título + descrição)
├── ModeToggle (texto/arquivo)
├── InputArea
│   ├── TextInput (textarea)
│   └── FileUpload (drag-and-drop)
├── ClassifyButton (com loading state)
├── ResultCard (categoria + resposta)
└── HelpModal (instruções)
```

---

## 🐛 Troubleshooting

### Problema: Erro CORS

**Solução:** Certifique-se que o backend está rodando e configurado com Flask-CORS

### Problema: API não responde

**Solução:** Aguarde ~30s (cold start do Render Free Tier) ou acesse o health check primeiro:
```
https://email-classifier-api-h7rv.onrender.com/api/health
```

### Problema: Build falha

**Solução:** Delete `node_modules` e `package-lock.json`, depois rode:
```bash
npm install
npm run build
```

---

## 🌐 Deploy

### Vercel

Deploy automático via GitHub. Qualquer push na branch `main` dispara novo deploy.

**Configuração:**
- Framework: Vite (detectado automaticamente)
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

## 📦 Scripts Disponíveis
```bash
npm run dev       # Inicia servidor de desenvolvimento
npm run build     # Gera build de produção
npm run preview   # Preview do build local
npm run lint      # Executa ESLint
```

---


## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico da **AutoU**.
