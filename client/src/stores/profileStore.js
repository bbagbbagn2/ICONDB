import { create } from "zustand";
import axios from "axios";

/**
 * Zustand 기반 프로필 상태 관리 스토어
 *
 * 기능:
 * - 프로필 데이터 관리 (콘텐츠, 좋아요, 팔로우)
 * - 팔로우/언팔로우 상태 관리
 * - 프로필 편집 및 업데이트
 * - 로딩 및 에러 상태 관리
 */
export const useProfileStore = create((set, get) => ({
  // 상태
  profileData: {
    profilename: "Anonymous.png",
    nickname: "Anonymous",
    id: "",
  },
  profileContent: [],
  profileLiked: [],
  profileFollowing: [],
  profileFollowers: [],
  followed: false,
  isLoading: false,
  isEditing: false,
  error: null,
  currentProfileUserId: null,

  // 액션: 프로필 데이터 조회
  fetchProfileData: async (userId) => {
    set({ isLoading: true, error: null, currentProfileUserId: userId });
    try {
      const [
        profileRes,
        contentRes,
        likedRes,
        followingRes,
        followerRes,
        followCheckRes,
      ] = await Promise.all([
        axios.post("/get_profile", { user: userId }),
        axios.post("/get_usercontent", { id: userId }),
        axios.post("/get_userlikedcontent", { id: userId }),
        axios.post("/get_following", { id: userId }),
        axios.post("/get_followers", { id: userId }),
        axios.post("/check_followed", { userId }),
      ]);

      set({
        profileData: profileRes.data?.[0] || {
          profilename: "Anonymous.png",
          nickname: "Anonymous",
          id: userId,
        },
        profileContent: contentRes.data || [],
        profileLiked: likedRes.data || [],
        profileFollowing: followingRes.data || [],
        profileFollowers: followerRes.data || [],
        followed: followCheckRes.data?.followed || false,
        isLoading: false,
      });

      return {
        profileData: profileRes.data?.[0],
        profileContent: contentRes.data,
        profileLiked: likedRes.data,
        profileFollowing: followingRes.data,
        profileFollowers: followerRes.data,
        followed: followCheckRes.data?.followed,
      };
    } catch (error) {
      console.error("프로필 데이터 조회 실패:", error);
      set({
        isLoading: false,
        error: error.message || "프로필 조회 중 오류가 발생했습니다.",
      });
      return null;
    }
  },

  // 액션: 팔로우
  followUser: async (userId) => {
    try {
      await axios.post("/follow", { userId });
      set({ followed: true });
      return true;
    } catch (error) {
      console.error("팔로우 실패:", error);
      set({ error: "팔로우 중 오류가 발생했습니다." });
      return false;
    }
  },

  // 액션: 언팔로우
  unfollowUser: async (userId) => {
    try {
      await axios.post("/unfollow", { userId });
      set({ followed: false });
      return true;
    } catch (error) {
      console.error("언팔로우 실패:", error);
      set({ error: "언팔로우 중 오류가 발생했습니다." });
      return false;
    }
  },

  // 액션: 프로필 업데이트 (현재 사용자)
  updateProfile: async (nickname, profileImage) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("nickname", nickname);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await axios.post("/update_profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set((state) => ({
        profileData: {
          ...state.profileData,
          nickname,
          profilename:
            response.data?.profilename || state.profileData.profilename,
        },
        isLoading: false,
        isEditing: false,
      }));

      return true;
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      set({
        isLoading: false,
        error: error.message || "프로필 업데이트 중 오류가 발생했습니다.",
      });
      return false;
    }
  },

  // 액션: 편집 모드 토글
  setIsEditing: (isEditing) => {
    set({ isEditing });
  },

  // 액션: 콘텐츠 리스트 업데이트
  setProfileContent: (content) => {
    set({ profileContent: content });
  },

  // 액션: 좋아요 리스트 업데이트
  setProfileLiked: (liked) => {
    set({ profileLiked: liked });
  },

  // 액션: 팔로잉 리스트 업데이트
  setProfileFollowing: (following) => {
    set({ profileFollowing: following });
  },

  // 액션: 팔로워 리스트 업데이트
  setProfileFollowers: (followers) => {
    set({ profileFollowers: followers });
  },

  // 액션: 프로필 데이터 초기화
  clearProfileData: () => {
    set({
      profileData: {
        profilename: "Anonymous.png",
        nickname: "Anonymous",
        id: "",
      },
      profileContent: [],
      profileLiked: [],
      profileFollowing: [],
      profileFollowers: [],
      followed: false,
      currentProfileUserId: null,
      error: null,
    });
  },

  // 액션: 에러 초기화
  clearError: () => {
    set({ error: null });
  },
}));

// 선택적 selectors (성능 최적화)
export const useProfileData = () =>
  useProfileStore((state) => state.profileData);
export const useProfileContent = () =>
  useProfileStore((state) => state.profileContent);
export const useProfileLiked = () =>
  useProfileStore((state) => state.profileLiked);
export const useProfileFollowing = () =>
  useProfileStore((state) => state.profileFollowing);
export const useProfileFollowers = () =>
  useProfileStore((state) => state.profileFollowers);
export const useProfileFollowed = () =>
  useProfileStore((state) => state.followed);
export const useProfileLoading = () =>
  useProfileStore((state) => state.isLoading);
export const useProfileError = () => useProfileStore((state) => state.error);
