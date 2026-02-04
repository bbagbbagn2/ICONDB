import { Link } from "react-router-dom";
import styled from "styled-components";

export default function HeroSection() {
  return (
    <Section>
      <HeroContent>
        <h1>
          누구나 만들고, 누구나 쓰는
          <br />
          <Highlight>무료 아이콘</Highlight> 공유 플랫폼
        </h1>
        <p>
          과제, 프로젝트, 포트폴리오에 필요한 모든 아이콘을 무료로!
          <br />
          누구나 만들고 사용할 수 있는 크리에이티브 공간
        </p>
        <HeroButton>
          <Link to="/signup">
            <Button>무료로 시작하기</Button>
          </Link>
        </HeroButton>
      </HeroContent>
    </Section>
  );
}

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media screen and (max-width: 968px) {
    grid-template-columns: 1fr;
    padding: 3rem 1.5rem;
    gap: 3rem;
  }
`;

const HeroContent = styled.div`
  h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    font-weight: 800;

    @media screen and (max-width: 968px) {
      font-size: 2.2rem;
    }

    @media screen and (max-width: 480px) {
      font-size: 1.8rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: #5a6c7d;
    margin-bottom: 2rem;
    line-height: 1.8;

    @media (max-width: 968px) {
      font-size: 1.1rem;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

const Highlight = styled.span`
  color: #9ed1d9;
`;

const HeroButton = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background: ${(props) => (props.$secondary ? "white" : "#F5A282")};
  color: ${(props) => (props.$secondary ? "#9ED1D9" : "white")};
  padding: 0.7rem 1.8rem;
  border-radius: 25px;
  border: ${(props) => (props.$secondary ? "2px solid #9ED1D9" : "none")};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  font-size: 1rem;
  font-family: "Outfit", sans-serif;

  &:hover {
    background: ${(props) => (props.$secondary ? "#9ED1D9" : "#F38A62")};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px
      ${(props) =>
        props.$secondary
          ? "rgba(158, 209, 217, 0.3)"
          : "rgba(245, 162, 130, 0.3)"};
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
`;
