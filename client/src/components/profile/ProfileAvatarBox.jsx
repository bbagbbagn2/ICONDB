import { useState, useRef } from "react";
import styled from "styled-components";
import { apiClient } from "../../config/apiClient";
import OptimizedImage from "../OptimizedImage";

import { useNotification } from "../common/NotificationContext";

export default function ProfileAvatarBox({
  userId,
  currentAvatar,
  onAvatarUpdate,
}) {
  const [avatarPreview, setAvatarPreview] = useState(currentAvatar || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { toastSuccess, toastError, toastInfo } = useNotification();

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    await uploadAvatar(file);
  };

  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];
    if (!validTypes.includes(file.type)) {
      toastError(
        "파일 형식 오류",
        "PNG, JPG, JPEG, WEBP 파일만 업로드 가능합니다.",
      );
      return false;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toastError("파일 크기 초과", "5MB 이하의 이미지만 업로드 가능합니다.");
      return false;
    }

    return true;
  };

  const uploadAvatar = async (file) => {
    setIsUploading(true);
    toastInfo("업로드 중", "프로필 사진을 업로드하고 있습니다...");

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("userId", userId);

      const res = await apiClient.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.loaded,
          );
          console.log(`업로드 진행: ${percentCompleted}%`);
        },
      });

      toastSuccess("업로드 완료", "프로필 사진이 변경되었습니다.");

      if (onAvatarUpdate) {
        onAvatarUpdate(res.data.avatarUrl);
      }
    } catch (error) {
      console.error("아바타 업로드 실패:", error);

      // 에러 처리
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toastError("업로드 실패", "잘못된 파일 형식입니다.");
            break;
          case 401:
            toastError("인증 오류", "로그인이 필요합니다.");
            break;
          case 413:
            toastError("파일 크기 초과", "파일이 너무 큽니다.");
            break;
          default:
            toastError("업로드 실패", "프로필 사진 업로드에 실패했습니다.");
        }
      } else {
        toastError("네트워크 오류", "인터넷 연결을 확인해주세요.");
      }

      // 미리보기 원래대로 복구
      setAvatarPreview(currentAvatar);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Avatar>
      <AvatarImage $isUploading={isUploading}>
        {avatarPreview ? (
          <OptimizedImage
            src={avatarPreview}
            alt="profile"
            width={150}
            height={150}
            blur={false}
          />
        ) : (
          <DefaultAvatar>👤</DefaultAvatar>
        )}
        {isUploading && <UploadingOverlay>⏳</UploadingOverlay>}
      </AvatarImage>
      <EditAvatarButton onClick={handleEditClick} disabled={isUploading}>
        📷
      </EditAvatarButton>
      <HiddenFileInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
      />
    </Avatar>
  );
}

const Avatar = styled.div`
  position: relative;
`;

const AvatarImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 5px solid white;
  overflow: hidden;
  position: relative;
  opacity: ${(props) => (props.$isUploading ? 0.6 : 1)};
  transition: opacity 0.3s;

  div {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const DefaultAvatar = styled.div`
  font-size: 4rem;
`;

const UploadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const EditAvatarButton = styled.button`
  display: flex;
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid white;
  background: #f5a282;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.2rem;

  &:hover:not(:disabled) {
    transform: scale(1.1);
    background: #f38a62;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;
