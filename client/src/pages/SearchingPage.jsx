import { Helmet } from "react-helmet";
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

import Header from "../components/common/Header";
import SearchBox from "../components/SearchBox";
import TopButton from "../components/TopButton";
import Footer from "../components/common/Footer";
import { useSearchStore } from "../stores/searchStore";

/**
 * SearchingPage Component
 * 키워드 기반 아이콘 검색 페이지
 * Zustand 기반 전역 상태 관리 사용
 */
export default function SearchingPage() {
  const { keyword } = useParams();
  const searchByKeyword = useSearchStore((state) => state.searchByKeyword);
  const data = useSearchStore((state) => state.searchResults);
  const isLoading = useSearchStore((state) => state.isLoading);

  // 검색 수행
  useEffect(() => {
    if (!keyword || keyword.trim().length === 0) {
      return;
    }

    searchByKeyword(keyword);
  }, [keyword, searchByKeyword]);

  return (
    <>
      <Helmet>
        <title>{keyword} 검색 - ICONDB</title>
        <meta
          name="description"
          content={`"${keyword}" 검색 결과 (${data.length}개)`}
        />
        <meta property="og:title" content={`${keyword} 검색 - ICONDB`} />
      </Helmet>
      <Header />
      <PageContainer>
        <SearchSection>
          <SearchBox width="100%" fontSize="32px" maxWidth="600px" />
          <ResultTitle>
            검색 결과: <HighlightKeyword>{keyword}</HighlightKeyword>
          </ResultTitle>
        </SearchSection>

        <ContentSection>
          {loading ? (
            <LoadingContainer>
              <CircularProgress size={60} />
            </LoadingContainer>
          ) : data.length === 0 ? (
            <EmptyContainer>
              <EmptyTitle>검색 결과가 없습니다</EmptyTitle>
              <EmptyText>다른 키워드로 검색해보세요.</EmptyText>
            </EmptyContainer>
          ) : (
            <ImageGrid>
              {data.map((item, idx) => (
                <IconLink key={idx} to={`/post/${item.content_id}`}>
                  <IconWrapper>
                    <IconImage
                      src={`https://webservicegraduationproject.s3.amazonaws.com/img/${item.filename}`}
                      alt={item.filename}
                    />
                    <Overlay>
                      <OverlayText>상세 보기</OverlayText>
                    </Overlay>
                  </IconWrapper>
                </IconLink>
              ))}
            </ImageGrid>
          )}
        </ContentSection>

        <TopButton />
        <Footer />
      </PageContainer>
    </>
  );
}

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  padding: 80px 2rem 2rem;
  background: #fafbfc;
`;

const SearchSection = styled.div`
  max-width: 1200px;
  margin: 0 auto 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const ResultTitle = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  text-align: center;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HighlightKeyword = styled.span`
  color: #9ed1d9;
  font-weight: 700;
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

const IconLink = styled(Link)`
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 12px;
`;

const OverlayText = styled.span`
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
`;
const IconWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
  aspect-ratio: 1;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

    img {
      transform: scale(1.05);
    }

    ${Overlay} {
      opacity: 1;
    }
  }
`;
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
`;

const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
`;

const EmptyText = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
  transition: transform 0.3s ease;
`;
