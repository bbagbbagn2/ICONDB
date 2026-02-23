import React from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import ProfileContainer from "../components/EditProfilePage/EditProfileContainer";

/**
 * EditProfilePage - 프로필 편집 페이지
 */
export default function EditProfilePage() {
  return (
    <>
      <Header />
      <PageContainer>
        <ProfileContainer />
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  min-height: calc(100vh - 60px);
  padding: 80px 2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfc;

  @media (max-width: 768px) {
    padding: 70px 1rem 1rem;
  }
`;
