import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogIn, LogOut, PlusSquare, LayoutDashboard } from 'lucide-react';

const HeaderContainer = styled.header`
  background-color: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);

  span {
    color: var(--primary);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-main);
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--primary-hover);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: var(--danger);
    border-color: var(--danger);
  }
`;

const UserBadge = styled.span`
  font-size: 0.875rem;
  color: var(--primary);
  background: rgba(237, 20, 91, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-weight: 600;
`;

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
          <BookOpen color="var(--primary)" size={28} />
          FIAP <span>TechBlog</span>
        </Logo>
        <NavLinks>
          <NavLink to="/">Início</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/admin">
                <LayoutDashboard size={18} /> Painel
              </NavLink>
              <NavLink to="/create">
                <PlusSquare size={18} /> Novo Post
              </NavLink>
              <UserBadge>Prof. {user?.username}</UserBadge>
              <LogoutButton onClick={handleLogout}>
                <LogOut size={18} /> Sair
              </LogoutButton>
            </>
          ) : (
            <Button onClick={() => navigate('/login')}>
              <LogIn size={18} /> Área Docente
            </Button>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};
