# FIAP Tech Challenge - Fase 3: Blog Web (Front-End)

Interface gráfica desenvolvida em React para a aplicação de blogging da pós-graduação em Engenharia de Software da FIAP.

## 🚀 Tecnologias Utilizadas

- **React 18** (com TypeScript)
- **Vite** (Build tool e servidor de desenvolvimento rápido)
- **React Router DOM v6** (Navegação SPA e rotas protegidas)
- **Styled Components** (Estilização CSS-in-JS moderna com tema dinâmico)
- **Axios** (Cliente HTTP para integração REST API)
- **Lucide React** (Ícones modernos)

---

## 🛠️ Arquitetura do Projeto

```text
src/
├── components/         # Componentes compartilhados (Header, ProtectedRoute)
├── context/            # Context API para Autenticação / Sessão
├── pages/              # Páginas da aplicação (Home, PostDetail, Login, Admin, PostForm)
├── services/           # Comunicação com a API Node.js (Axios)
├── styles/             # GlobalStyle e tokens de tema
├── types/              # Interfaces TypeScript do sistema
├── App.tsx             # Roteamento principal
└── main.tsx            # Ponto de entrada
```

---

## 💻 Como Rodar o Projeto

### Pré-requisitos

1. **Back-end ativo**: Certifique-se de que a API Node.js da Fase 2 (`tech-challenge-fase2-blog-api`) esteja rodando na porta `3000`.

### Passos

1. Entre na pasta do projeto:
   ```bash
   cd tech-challenge-fase3-blog-web
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse no navegador: `http://localhost:5173`

---

## 🔒 Autenticação e Controle de Acesso

- As páginas de **Leitura (Home e Post Detail)** são públicas para estudantes e docentes.
- A **Área Docente** (`/login`) ativa o perfil autenticado via LocalStorage e Context API.
- As rotas `/admin`, `/create` e `/edit/:id` são estritamente **protegidas**, redirecionando usuários não autenticados para a tela de login.
