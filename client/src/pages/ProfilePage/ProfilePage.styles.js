import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 80px 2rem 2rem;
  background: #fafbfc;

  @media (max-width: 768px) {
    padding: 70px 1rem 1rem;
  }
`;

export const ProfileSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: ${(props) => props.columns || "1fr"};
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const ProfileBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  position: sticky;
  top: 80px;
  height: fit-content;

  @media (max-width: 768px) {
    position: relative;
    top: 0;
  }
`;

export const ProfileTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 1rem 0 0;
  text-align: center;
`;

export const ProfileInfo = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ContentBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const SectionTitle = styled.h3`
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #9ed1d9;
`;

export const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.8rem;
  }
`;

export const IconLink = styled(Link)`
  text-decoration: none;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 0.8rem;
  }
`;

export const UserLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background: #f0f0f0;
  border: 2px solid #9ed1d9;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

export const UserName = styled.span`
  font-size: 0.85rem;
  color: #2c3e50;
  text-align: center;
  word-break: break-word;
  max-width: 100%;
`;

export const EmptyMessage = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  color: #95a5a6;
  padding: 2rem;
  font-style: italic;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;
