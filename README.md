# 🚀 Portfolio Ericky Dias

Portfolio pessoal moderno desenvolvido com **Next.js 15** e **React 18**, apresentando meus projetos, experiência profissional e habilidades técnicas. Construído com foco em responsividade, performance e experiência do usuário.

**Acesse em:** [https://dev-erickydias.vercel.app](https://dev-erickydias.vercel.app)

---

## 📋 Características Principais

✨ **Multilíngue**: Suporte para português (BR) e inglês  
📧 **Formulário de Contato**: Integrado com EmailJS para envio direto de mensagens  
🎨 **Showcase de Projetos**: Galeria interativa com modal de detalhes  
📱 **Responsivo**: Design adaptado para desktop, tablet e mobile  
⚡ **Performance**: Carregamento rápido, otimizado para SEO  
🎯 **Smooth Scroll**: Navegação suave e intuitiva entre seções  
🎭 **Tema Pronto**: Estrutura CSS preparada para dark mode  
♿ **Acessível**: Semântica HTML correta e navegação por teclado  

---

## 🛠 Stack Tecnológico

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| **Next.js** | 15.2.6 | Framework React com App Router moderno |
| **React** | 18 | Biblioteca UI com Server & Client Components |
| **EmailJS** | 4.4.1 | Serviço de envio de emails sem backend |
| **CSS Modules** | Nativo | Estilização modular e isolada por componente |
| **ESLint** | 8 | Linting e qualidade de código |

---

## 📦 Instalação e Setup

### Pré-requisitos
- Node.js 18.17 ou superior
- npm ou yarn
- Conta no EmailJS (gratuita)

### Passos de Instalação

**1. Clone o repositório**
```bash
git clone https://github.com/dev-erickydias/dev-erickydias
cd dev-erickydias
```

**2. Instale as dependências**
```bash
npm install
# ou com yarn
yarn install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=seu_service_id_aqui
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id_aqui
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key_aqui
```

**Como obter essas chaves:**

1. Registre-se em [https://www.emailjs.com](https://www.emailjs.com)
2. No dashboard, copie:
   - **Service ID**: Integrations → selecione seu email service
   - **Public Key**: Account → API Keys → Public Key
3. Crie um **Email Template** com os campos: `name`, `email`, `subject`, `message`
4. Copie o **Template ID** gerado

**4. Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou com yarn
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

## 🚀 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento com hot reload
npm run build    # Cria build otimizado para produção
npm start        # Inicia servidor de produção (requer build antes)
npm run lint     # Executa verificação ESLint do código
```

---

## 📁 Estrutura do Projeto

```
src/
├── app/                          # 📄 App Router (Next.js 15)
│   ├── layout.js                 # Layout raiz (metadata, fontes)
│   ├── page.js                   # Home/Landing Page
│   ├── about/page.js             # Página: Sobre (skills, formação)
│   ├── projects/page.js          # Página: Projetos (galeria)
│   ├── experience/page.js        # Página: Experiência (timeline)
│   └── contact/page.js           # Página: Contato (formulário)
│
├── components/                   # 🧩 Componentes React (Client Components)
│   ├── Header.jsx                # Navegação superior com logo
│   ├── NavMenu.jsx               # Menu responsivo (mobile/desktop)
│   ├── Hero.jsx                  # Seção de apresentação hero
│   ├── About.jsx                 # Seção Sobre
│   ├── Experience.jsx            # Timeline de experiência
│   ├── Projects.jsx              # Grid de projetos
│   ├── ProjectModal.jsx          # Modal com detalhes
│   ├── Skills.jsx                # Grid de habilidades
│   ├── Contact.jsx               # Formulário de contato (EmailJS)
│   ├── Footer.jsx                # Rodapé com links sociais
│   └── ClientLayout.jsx          # Wrapper para Client Components
│
├── blocks/                       # 🎨 CSS Modules
│   ├── globals.css               # Estilos globais e reset
│   ├── header.css                # Estilos do Header/Navbar
│   ├── nav__menu.css             # Estilos do NavMenu
│   ├── hero.css                  # Estilos da Hero
│   ├── about.css                 # Estilos do About
│   ├── experience.css            # Estilos da Experience
│   ├── project.css               # Estilos dos Projects/Modal
│   ├── skills.css                # Estilos do Skills
│   ├── contact.css               # Estilos do Contact
│   └── footer.css                # Estilos do Footer
│
├── data/
│   └── projects.js               # Array de dados dos projetos
│
├── hooks/
│   └── useNavScroll.js           # Hook customizado para scroll
│
└── cv/                           # 📃 CVs em PDF
    ├── cv_pt.pdf                 # Currículo português
    └── cv_en.pdf                 # Currículo inglês
```

---

## 🔌 Integração EmailJS

O **formulário de contato** utiliza **EmailJS** para envio direto de emails sem necessidade de servidor backend.

### 📨 Fluxo de Funcionamento:

1. Usuário preenche o formulário (nome, email, assunto, mensagem)
2. Ao submit, a função `handleSubmit` dispara `emailjs.sendForm()`
3. EmailJS valida e envia o email para seu email configurado
4. Feedback visual é exibido ao usuário (sucesso ✓ ou erro ✗)
5. Após 5 segundos, o feedback desaparece

### 🔑 Setup EmailJS Passo a Passo:

1. Crie conta em [https://www.emailjs.com](https://www.emailjs.com) (FREE PLAN disponível)
2. Crie um **Email Service** (Gmail, Outlook, Yahoo, etc.)
3. Crie um **Email Template** com as variáveis:
   - `{{name}}` - Nome do visitante
   - `{{email}}` - Email do visitante
   - `{{subject}}` - Assunto
   - `{{message}}` - Mensagem
4. Copie e configure no `.env.local`

---

## 🎣 Hooks Customizados

### `useNavScroll`

Hook customizado que monitora a posição de scroll e aplica efeitos visuais na navbar.

**Funcionalidades:**
- Monitora evento `scroll` da janela
- Adiciona classe CSS `.scrolled` ao nav quando scroll > 50px
- Remove listener ao desmontar componente
- Usa `passive: true` para melhor performance

---

## 🎨 Estilo e CSS

O projeto usa **CSS Modules** com arquivos organizados em `src/blocks/`:

### Estrutura de Naming (BEM):
```css
.section { }
.section__title { }
.section__label { }
.section--active { }
```

### Responsividade com Media Queries:
```css
/* Mobile First */
.component { /* base mobile */ }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Screens */
@media (min-width: 1440px) { }
```

---

## 📱 Responsividade

Design com abordagem **Mobile First** com breakpoints:

| Dispositivo | Resolução | Breakpoint |
|-----------|-----------|-----------|
| Mobile | 320px - 767px | Base (sem @media) |
| Tablet | 768px - 1023px | `@media (min-width: 768px)` |
| Desktop | 1024px - 1439px | `@media (min-width: 1024px)` |
| Large | 1440px+ | `@media (min-width: 1440px)` |

Todos os componentes são totalmente responsivos.

---

## 🚀 Deploy com Vercel

**Vercel** oferece deploy automático com otimizações Next.js nativas.

**1. Prepare o Git**
```bash
git add .
git commit -m "Adiciona melhorias"
git push origin main
```

**2. Conecte no Vercel**
- Acesse [https://vercel.com](https://vercel.com)
- Selecione seu repositório GitHub
- Configure project name

**3. Configure Variáveis de Ambiente**
- Settings → Environment Variables
- Adicione as 3 variáveis EmailJS

**4. Deploy**
- Clique "Deploy"
- Vercel fará build e deploy automático

**URL:** [https://dev-erickydias.vercel.app](https://dev-erickydias.vercel.app)

---

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Otimizados
- **Code Splitting**: Automático via App Router
- **Caching**: Headers otimizados em Vercel

---

## 📝 Licença

MIT License - Sinta-se livre para usar como template ou referência.

---

## 📧 Contato

- **Email**: dev@erickydias.com
- **LinkedIn**: [linkedin.com/in/erickydias](https://linkedin.com/in/erickydias)
- **GitHub**: [@dev-erickydias](https://github.com/dev-erickydias)
- **Portfolio**: [dev-erickydias.vercel.app](https://dev-erickydias.vercel.app)

---

<div align="center">

Desenvolvido com ❤️ por **Ericky Dias**

⭐ Se gostou, deixe uma star no GitHub! ⭐

</div>
