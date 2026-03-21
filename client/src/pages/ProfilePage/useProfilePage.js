import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { useNotification } from "../../components/common/NotificationContext";
import { useAuthStore } from "../../stores/authStore";
import { useProfileStore } from "../../stores/profileStore";
import { useIsMobile, useUIStore } from "../../stores/uiStore";
import {
  BREAKPOINTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "./ProfilePage.constants";

export const useProfilePage = () => {
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
      setIsMobile(window.innerWidth <= BREAKPOINTS.MOBILE);
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
      toastError(
        ERROR_MESSAGES.LOGIN_REQUIRED,
        ERROR_MESSAGES.LOGIN_REQUIRED_FOLLOW,
      );
      navigate("/login");
      return;
    }

    const success = followed
      ? await unfollowUser(userId)
      : await followUser(userId);

    if (success) {
      toastSuccess(
        "성공",
        followed ? SUCCESS_MESSAGES.UNFOLLOWED : SUCCESS_MESSAGES.FOLLOWED,
      );
    }
  };

  // 프로필 업데이트
  const handleUpdateProfile = async () => {
    if (!images.length && nickname === profileData.nickname) {
      toastError("오류", ERROR_MESSAGES.NO_CHANGES);
      return;
    }

    let profileImage = null;
    if (images.length > 0) {
      profileImage = images[0].file;
    }

    const success = await updateProfile(nickname, profileImage);
    if (success) {
      toastSuccess("성공", SUCCESS_MESSAGES.PROFILE_UPDATED);
      setImages([]);
    }
  };

  const isOwnProfile = !userId || userId === user;

  return {
    // 상태
    userId,
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
  };
};
