import styled from "styled-components";
import Header from "../components/common/Header";
import TitleBox from "../components/upload/TitleBox";
import UploadBox from "../components/upload/UploadBox";
import FormBox from "../components/upload/FormBox";

export default function UploadPage() {
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <TitleBox />
        <UploadBox />
        <FormBox />
      </MainContent>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  min-height: 100vh;
`;

const MainContent = styled.div`
  max-width: 1000px;
  margin: 3rem auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    margin: 2rem auto;
    padding: 0 1.5rem;
  }
`;
