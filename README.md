# FIAP Tech Challenge - Fase 3: Blog Web (Front-End)

Interface gráfica em React desenvolvida para a aplicação de blogging da pós-graduação em Engenharia de Software da FIAP. Este projeto integra com o back-end REST em Node.js/Express e banco de dados MongoDB construídos na Fase 2.

---

## 🚀 Tecnologias Utilizadas

- **React 18 & TypeScript**: Interface reativa com tipagem estática rigorosa.
- **Vite**: Ferramenta de build rápida e moderna.
- **React Router DOM v6**: Gerenciamento de rotas SPA e proteção de rotas privadas.
- **Styled Components**: Estilização moderna CSS-in-JS com tema responsivo escuro (FIAP Dark Theme).
- **Axios**: Cliente HTTP para comunicação com a API REST.
- **Lucide React**: Biblioteca de ícones.
- **Docker & Nginx**: Containerização multi-stage servindo estáticos em produção via Nginx.
- **GitHub Actions**: Pipeline de CI/CD para build e validação automatizada.

---

## 🏛️ Arquitetura e Estrutura de Pastas

```text
tech-challenge-fase3-blog-web/
├── .github/workflows/   # Pipeline de CI/CD (GitHub Actions)
├── src/
│   ├── components/      # Componentes globais (Header, ProtectedRoute)
│   ├── context/         # Context API (Autenticação e Sessão de Usuário)
│   ├── pages/           # Páginas (Home, PostDetail, Login, AdminDashboard, PostForm)
│   ├── services/        # Cliente HTTP Axios e rotas REST
│   ├── styles/          # Design Tokens e Estilos Globais
│   ├── types/           # Interfaces TypeScript do sistema
│   ├── App.tsx          # Roteamento centralizado
│   └── main.tsx         # Ponto de entrada
├── Dockerfile           # Multi-stage build (Node -> Nginx)
├── docker-compose.yml   # Orquestração (Frontend + Backend + MongoDB)
├── nginx.conf           # Configuração de redirecionamento SPA Nginx
└── README.md            # Documentação técnica do repositório
```

---

## 🔗 Rotas da Aplicação (Front-End)

| Rota | Acesso | Descrição |
| :--- | :--- | :--- |
| `/` | Público | Página inicial com listagem de posts e busca por palavra-chave |
| `/post/:id` | Público | Exibição do artigo completo selecionado |
| `/login` | Público | Tela de login para autenticação de docentes |
| `/admin` | **Protegido** | Painel administrativo com tabela e ações rápidas (Editar/Excluir) |
| `/create` | **Protegido** | Formulário para criação de novas postagens |
| `/edit/:id` | **Protegido** | Formulário pré-carregado para edição de postagem |

---

## ⚙️ Como Executar a Aplicação

### Opção 1: Via Docker Compose (Recomendado)

Orquestra automaticamente a **Interface React (Porta 80)**, a **API REST Node.js (Porta 3000)** e o **MongoDB (Porta 27017)**.

```bash
# Na pasta do projeto tech-challenge-fase3-blog-web:
docker-compose up --build
```

Acesse no seu navegador: [http://localhost](http://localhost)

---

### Opção 2: Execução Local (Modo Desenvolvimento)

1. Certifique-se de que a API REST da Fase 2 esteja rodando na porta 3000.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse no navegador: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Pipeline de CI/CD

O repositório possui uma pipeline configurada via **GitHub Actions** em `.github/workflows/ci.yml`. A cada push ou pull request na branch principal:
1. Instala as dependências de forma limpa (`npm ci`).
2. Valida a compilação do TypeScript e gera os estáticos com Vite (`npm run build`).
3. Constrói a imagem Docker para validar que o container de produção está íntegro.
