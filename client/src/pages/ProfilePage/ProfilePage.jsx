import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/common/Header";
import { useNotification } from "../../components/common/NotificationContext";
import { useProfilePage } from "./useProfilePage";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileContent } from "./components/ProfileContent";
import { PageContainer, ProfileSection } from "./ProfilePage.styles";

/**
 * ProfilePage Component
 * 현재 사용자 또는 다른 사용자의 프로필을 표시합니다.
 * - /profile: 현재 로그인한 사용자의 프로필 (편집 가능)
 * - /profile/:userId: 특정 사용자의 프로필 (팔로우 가능)
 * Zustand 기반 전역 상태 관리 사용
 */
export default function ProfilePage() {
  const { toastError } = useNotification();
  const {
    // 상태
    isMobile,
    apiLoading,
    profileData,
    profileContent,
    profileLiked,
    profileFollowing,
    profileFollowers,
    followed,
    isEditing,
    images,
    nickname,
    isOwnProfile,
    // 함수
    setIsEditing,
    setImages,
    setNickname,
    handleFollowToggle,
    handleUpdateProfile,
  } = useProfilePage();

  return (
    <>
      <Helmet>
        <title>{profileData.nickname}의 프로필 - ICONDB</title>
        <meta
          name="description"
          content={`${profileData.nickname}의 아이콘 컬렉션을 확인하세요.`}
        />
        <meta
          property="og:title"
          content={`${profileData.nickname}의 프로필 - ICONDB`}
        />
      </Helmet>
      <Header />
      <PageContainer>
        <ProfileSection columns={isMobile ? "1fr" : "300px 1fr"}>
          <ProfileHeader
            isOwnProfile={isOwnProfile}
            profileData={profileData}
            isEditing={isEditing}
            images={images}
            nickname={nickname}
            followed={followed}
            apiLoading={apiLoading}
            onImageChange={setImages}
            onNicknameChange={setNickname}
            onEditChange={setIsEditing}
            onFollowToggle={handleFollowToggle}
            onUpdateProfile={handleUpdateProfile}
            toastError={toastError}
          />
          <ProfileContent
            isLoading={apiLoading}
            profileContent={profileContent}
            profileLiked={profileLiked}
            profileFollowing={profileFollowing}
            profileFollowers={profileFollowers}
          />
        </ProfileSection>
      </PageContainer>
    </>
  );
}
