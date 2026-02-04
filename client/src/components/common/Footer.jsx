import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h4>ICONDB</h4>
          <p>손쉽게 사용할 수 있는 무료 아이콘 공유 플랫폼</p>
        </FooterSection>
        <FooterSection>
          <h4>서비스</h4>
          <ul>
            <li>
              <Link to="#">아이콘 검색</Link>
            </li>
            <li>
              <Link to="posting">아이콘 업로드</Link>
            </li>
            <li>
              <Link to="#">컬렉션</Link>
            </li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h4>커뮤니티</h4>
          <ul>
            <li>
              <Link to="#">유저 찾기</Link>
            </li>
            <li>
              <Link to="profile">마이페이지</Link>
            </li>
          </ul>
        </FooterSection>
      </FooterContent>
      <FooterBottom />
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 3rem 2rem 1.5rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  h4 {
    margin-bottom: 1rem;
    color: #9ed1d9;
    font-weight: 700;
  }

  ul {
    list-style: none;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.3s;
    cursor: pointer;

    &:hover {
      color: #9ed1d9;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.8;
  }
`;

const FooterBottom = styled.div`
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;
