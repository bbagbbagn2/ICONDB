import { useRef, useState } from "react";
import styled from "styled-components";

import UploadCardBox from "./UploadCard";
import PreviewBox from "./PreviewBox";

export default function UploadBox() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = async (newFiles) => {
    const validFiles = newFiles.filter(
      (file) => file.type.startsWith("image/") || file.type === "image/svg+xml",
    );

    const filePromises = validFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            file: file,
            url: e.target.result,
            name: file.name,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    const results = await Promise.all(filePromises);
    setFiles((prev) => [...prev, ...results]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <UploadCardBox>
      <UploadArea
        $isDragging={isDragging}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadText>
          <h3>파일을 드래그하거나 클릭하여 업로드</h3>
          <p>SVG, PNG, JPG 파일을 지원합니다 (최대 10MB)</p>
        </UploadText>
        <BrowseButton type="button">파일 선택</BrowseButton>
        <FileInput
          ref={fileInputRef}
          type="file"
          accept="image/*,.svg"
          multiple
          onChange={handleFileSelect}
        />
      </UploadArea>

      {files.length > 0 && (
        <PreviewBox files={files} onRemoveFile={removeFile} />
      )}
    </UploadCardBox>
  );
}

const UploadArea = styled.div`
  border: 3px dashed ${(props) => (props.$isDragging ? "#F5A282" : "#E5E8EB")};
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  background: ${(props) => (props.$isDragging ? "#FFF8F5" : "#F8FBFC")};
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #9ed1d9;
    background: #f0f9fa;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const UploadText = styled.div`
  h3 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p {
    color: #5a6c7d;
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.3rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

const BrowseButton = styled.button`
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #f5a282, #ffb89e);
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 700;
  font-family: "Outfit", sans-serif;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(245, 162, 130, 0.3);
  }
`;

const FileInput = styled.input`
  display: none;
`;
