# 📚 Documentação Técnica - Portfolio Ericky Dias

Documentação detalhada sobre arquitetura, componentes, fluxo de dados e integração do portfolio.

---

## 📑 Índice

1. [Arquitetura Geral](#arquitetura-geral)
2. [App Router (Next.js 15)](#app-router-nextjs-15)
3. [Componentes](#componentes)
4. [Fluxo de Dados](#fluxo-de-dados)
5. [Integração EmailJS](#integração-emailjs)
6. [Hooks Customizados](#hooks-customizados)
7. [Styling (CSS Modules)](#styling-css-modules)
8. [Deployment](#deployment)

---

## 🏗 Arquitetura Geral

### Estrutura High-Level

```
Portfolio App (Next.js 15 + React 18)
│
├── Server Components
│   ├── app/layout.js (metadados, fontes)
│   └── app/[page]/page.js (páginas principais)
│
├── Client Components
│   ├── Header (navegação)
│   ├── NavMenu (menu responsivo)
│   └── Content Components (Hero, About, Experience, etc.)
│
├── State Management
│   └── React Hooks (useState, useEffect, useRef)
│
├── External Services
│   ├── EmailJS (envio de emails)
│   └── Vercel (hosting & deployment)
│
└── Styling
    └── CSS Modules (src/blocks/*.css)
```

### Design Pattern: Component Composition

O portfolio utiliza **composição de componentes** com separação clara entre:
- **Server Components**: Renderizam no servidor (SEO, metadados)
- **Client Components**: Renderizam no navegador (interatividade, hooks)

---

## 📄 App Router (Next.js 15)

### Estrutura de Páginas

```
src/app/
├── layout.js
│   └── Metadata global
│   └── Fonts e providers
│   └── Navbar (Header + NavMenu)
│
├── page.js (HOME)
│   └── Hero
│   └── Skills preview
│   └── Featured projects
│
├── about/page.js
│   └── About section completa
│   └── Skills grid
│
├── projects/page.js
│   └── Projects gallery
│   └── ProjectModal
│
├── experience/page.js
│   └── Experience timeline
│   └── Detalhes de cada role
│
└── contact/page.js
    └── Contact form
    └── Contact info
```

### Roteamento Dinâmico

O App Router do Next.js 15 usa **arquivo-baseado roteamento**:
- `/` → `src/app/page.js`
- `/about` → `src/app/about/page.js`
- `/projects` → `src/app/projects/page.js`
- `/experience` → `src/app/experience/page.js`
- `/contact` → `src/app/contact/page.js`

### Layout Hierarchy

```
app/layout.js (ROOT)
  └── <Header /> (Client Component)
  └── <NavMenu /> (Client Component)
  └── {children} (Page Content)
  └── <Footer /> (Client Component)
```

---

## 🧩 Componentes

### Header.jsx
**Responsabilidade**: Navegação principal e branding

**Props**: Nenhum
**State**: 
- Nenhum estado (stateless component)

**Lógica**:
- Renderiza logo com link para home
- Menu desktop (link para seções)
- Integra com NavMenu para mobile

**Exemplo de uso**:
```jsx
<Header />
```

---

### NavMenu.jsx
**Responsabilidade**: Menu responsivo (hamburger mobile)

**Props**: Nenhum
**State**:
- `isOpen`: boolean (menu aberto/fechado)

**Lógica**:
- Hamburger button que abre/fecha menu
- Links com smooth scroll
- Suporte para mobile e desktop
- Listener de click fora para fechar

**Exemplo de uso**:
```jsx
<NavMenu />
```

---

### Hero.jsx
**Responsabilidade**: Seção de apresentação inicial

**Props**: Nenhum
**State**: Nenhum

**Lógica**:
- Texto de boas-vindas animado
- Call-to-action (CTA)
- Background decorativo
- Responsivo em todas as telas

---

### About.jsx
**Responsabilidade**: Seção "Sobre" com skills e formação

**Props**: Nenhum
**State**: Nenhum

**Lógica**:
- Grid de skills técnicas (Frontend, Backend, Tools)
- Descrição profissional
- Informações de formação
- Badges de certificações

**Dados**: Importado de `src/data/projects.js` ou inline

---

### Experience.jsx
**Responsabilidade**: Timeline de experiência profissional

**Props**: Nenhum
**State**: Nenhum

**Lógica**:
- Timeline vertical com experiências
- Cada item contém:
  - Data (início/fim)
  - Cargo
  - Empresa
  - Descrição de responsabilidades
  - Tecnologias utilizadas

---

### Projects.jsx + ProjectModal.jsx
**Responsabilidade**: Galeria de projetos com modal de detalhes

**ProjectModal Props**:
```javascript
{
  project: {
    id: number,
    name: string,
    description: string,
    technologies: string[],
    deploy: string,
    repository: string
  },
  isOpen: boolean,
  onClose: function
}
```

**ProjectModal State**:
- Controla abertura/fechamento do modal

**Lógica**:
- Grid responsivo de projeto cards
- Click no card abre modal com detalhes
- Modal mostra:
  - Descrição completa
  - Stack de tecnologias
  - Links (Deploy + Repository)
- Suporte para ESC key para fechar

---

### Skills.jsx
**Responsabilidade**: Grid de skills e tecnologias

**Props**: Nenhum
**State**: Nenhum

**Lógica**:
- Grid de habilidades categorizado
- Frontend, Backend, Tools, etc.
- Ícones ou badges visuais
- Animação ao scroll

---

### Contact.jsx
**Responsabilidade**: Formulário de contato com EmailJS

**Props**: Nenhum
**State**:
```javascript
{
  status: 'idle' | 'sending' | 'success' | 'error',
  formData: {
    name: string,
    email: string,
    subject: string,
    message: string
  }
}
```

**Lógica**:
- Formulário com validação básica
- Integração EmailJS
- Estados: idle, sending, success, error
- Feedback visual para cada estado
- Reset do formulário após sucesso
- Auto-dismiss (5s) do feedback

**Email Integration**:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('sending');
  
  try {
    await emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );
    setStatus('success');
    // Reset após 5s
    setTimeout(() => setStatus('idle'), 5000);
  } catch (error) {
    setStatus('error');
    setTimeout(() => setStatus('idle'), 5000);
  }
};
```

---

### Footer.jsx
**Responsabilidade**: Rodapé com links e informações

**Props**: Nenhum
**State**: Nenhum

**Lógica**:
- Links para redes sociais
- Copyright
- Links úteis
- Ano dinâmico

---

### ClientLayout.jsx
**Responsabilidade**: Wrapper para Client Components

**Uso**: Envolver componentes que precisam de hooks do lado cliente

```jsx
// Exemplo
export default function ClientLayout({ children }) {
  return <ClientOnlyComponent>{children}</ClientOnlyComponent>
}
```

---

## 📊 Fluxo de Dados

### Data Flow Architecture

```
app/layout.js (Root)
  ├── Header (Client)
  │   └── NavMenu (Client)
  │
  ├── Page Content (Server)
  │   └── [Hero, About, Projects, etc.] (Client)
  │
  └── Footer (Client)
```

### State Management

**Estado Local (Component)**:
- `NavMenu`: `isOpen`
- `Contact`: `status`, `formData`
- `ProjectModal`: `isOpen`

**Props Drilling**: Mínimo (design simples)

**Global State**: Não utilizado (projeto pequeno)

---

## 🔌 Integração EmailJS

### Fluxo Completo

```
User Fill Form
  ↓
handleSubmit()
  ↓
setStatus('sending')
  ↓
emailjs.sendForm(
  SERVICE_ID,
  TEMPLATE_ID,
  formRef.current,
  PUBLIC_KEY
)
  ↓
Sucesso → setStatus('success') → Reset após 5s
Erro → setStatus('error') → Reset após 5s
  ↓
formData Reset
```

### Variáveis Necessárias

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=public_xxxxx
```

### EmailJS Template Esperado

Template deve ter campos com nomes exatos:
- `{{name}}` ou `{name}`
- `{{email}}` ou `{email}`
- `{{subject}}` ou `{subject}`
- `{{message}}` ou `{message}`

---

## 🎣 Hooks Customizados

### useNavScroll Hook

**Localização**: `src/hooks/useNavScroll.js`

**Funcionalidade**: Aplica efeito visual à navbar ao scroll

**Implementação**:
```javascript
"use client";
import { useEffect } from "react";

export default function useNavScroll() {
  useEffect(() => {
    const nav = document.querySelector(".nav");
    if (!nav) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
```

**Uso**:
```javascript
export default function Header() {
  useNavScroll(); // Ativa o hook
  
  return <header className="nav">...</header>
}
```

**CSS Associado**:
```css
.nav {
  position: fixed;
  height: 80px;
  transition: all 0.3s ease;
}

.nav.scrolled {
  height: 60px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
```

---

## 🎨 Styling (CSS Modules)

### Estrutura de Arquivos

```
src/blocks/
├── globals.css      # Reset, variáveis, base
├── header.css       # Header + Nav
├── nav__menu.css    # Menu responsivo
├── hero.css         # Hero section
├── about.css        # About section
├── experience.css   # Experience timeline
├── project.css      # Projects grid + Modal
├── skills.css       # Skills grid
├── contact.css      # Contact form
└── footer.css       # Footer
```

### Variáveis CSS Globais

```css
:root {
  /* Colors */
  --color-primary: #0666c5;
  --color-secondary: #00d4ff;
  --color-bg: #0d1117;
  --color-text: #c9d1d9;
  --color-border: #30363d;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* Typography */
  --font-base: 'Segoe UI', sans-serif;
  --font-mono: 'Monaco', monospace;
  
  /* Transitions */
  --transition: all 0.3s ease;
}
```

### Naming Convention (BEM)

```css
/* Block */
.hero { }

/* Element */
.hero__title { }
.hero__subtitle { }
.hero__cta { }

/* Modifier */
.hero__cta--primary { }
.hero__cta--secondary { }
```

### Responsividade

```css
/* Mobile First (base) */
.component {
  width: 100%;
  padding: 1rem;
}

/* Tablet e acima */
@media (min-width: 768px) {
  .component {
    width: 50%;
    padding: 2rem;
  }
}

/* Desktop e acima */
@media (min-width: 1024px) {
  .component {
    width: 33.33%;
  }
}
```

---

## 🚀 Deployment

### Arquitetura de Deploy

```
GitHub Repository
  ↓
Push to main
  ↓
Vercel CI/CD
  ↓
Build Next.js
  ↓
Run Tests (lint)
  ↓
Deploy to Edge Network
  ↓
Live on Production
```

### Variáveis de Ambiente no Vercel

1. Settings → Environment Variables
2. Adicione 3 variáveis (PUBLIC prefix):
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

### Build Process

```bash
# Vercel executa automaticamente:
npm install
npm run build
npm run lint
npm start
```

### Otimizações de Deploy

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automático via App Router
- **CSS Minification**: Automático
- **Caching**: Cache headers optimizados
- **Edge Caching**: CDN global da Vercel

---

## 🔧 Troubleshooting

### Problema: EmailJS não envia

**Solução**:
1. Verifique as 3 variáveis de ambiente
2. Confirme que o template ID existe
3. Teste o serviço direto no dashboard EmailJS

### Problema: Componente não renderiza

**Solução**:
1. Adicione `"use client"` no topo do arquivo
2. Verifique importações
3. Consulte console do navegador (F12)

### Problema: CSS não aplica

**Solução**:
1. Verifique se o arquivo CSS existe em `src/blocks/`
2. Confirme se está importado na página
3. Limpe cache: `npm run build` + hard refresh

---

## 📋 Checklist de Manutenção

- [ ] Testar EmailJS mensalmente
- [ ] Verificar links quebrados
- [ ] Atualizar dependências (`npm update`)
- [ ] Executar lint (`npm run lint`)
- [ ] Testar em diferentes navegadores
- [ ] Testar responsividade
- [ ] Verificar performance (Lighthouse)

---

## 📚 Recursos Úteis

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Hooks](https://react.dev/reference/react)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Vercel Deployment](https://vercel.com/docs)

---

## 👨‍💻 Autor

**Ericky Dias** - Full Stack Developer

- GitHub: [@dev-erickydias](https://github.com/dev-erickydias)
- LinkedIn: [linkedin.com/in/erickydias](https://linkedin.com/in/erickydias)

