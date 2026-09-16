import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { Lock, User } from 'lucide-react';

const Container = styled.div`
  max-width: 420px;
  margin: 4rem auto;
  padding: 2.5rem;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: var(--text-muted);
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 1rem;
    color: var(--text-muted);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
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

const SubmitButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.875rem;
  border-radius: var(--radius);
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--primary-hover);
  }
`;

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      navigate(from, { replace: true });
    }
  };

  return (
    <Container>
      <Title>Área do Docente</Title>
      <Subtitle>Autentique-se para criar e gerenciar postagens</Subtitle>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Nome do Professor(a)</label>
          <InputWrapper>
            <User size={18} />
            <Input
              type="text"
              placeholder="Ex: Carlos Silva"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <label>Senha de Acesso</label>
          <InputWrapper>
            <Lock size={18} />
            <Input
              type="password"
              placeholder="••••••••"
              defaultValue="123456"
              required
            />
          </InputWrapper>
        </FormGroup>

        <SubmitButton type="submit">Entrar no Painel</SubmitButton>
      </Form>
    </Container>
  );
};
