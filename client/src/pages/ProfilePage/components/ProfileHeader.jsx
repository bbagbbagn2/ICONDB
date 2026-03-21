import React from "react";
import ImageUploader from "react-images-uploading";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ImageContainer from "../../components/ImageContainer";
import StyledInput from "../../components/StyledInput";
import StyledButton from "../../components/StyledButton";
import { ProfileBox, ProfileTitle, ProfileInfo } from "./ProfilePage.styles";
import {
  IMAGE_URLS,
  IMAGE_DIMENSIONS,
  ERROR_MESSAGES,
} from "./ProfilePage.constants";

export const ProfileHeader = ({
  isOwnProfile,
  profileData,
  isEditing,
  images,
  nickname,
  followed,
  apiLoading,
  onImageChange,
  onImageUpdate,
  onNicknameChange,
  onEditChange,
  onFollowToggle,
  onUpdateProfile,
  toastError,
}) => {
  if (isOwnProfile) {
    return (
      <ProfileBox>
        <ImageUploader
          value={images}
          onChange={onImageChange}
          maxNumber={1}
          dataURLKey="data_url"
          onError={() => toastError("오류", ERROR_MESSAGES.IMAGE_UPLOAD_ERROR)}
        >
          {({ imageList }) => (
            <>
              {imageList.length === 0 ? (
                <ImageContainer
                  src={
                    IMAGE_URLS.getUserProfile(profileData.profilename) ||
                    IMAGE_URLS.getDefaultAvatar()
                  }
                  alt="프로필"
                  width={IMAGE_DIMENSIONS.PROFILE.WIDTH}
                  height={IMAGE_DIMENSIONS.PROFILE.HEIGHT}
                  borderRadius="50%"
                />
              ) : (
                <ImageContainer
                  src={imageList[0].data_url}
                  alt="프로필"
                  width={IMAGE_DIMENSIONS.PROFILE.WIDTH}
                  height={IMAGE_DIMENSIONS.PROFILE.HEIGHT}
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
                    onChange={(e) => onNicknameChange(e.target.value)}
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
                  isEditing ? onUpdateProfile() : onEditChange(true)
                }
                disabled={apiLoading}
              />
              {isEditing && (
                <StyledButton
                  width="100%"
                  text="취소"
                  onClick={() => {
                    onEditChange(false);
                    onImageChange([]);
                    onNicknameChange(profileData.nickname);
                  }}
                />
              )}
            </>
          )}
        </ImageUploader>
      </ProfileBox>
    );
  }

  // 다른 사용자의 프로필
  return (
    <ProfileBox>
      <ImageContainer
        src={
          IMAGE_URLS.getUserProfile(profileData.profilename) ||
          IMAGE_URLS.getDefaultAvatar()
        }
        alt="프로필"
        width={IMAGE_DIMENSIONS.PROFILE.WIDTH}
        height={IMAGE_DIMENSIONS.PROFILE.HEIGHT}
        borderRadius="50%"
      />
      <ProfileTitle>{profileData.nickname}</ProfileTitle>
      <ProfileInfo>ID: {profileData.id}</ProfileInfo>
      {followed ? (
        <StyledButton onClick={onFollowToggle} disabled={apiLoading}>
          <CheckIcon style={{ marginRight: "8px" }} />
          팔로잉
        </StyledButton>
      ) : (
        <StyledButton onClick={onFollowToggle} disabled={apiLoading}>
          <AddIcon style={{ marginRight: "8px" }} />
          팔로우
        </StyledButton>
      )}
    </ProfileBox>
  );
};
