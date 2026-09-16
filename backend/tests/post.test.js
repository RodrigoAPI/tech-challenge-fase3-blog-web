const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const Post = require('../src/models/Post');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await Post.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /posts', () => {
  it('cria um novo post', async () => {
    const res = await request(app).post('/posts').send({
      title: 'Meu post',
      content: 'Conteudo do post',
      author: 'Professor A',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Meu post');
  });
});

describe('PUT /posts/:id', () => {
  it('atualiza um post existente', async () => {
    const post = await Post.create({
      title: 'Titulo original',
      content: 'Conteudo original',
      author: 'Professor B',
    });

    const res = await request(app).put(`/posts/${post._id}`).send({
      title: 'Titulo atualizado',
      content: 'Conteudo atualizado',
      author: 'Professor B',
    });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Titulo atualizado');
  });

  it('retorna 404 ao atualizar post inexistente', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).put(`/posts/${fakeId}`).send({
      title: 'X',
      content: 'Y',
      author: 'Z',
    });

    expect(res.status).toBe(404);
  });
});

describe('DELETE /posts/:id', () => {
  it('remove um post existente', async () => {
    const post = await Post.create({
      title: 'Post para remover',
      content: 'Conteudo',
      author: 'Professor C',
    });

    const res = await request(app).delete(`/posts/${post._id}`);
    expect(res.status).toBe(204);

    const found = await Post.findById(post._id);
    expect(found).toBeNull();
  });

  it('retorna 404 ao remover post inexistente', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/posts/${fakeId}`);
    expect(res.status).toBe(404);
  });
});

describe('GET /posts', () => {
  it('lista todos os posts', async () => {
    await Post.create({ title: 'A', content: 'B', author: 'C' });
    const res = await request(app).get('/posts');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });
});

describe('GET /posts/:id', () => {
  it('retorna um post especifico', async () => {
    const post = await Post.create({ title: 'A', content: 'B', author: 'C' });
    const res = await request(app).get(`/posts/${post._id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('A');
  });
});

describe('GET /posts/search', () => {
  it('busca posts por titulo ou conteudo', async () => {
    await Post.create({ title: 'Node.js na pratica', content: 'API REST', author: 'C' });
    await Post.create({ title: 'Outro assunto', content: 'Nada a ver', author: 'D' });

    const res = await request(app).get('/posts/search').query({ q: 'node' });
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Node.js na pratica');
  });
});
