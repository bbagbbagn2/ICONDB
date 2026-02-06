import styled from "styled-components";

export default function TitleBox() {
  return (
    <div>
      <PageTitle>아이콘 업로드</PageTitle>
      <PageSubtitle>공유할 아이콘을 업로드하세요</PageSubtitle>
    </div>
  );
}

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  font-weight: 800;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  color: #5a6c7d;
  font-size: 1.1rem;
  margin-bottom: 3rem;
`;
