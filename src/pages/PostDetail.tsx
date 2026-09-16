import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPostById } from '../services/api';
import type { Post } from '../types/blog';
import { User, Calendar, ArrowLeft, Loader2 } from 'lucide-react';

const Container = styled.div`
  max-width: 800px;
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

const PostHeader = styled.header`
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const Meta = styled.div`
  display: flex;
  gap: 1.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Content = styled.article`
  font-size: 1.125rem;
  line-height: 1.8;
  color: #e2e8f0;
  white-space: pre-wrap;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem;
  color: var(--primary);
`;

const ErrorContainer = styled.div`
  text-align: center;
  color: var(--danger);
  padding: 2rem;
`;

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        setError('Post não encontrado ou falha ao carregar.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <LoadingContainer>
        <Loader2 size={40} />
      </LoadingContainer>
    );
  }

  if (error || !post) {
    return (
      <Container>
        <BackButton to="/"><ArrowLeft size={18} /> Voltar para a lista</BackButton>
        <ErrorContainer>{error || 'Post não encontrado'}</ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton to="/"><ArrowLeft size={18} /> Voltar para a lista</BackButton>
      <PostHeader>
        <Title>{post.title}</Title>
        <Meta>
          <div><User size={16} /> Prof. {post.author}</div>
          <div><Calendar size={16} /> {new Date(post.createdAt).toLocaleDateString('pt-BR')}</div>
        </Meta>
      </PostHeader>
      <Content>{post.content}</Content>
    </Container>
  );
};
