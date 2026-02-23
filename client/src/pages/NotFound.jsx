import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

/**
 * NotFound 페이지 (404)
 * 잘못된 경로에 접근했을 때 표시되는 페이지
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <PageContainer>
        <ContentWrapper>
          <NotFoundBox>
            <ErrorNumber>404</ErrorNumber>
            <ErrorTitle>페이지를 찾을 수 없습니다</ErrorTitle>
            <ErrorDescription>
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </ErrorDescription>

            <Illustration>
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                {/* 돋보기 아이콘 */}
                <circle
                  cx="60"
                  cy="60"
                  r="40"
                  fill="none"
                  stroke="#9ed1d9"
                  strokeWidth="8"
                />
                <line
                  x1="95"
                  y1="95"
                  x2="140"
                  y2="140"
                  stroke="#9ed1d9"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* 물음표 */}
                <text
                  x="60"
                  y="70"
                  fontSize="40"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#9ed1d9"
                >
                  ?
                </text>
              </svg>
            </Illustration>

            <SuggestionList>
              <SuggestionTitle>다음을 확인해주세요:</SuggestionTitle>
              <SuggestionItem>• URL이 올바르게 입력되었는지</SuggestionItem>
              <SuggestionItem>• 페이지가 아직 존재하는지</SuggestionItem>
              <SuggestionItem>• 페이지 권한이 있는지</SuggestionItem>
            </SuggestionList>

            <ActionButtons>
              <HomeLink to="/">
                <HomeButton>홈으로 돌아가기</HomeButton>
              </HomeLink>
              <SearchLink to="/">
                <SearchButton>검색하기</SearchButton>
              </SearchLink>
            </ActionButtons>
          </NotFoundBox>
        </ContentWrapper>
      </PageContainer>
      <Footer />
    </>
  );
}

// Styled Components
const PageContainer = styled.div`
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fafbfc 0%, #f0faff 100%);
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
`;

const NotFoundBox = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  padding: 3rem 2rem;
  text-align: center;
  animation: slideUp 0.5s ease-out;
  border: 2px solid rgba(158, 209, 217, 0.1);

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 600px) {
    padding: 2rem 1.5rem;
  }
`;

const ErrorNumber = styled.div`
  font-size: 6rem;
  font-weight: 900;
  background: linear-gradient(135deg, #9ed1d9 0%, #f5a282 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  letter-spacing: -2px;
`;

const ErrorTitle = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const ErrorDescription = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Illustration = styled.div`
  margin: 2rem 0;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    max-width: 150px;
  }
`;

const SuggestionList = styled.div`
  background: #f8fbfc;
  border-left: 4px solid #9ed1d9;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  text-align: left;
`;

const SuggestionTitle = styled.p`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.8rem;
`;

const SuggestionItem = styled.p`
  color: #5a6c7d;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const HomeLink = styled(Link)`
  flex: 1;
  text-decoration: none;
`;

const HomeButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #9ed1d9 0%, #7bc4ce 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(158, 209, 217, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SearchLink = styled(Link)`
  flex: 1;
  text-decoration: none;
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: white;
  color: #7bc4ce;
  border: 2px solid #7bc4ce;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f0fafb;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(123, 196, 206, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;
