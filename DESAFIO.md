# FULL STACK DEVELOPMENT TECH CHALLENGE FASE 03

## Tech Challenge
O Tech Challenge é uma atividade de desenvolvimento de software em grupo que integra os conhecimentos adquiridos durante a fase atual do curso. A entrega deste projeto é obrigatória e compreende 90% da nota final em todas as disciplinas desta fase.

## O problema
Após o sucesso do desenvolvimento da aplicação de blogging dinâmico utilizando a plataforma OutSystems e a implementação do back-end em Node.js, chegou a hora de criarmos uma interface gráfica robusta, intuitiva e eficiente para esta aplicação. Este desafio focará em desenvolver o front-end, proporcionando uma experiência de usuário excelente tanto para professores(as) quanto para estudantes.

## Objetivo
Desenvolver uma interface gráfica para a aplicação de blogging utilizando React. A aplicação deve ser responsiva, acessível e fácil de usar, permitindo aos docentes e alunos(as) interagir com os diversos endpoints REST já implementados no back-end.

## Requisitos Funcionais
A interface gráfica deve incluir as seguintes páginas e funcionalidades:

1. **Página principal (Lista de posts)**
   - Exibir uma lista de todos os posts disponíveis.
   - Cada item da lista deve mostrar o título, autor e uma breve descrição do post.
   - Incluir um campo de busca para filtrar posts por palavras-chave.

2. **Página de leitura de post**
   - Exibir o conteúdo completo de um post selecionado.
   - Permitir comentários nos posts (opcional).

3. **Página de criação de postagens**
   - Formulário para que docentes possam criar postagens.
   - Campos para título, conteúdo e autor.
   - Botão para enviar o post ao servidor.

4. **Página de edição de postagens**
   - Formulário para que os (as) professores (as) possam editar postagens existentes.
   - Carregar os dados atuais do post para edição.
   - Botão para salvar as alterações.

5. **Página administrativa**
   - Exibir uma lista de todas as postagens, com opções para editar e excluir cada post.
   - Botões para editar e excluir postagens específicas.

6. **Autenticação e autorização**
   - Implementar login para professores.
   - Garantir que apenas usuários autenticados possam acessar as páginas de criação, edição e administração de postagens.

## Requisitos Técnicos

1. **Desenvolvimento em React**
   - Utilizar React para desenvolver a interface gráfica.
   - Utilização de hooks e componentes funcionais.

2. **Estilização e responsividade**
   - Utilizar Styled Components ou outro método de estilização.
   - Garantir que a aplicação seja responsiva, funcionando bem em dispositivos móveis e desktops.

3. **Integração com Back-End**
   - Realizar chamadas aos endpoints REST para obter, criar, editar e excluir posts.
   - Gerenciar o estado da aplicação com ferramentas como Context API ou Redux (opcional).

4. **Documentação**
   - Documentação técnica detalhada do front-end no README do repositório, incluindo setup inicial, arquitetura da aplicação e guia de uso.

## Entrega

1. **Código-fonte:** Repositório GitHub com o código do projeto, incluindo Dockerfiles e scripts de CI/CD.
2. **Apresentação gravada:** Demonstração em vídeo do funcionamento da aplicação, incluindo detalhes técnicos de implementação.
3. **Documentação:** Documento descrevendo a arquitetura do sistema, uso da aplicação e relato de experiências e desafios enfrentados pela equipe durante o desenvolvimento.
