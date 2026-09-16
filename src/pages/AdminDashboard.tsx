import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts, deletePost } from '../services/api';
import type { Post } from '../types/blog';
import { Plus, Edit2, Trash2, ExternalLink, Loader2, FileText } from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ffffff;
`;

const CreateButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius);
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--primary-hover);
  }
`;

const TableContainer = styled.div`
  background-color: var(--bg-card);
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th, td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
  }

  th {
    background-color: rgba(15, 23, 42, 0.5);
    color: var(--text-muted);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 6px;
  background-color: var(--bg-dark);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
`;

const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 6px;
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--danger);
  border: 1px solid rgba(239, 68, 68, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--danger);
    color: white;
  }
`;

const ErrorMsg = styled.div`
  color: var(--danger);
  background-color: rgba(239, 68, 68, 0.1);
  padding: 1rem;
  border-radius: var(--radius);
  margin-bottom: 1rem;
`;

const EmptyState = styled.div`
  width: 100%;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 2.5rem 4rem;
  text-align: center;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  box-sizing: border-box;

  p {
    font-size: 1.15rem;
    color: var(--text-main);
  }
`;

export const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError('Erro ao buscar lista de posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o post "${title}"?`)) {
      try {
        await deletePost(id);
        setPosts(posts.filter((p) => p._id !== id));
      } catch (err) {
        alert('Erro ao excluir o post.');
      }
    }
  };

  return (
    <Container>
      <HeaderSection>
        <div>
          <Title>Painel Administrativo</Title>
          <p style={{ color: 'var(--text-muted)' }}>Gerencie os artigos publicados no blog</p>
        </div>
        <CreateButton to="/create">
          <Plus size={18} /> Novo Artigo
        </CreateButton>
      </HeaderSection>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 className="animate-spin" size={40} color="var(--primary)" />
        </div>
      ) : posts.length === 0 ? (
        <EmptyState>
          <FileText size={48} opacity={0.4} />
          <p>Nenhum artigo publicado no momento.</p>
          <CreateButton to="/create">
            <Plus size={18} /> Publicar o Primeiro Artigo
          </CreateButton>
        </EmptyState>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Data</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td style={{ fontWeight: 600 }}>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <Actions style={{ justifyContent: 'flex-end' }}>
                      <ActionButton to={`/post/${post._id}`} title="Visualizar">
                        <ExternalLink size={16} />
                      </ActionButton>
                      <ActionButton to={`/edit/${post._id}`} title="Editar">
                        <Edit2 size={16} />
                      </ActionButton>
                      <DeleteButton onClick={() => handleDelete(post._id, post.title)} title="Excluir">
                        <Trash2 size={16} />
                      </DeleteButton>
                    </Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
