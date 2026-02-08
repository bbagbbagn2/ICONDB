import { Link } from "react-router-dom";
import styled from "styled-components";

export default function CTASection() {
  return (
    <Section>
      <h2>지금 바로 시작하세요!</h2>
      <p>회원가입하고 다양한 무료 아이콘을 사용해보세요</p>
      <Link to="/signup">
        <Button style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
          가입하기
        </Button>
      </Link>
    </Section>
  );
}

const Section = styled.section`
  padding: 5rem 2rem;
  text-align: center;
  margin-top: 5rem;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    font-weight: 800;

    @media screen and (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;

    @media screen and (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 3rem 1.5rem;
    margin-top: 3rem;
  }
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
