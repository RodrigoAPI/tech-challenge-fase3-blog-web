# Tech Challenge - Fase 02 | API de Blogging (Node.js)

## Sobre o Projeto
Esta aplicação é a evolução da plataforma de blogging acadêmico (inicialmente desenvolvida em Low-Code) para uma arquitetura escalável de Back-end utilizando Node.js. O sistema fornece uma API RESTful para que professores da rede pública possam gerenciar (CRUD) e publicar conteúdos, e para que alunos possam consumir e buscar essas aulas centralizadamente.

## Arquitetura e Tecnologias
* **Linguagem/Framework:** Node.js com Express.js para roteamento leve e eficiente.
* **Persistência de Dados:** MongoDB via Mongoose (NoSQL), escolhido pela flexibilidade e agilidade no armazenamento de documentos (postagens).
* **Qualidade:** Testes unitários implementados com Jest e Supertest, garantindo a estabilidade das operações críticas (criação, edição e exclusão).
* **Infraestrutura e DevOps:** Aplicação containerizada com Docker e pipeline de CI/CD configurada no GitHub Actions para execução automatizada de testes a cada push.

## Rotas da API

### Públicas (Alunos)
* `GET /posts` - Lista todas as postagens.
* `GET /posts/:id` - Retorna o conteúdo completo de um post específico.
* `GET /posts/search?q={termo}` - Busca posts que contenham a palavra-chave no título ou conteúdo.

### Administrativas (Professores)
* `POST /posts` - Cria uma nova postagem. *(Body: title, content, author)*
* `PUT /posts/:id` - Edita uma postagem existente. *(Body: title, content)*
* `DELETE /posts/:id` - Remove uma postagem.

## Como Executar o Projeto

**Via Docker (Recomendado):**
1. Certifique-se de ter o Docker instalado e rodando.
2. Na raiz do projeto, construa a imagem:
   `docker build -t blog-api .`
3. Execute o container (mapeando a porta 3000):
   `docker run -p 3000:3000 blog-api`

**Localmente (Node.js):**
1. Instale as dependências: `npm install`
2. Certifique-se de ter uma instância do MongoDB rodando (ou configure a variável de ambiente `MONGO_URI`).
3. Inicie o servidor: `npm start`
4. Para rodar os testes: `npm test`

## Desafios Enfrentados
O maior desafio desta fase foi a transição do ecossistema Low-Code para o desenvolvimento de uma API nativa. A configuração inicial da pipeline de CI/CD com o GitHub Actions exigiu atenção extra para garantir que o ambiente de testes na nuvem tivesse acesso a um banco MongoDB em memória ou instanciado corretamente para que o Jest não falhasse durante as validações. A containerização com Docker, no entanto, simplificou significativamente a padronização do ambiente de execução.