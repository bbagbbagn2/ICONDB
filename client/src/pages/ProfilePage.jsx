import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ThemeProvider, Button, CircularProgress } from "@material-ui/core";
import ImageUploader from "react-images-uploading";
import styled from "styled-components";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

import { theme } from "../components/theme";
import Header from "../components/common/Header";
import ImageContainer from "../components/ImageContainer";
import StyledInput from "../components/StyledInput";
import StyledButton from "../components/StyledButton";
import Loading from "../components/Loading";
import { useApi } from "../hooks/useApi";
import { useNotification } from "../components/common/NotificationContext";
import { useAuthStore } from "../stores/authStore";
import { useProfileStore } from "../stores/profileStore";
import { useIsMobile, useUIStore } from "../stores/uiStore";

/**
 * ProfilePage Component
 * 현재 사용자 또는 다른 사용자의 프로필을 표시합니다.
 * - /profile: 현재 로그인한 사용자의 프로필 (편집 가능)
 * - /profile/:userId: 특정 사용자의 프로필 (팔로우 가능)
 * Zustand 기반 전역 상태 관리 사용
 */
export default function ProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { request, loading: apiLoading } = useApi();
  const { toastSuccess, toastError } = useNotification();
  const user = useAuthStore((state) => state.user);
  const isMobile = useIsMobile();
  const setIsMobile = useUIStore((state) => state.setIsMobile);

  // 프로필 스토어
  const fetchProfileData = useProfileStore((state) => state.fetchProfileData);
  const profileData = useProfileStore((state) => state.profileData);
  const profileContent = useProfileStore((state) => state.profileContent);
  const profileLiked = useProfileStore((state) => state.profileLiked);
  const profileFollowing = useProfileStore((state) => state.profileFollowing);
  const profileFollowers = useProfileStore((state) => state.profileFollowers);
  const followed = useProfileStore((state) => state.followed);
  const isEditing = useProfileStore((state) => state.isEditing);
  const setIsEditing = useProfileStore((state) => state.setIsEditing);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const followUser = useProfileStore((state) => state.followUser);
  const unfollowUser = useProfileStore((state) => state.unfollowUser);

  const [images, setImages] = useState([]);
  const [nickname, setNickname] = useState("");

  // 반응형 디자인
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile]);

  // 프로필 데이터 가져오기
  useEffect(() => {
    if (!user) return;

    const targetUserId = userId || user;
    fetchProfileData(targetUserId);
  }, [userId, user, fetchProfileData]);

  // 닉네임 동기화
  useEffect(() => {
    setNickname(profileData.nickname || "");
  }, [profileData.nickname]);

  // 팔로우 토글
  const handleFollowToggle = async () => {
    if (!user) {
      toastError("로그인 필요", "로그인 후 팔로우할 수 있습니다.");
      navigate("/login");
      return;
    }

    const success = followed
      ? await unfollowUser(userId)
      : await followUser(userId);

    if (success) {
      toastSuccess(
        "성공",
        followed ? "언팔로우되었습니다." : "팔로우되었습니다.",
      );
    }
  };

  // 프로필 업데이트
  const handleUpdateProfile = async () => {
    if (!images.length && nickname === profileData.nickname) {
      toastError("오류", "변경할 내용이 없습니다.");
      return;
    }

    let profileImage = null;
    if (images.length > 0) {
      profileImage = images[0].file;
    }

    const success = await updateProfile(nickname, profileImage);
    if (success) {
      toastSuccess("성공", "프로필이 업데이트되었습니다.");
      setImages([]);
    }
  };

  const isOwnProfile = !userId || userId === user;

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
          <ProfileBox>
            {isOwnProfile ? (
              <ImageUploader
                value={images}
                onChange={(imageList) => setImages(imageList)}
                maxNumber={1}
                dataURLKey="data_url"
                onError={() =>
                  toastError("오류", "이미지는 1개까지만 첨부할 수 있습니다.")
                }
              >
                {({ imageList, onImageUpdate }) => (
                  <>
                    {imageList.length === 0 ? (
                      <ImageContainer
                        src={
                          `https://webservicegraduationproject.s3.amazonaws.com/userprofile/${profileData.profilename}` ||
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e0e0e0'/%3E%3C/svg%3E"
                        }
                        alt="프로필"
                        width="150px"
                        height="150px"
                        borderRadius="50%"
                      />
                    ) : (
                      <ImageContainer
                        src={imageList[0].data_url}
                        alt="프로필"
                        width="150px"
                        height="150px"
                        borderRadius="50%"
                      />
                    )}
                    <ProfileTitle>{profileData.nickname}</ProfileTitle>
                    <ProfileInfo>ID: {profileData.id}</ProfileInfo>
                    {isEditing && (
                      <>
                        <StyledInput
                          placeholder="새 닉네임"
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                        />
                        <StyledButton
                          width="100%"
                          text="이미지 변경"
                          onClick={() => onImageUpdate(0)}
                        />
                      </>
                    )}
                    <StyledButton
                      width="100%"
                      text={isEditing ? "프로필 저장" : "프로필 편집"}
                      onClick={() =>
                        isEditing ? handleUpdateProfile() : setIsEditing(true)
                      }
                      disabled={apiLoading}
                    />
                    {isEditing && (
                      <StyledButton
                        width="100%"
                        text="취소"
                        onClick={() => {
                          setIsEditing(false);
                          setImages([]);
                          setNickname(profileData.nickname);
                        }}
                      />
                    )}
                  </>
                )}
              </ImageUploader>
            ) : (
              <>
                <ImageContainer
                  src={
                    `https://webservicegraduationproject.s3.amazonaws.com/userprofile/${profileData.profilename}` ||
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e0e0e0'/%3E%3C/svg%3E"
                  }
                  alt="프로필"
                  width="150px"
                  height="150px"
                  borderRadius="50%"
                />
                <ProfileTitle>{profileData.nickname}</ProfileTitle>
                <ProfileInfo>ID: {profileData.id}</ProfileInfo>
                <ThemeProvider theme={theme}>
                  {followed ? (
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      onClick={handleFollowToggle}
                      disabled={apiLoading}
                      startIcon={<CheckIcon />}
                    >
                      팔로잉
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={handleFollowToggle}
                      disabled={apiLoading}
                      startIcon={<AddIcon />}
                    >
                      팔로우
                    </Button>
                  )}
                </ThemeProvider>
              </>
            )}
          </ProfileBox>

          <ContentSection>
            {apiLoading ? (
              <LoadingContainer>
                <CircularProgress />
              </LoadingContainer>
            ) : (
              <>
                <ContentBox>
                  <SectionTitle>
                    내 아이콘 ({profileContent.length})
                  </SectionTitle>
                  <IconGrid>
                    {profileContent.map((item, idx) => (
                      <IconLink key={idx} to={`/post/${item.content_id}`}>
                        <IconImage
                          src={`https://webservicegraduationproject.s3.amazonaws.com/img/${item.filename}`}
                          alt={`아이콘 ${idx}`}
                        />
                      </IconLink>
                    ))}
                    {profileContent.length === 0 && (
                      <EmptyMessage>아이콘이 없습니다.</EmptyMessage>
                    )}
                  </IconGrid>
                </ContentBox>

                <ContentBox>
                  <SectionTitle>좋아요 ({profileLiked.length})</SectionTitle>
                  <IconGrid>
                    {profileLiked.map((item, idx) => (
                      <IconLink key={idx} to={`/post/${item.content_id}`}>
                        <IconImage
                          src={`https://webservicegraduationproject.s3.amazonaws.com/img/${item.filename}`}
                          alt={`좋아요 ${idx}`}
                        />
                      </IconLink>
                    ))}
                    {profileLiked.length === 0 && (
                      <EmptyMessage>좋아요 한 아이콘이 없습니다.</EmptyMessage>
                    )}
                  </IconGrid>
                </ContentBox>

                <ContentBox>
                  <SectionTitle>
                    팔로잉 ({profileFollowing.length})
                  </SectionTitle>
                  <UserGrid>
                    {profileFollowing.map((user, idx) => (
                      <UserLink key={idx} to={`/profile/${user.id}`}>
                        <UserImage
                          src={`https://webservicegraduationproject.s3.amazonaws.com/userprofile/${user.profilename}`}
                          alt={user.nickname}
                        />
                        <UserName>{user.nickname}</UserName>
                      </UserLink>
                    ))}
                    {profileFollowing.length === 0 && (
                      <EmptyMessage>
                        팔로잉 중인 사용자가 없습니다.
                      </EmptyMessage>
                    )}
                  </UserGrid>
                </ContentBox>

                <ContentBox>
                  <SectionTitle>
                    팔로워 ({profileFollowers.length})
                  </SectionTitle>
                  <UserGrid>
                    {profileFollowers.map((user, idx) => (
                      <UserLink key={idx} to={`/profile/${user.id}`}>
                        <UserImage
                          src={`https://webservicegraduationproject.s3.amazonaws.com/userprofile/${user.profilename}`}
                          alt={user.nickname}
                        />
                        <UserName>{user.nickname}</UserName>
                      </UserLink>
                    ))}
                    {profileFollowers.length === 0 && (
                      <EmptyMessage>팔로워가 없습니다.</EmptyMessage>
                    )}
                  </UserGrid>
                </ContentBox>
              </>
            )}
          </ContentSection>
        </ProfileSection>
      </PageContainer>
    </>
  );
}

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  padding: 80px 2rem 2rem;
  background: #fafbfc;

  @media (max-width: 768px) {
    padding: 70px 1rem 1rem;
  }
`;

const ProfileSection = styled.div`
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

const ProfileBox = styled.div`
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

const ProfileTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 1rem 0 0;
  text-align: center;
`;

const ProfileInfo = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContentBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #9ed1d9;
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.8rem;
  }
`;

const IconLink = styled(Link)`
  text-decoration: none;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const IconImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  background: #f0f0f0;
  border: 1px solid #e8e8e8;
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 0.8rem;
  }
`;

const UserLink = styled(Link)`
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

const UserImage = styled.img`
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

const UserName = styled.span`
  font-size: 0.85rem;
  color: #2c3e50;
  text-align: center;
  word-break: break-word;
  max-width: 100%;
`;

const EmptyMessage = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  color: #95a5a6;
  padding: 2rem;
  font-style: italic;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;
