import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { createPost, updatePost, getPostById } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';

const Container = styled.div`
  max-width: 1100px;
  width: 90%;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: left;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  background-color: var(--bg-card);
  padding: 3rem;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  width: 100%;
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;

  label {
    font-weight: 500;
    font-size: 0.95rem;
    text-align: left;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--bg-dark);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  color: var(--text-main);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 250px;
  padding: 1rem;
  background-color: var(--bg-dark);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  color: var(--text-main);
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: var(--radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--primary-hover);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.div`
  color: var(--danger);
  background-color: rgba(239, 68, 68, 0.1);
  padding: 1rem;
  border-radius: var(--radius);
  margin-bottom: 1rem;
`;

export const PostForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(user?.username || '');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      getPostById(id)
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
          setAuthor(data.author);
        })
        .catch(() => setError('Erro ao carregar os dados do post.'))
        .finally(() => setFetching(false));
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isEditing && id) {
        await updatePost(id, { title, content, author });
      } else {
        await createPost({ title, content, author });
      }
      navigate('/admin');
    } catch (err) {
      setError('Erro ao salvar o post. Verifique a conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Container>
        <p style={{ textAlign: 'center' }}>Carregando dados para edição...</p>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton to="/admin"><ArrowLeft size={18} /> Voltar para o painel</BackButton>
      <Title>{isEditing ? 'Editar Postagem' : 'Nova Postagem'}</Title>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Título do Artigo</label>
          <Input
            type="text"
            placeholder="Ex: Arquitetura de Microserviços com Node.js"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Autor / Professor(a)</label>
          <Input
            type="text"
            placeholder="Nome do Autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>Conteúdo Completo</label>
          <Textarea
            placeholder="Escreva seu artigo aqui..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {isEditing ? 'Salvar Alterações' : 'Publicar Post'}
        </SubmitButton>
      </Form>
    </Container>
  );
};
