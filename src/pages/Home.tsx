import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts } from '../services/api';
import type { Post } from '../types/blog';
import { Search, Calendar, User, ArrowRight, Loader2 } from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
    span {
      color: var(--primary);
    }
  }
  p {
    color: var(--text-muted);
    font-size: 1.125rem;
    max-width: 600px;
    margin: 0 auto 2rem;
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border-radius: var(--radius);
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: var(--primary);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

const PostCard = styled(Link)`
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--primary);
  }
`;

const PostMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
`;

const PostTitle = styled.h2`
  font-size: 1.35rem;
  margin-bottom: 0.75rem;
  color: var(--text-main);
`;

const PostExcerpt = styled.p`
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMore = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  font-weight: 600;
  font-size: 0.9rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  color: var(--primary);
`;

const ErrorMsg = styled.div`
  text-align: center;
  color: var(--danger);
  padding: 2rem;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: var(--radius);
`;

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (query?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts(query);
      setPosts(data);
    } catch (err) {
      setError('Não foi possível carregar as postagens. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Container>
      <HeroSection>
        <h1>Blog de Engenharia de Software <span>FIAP</span></h1>
        <p>Compartilhando conhecimento acadêmico, tutoriais técnicos e inovações da pós-graduação.</p>
        <SearchBarContainer>
          <SearchIcon size={20} />
          <SearchInput
            type="text"
            placeholder="Buscar por palavras-chave ou título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBarContainer>
      </HeroSection>

      {loading ? (
        <LoadingSpinner>
          <Loader2 className="animate-spin" size={40} />
        </LoadingSpinner>
      ) : error ? (
        <ErrorMsg>{error}</ErrorMsg>
      ) : posts.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Nenhum post encontrado.</p>
      ) : (
        <PostGrid>
          {posts.map((post) => (
            <PostCard key={post._id} to={`/post/${post._id}`}>
              <div>
                <PostMeta>
                  <div>
                    <User size={14} /> {post.author}
                  </div>
                  <div>
                    <Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </PostMeta>
                <PostTitle>{post.title}</PostTitle>
                <PostExcerpt>{post.content}</PostExcerpt>
              </div>
              <ReadMore>
                Ler artigo completo <ArrowRight size={16} />
              </ReadMore>
            </PostCard>
          ))}
        </PostGrid>
      )}
    </Container>
  );
};
