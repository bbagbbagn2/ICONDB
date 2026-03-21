export const S3_BASE_URL =
  "https://webservicegraduationproject.s3.amazonaws.com";

export const IMAGE_URLS = {
  getUserProfile: (profilename) => `${S3_BASE_URL}/userprofile/${profilename}`,
  getIcon: (filename) => `${S3_BASE_URL}/img/${filename}`,
  getDefaultAvatar: () =>
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e0e0e0'/%3E%3C/svg%3E",
};

export const IMAGE_DIMENSIONS = {
  PROFILE: {
    WIDTH: "150px",
    HEIGHT: "150px",
  },
  ICON: {
    WIDTH: 200,
    HEIGHT: 200,
  },
  USER_AVATAR: {
    WIDTH: 100,
    HEIGHT: 100,
  },
};

export const ERROR_MESSAGES = {
  NO_CHANGES: "변경할 내용이 없습니다.",
  LOGIN_REQUIRED: "로그인 필요",
  LOGIN_REQUIRED_FOLLOW: "로그인 후 팔로우할 수 있습니다.",
  IMAGE_UPLOAD_ERROR: "이미지는 1개까지만 첨부할 수 있습니다.",
};

export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: "프로필이 업데이트되었습니다.",
  FOLLOWED: "팔로우되었습니다.",
  UNFOLLOWED: "언팔로우되었습니다.",
};

export const BREAKPOINTS = {
  MOBILE: 600,
  TABLET: 768,
};

export const EMPTY_STATE_MESSAGES = {
  NO_ICONS: "아이콘이 없습니다.",
  NO_LIKES: "좋아요 한 아이콘이 없습니다.",
  NO_FOLLOWING: "팔로잉 중인 사용자가 없습니다.",
  NO_FOLLOWERS: "팔로워가 없습니다.",
};
