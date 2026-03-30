# MC1 Hub — Intranet Corporativa

Portal de intranet da MC1 Global, desenvolvido para o departamento de Recursos Humanos.

## Visão Geral

SPA (Single Page Application) moderna construída com HTML5, CSS3 e JavaScript puro — sem frameworks ou ferramentas de build. Desenvolvida seguindo princípios de design minimalista com foco em tipografia limpa, espaçamento generoso e animações suaves.

## Páginas

| Rota | Descrição |
|---|---|
| `#/` | Home — boas-vindas, acesso rápido, notícias e benefícios |
| `#/noticias` | Comunicados e notícias internas |
| `#/rh` | Benefícios, informações de RH e processos |
| `#/politicas` | Documentos, manuais e políticas corporativas |
| `#/treinamentos` | Catálogo de treinamentos e capacitações |
| `#/links` | Links úteis e sistemas internos |
| `#/contato` | Equipe de RH e canais de contato |

## Tecnologias

- **HTML5** — semântico, acessível (ARIA)
- **CSS3** — custom properties, grid, flexbox, glassmorphism
- **JavaScript ES Modules** — roteamento via hash, sem bundler
- **Google Fonts** — Inter (300–800)

## Estrutura

```
hr_site/
├── index.html               # Shell da aplicação + sprite SVG
├── favicon.svg
├── components/
│   ├── card.js              # Fábrica de cards reutilizáveis
│   ├── modal.js             # Modal genérico
│   ├── search-overlay.js    # Busca interna
│   └── toast.js             # Notificações
├── scripts/
│   ├── app.js               # Bootstrap e registro de rotas
│   ├── router.js            # Roteador hash SPA
│   ├── animations.js        # IntersectionObserver + animações
│   ├── navbar.js            # Navbar + menu mobile
│   ├── search.js            # Motor de busca interna
│   ├── data/                # Dados estáticos (notícias, benefícios, etc.)
│   └── pages/               # Renderizadores de cada página
└── styles/
    ├── design-system.css    # Tokens de design (cores, espaçamento, tipografia)
    ├── animations.css       # Scroll-reveal e keyframes
    ├── components.css       # Botões, chips, cards, badges
    ├── navbar.css / footer.css
    └── pages/               # Estilos específicos por página
```

## Como Executar

Requer um servidor HTTP local (não funciona via `file://` por usar ES Modules).

```bash
# Python (recomendado)
python -m http.server 3333

# Node.js
npx serve .
```

Acesse: `http://localhost:3333/#/`

## Equipe de RH

| Nome | Cargo |
|---|---|
| Viviane Sousa de Oliveira | Gerente de RH |
| Vinicius Faria do Nascimento | Analista de Planejamento SR |
| Pedro Vitor de Oliveira Zaqueu | Analista JR de RH |
| Vanessa Nascimento Rolim Nunes | Assistente de RH |
| Barbara Garcia Simarelli | Estagiária de RH |

## Roadmap

- [ ] Autenticação via VPN
- [ ] Páginas de Financeiro e Governança
- [ ] Integração com Google Calendar
- [ ] Formulário de abertura de solicitações
