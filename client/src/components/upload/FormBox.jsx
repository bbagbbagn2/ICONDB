import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import UploadCardBox from "./UploadCard";
import { useApi } from "../../hooks/useApi";
import { useNotification } from "../common/NotificationContext";

/**
 * FormBox - 파일 업로드 폼
 * 제목, 태그 입력 및 업로드 기능
 */
export default function FormBox() {
  const navigate = useNavigate();
  const { request, loading } = useApi();
  const { toastSuccess, toastWarning, toastError } = useNotification();

  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});

  // 입력값 유효성 검사
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title || !formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요.";
    } else if (formData.title.length > 100) {
      newErrors.title = "제목은 100자를 초과할 수 없습니다.";
    }

    if (formData.message && formData.message.length > 500) {
      newErrors.message = "설명은 500자를 초과할 수 없습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 입력 시 해당 필드의 에러 제거
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (!tagInput.trim()) {
      toastWarning("입력 오류", "태그를 입력해주세요.");
      return;
    }

    const normalizedTag = tagInput.trim().toLowerCase();
    if (tags.length >= 10) {
      toastWarning("태그 제한", "최대 10개까지만 추가할 수 있습니다.");
      return;
    }

    if (tags.includes(normalizedTag)) {
      toastWarning("중복 태그", "이미 추가된 태그입니다.");
      return;
    }

    setTags((prev) => [...prev, normalizedTag]);
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("message", formData.message);
    uploadData.append("tags", JSON.stringify(tags));

    const result = await request(
      () =>
        axios.post("/insert_content", uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
      "UPLOAD",
    );

    if (result === 200 || result?.status === 200) {
      toastSuccess("성공", "아이콘이 업로드되었습니다.");
      navigate("/");
    }
  };

  return (
    <UploadCardBox>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">제목 *</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="아이콘의 제목을 입력하세요"
            maxLength={100}
            error={!!errors.title}
          />
          {errors.title && <ErrorText>{errors.title}</ErrorText>}
          <CharCount>{formData.title.length}/100</CharCount>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">설명</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="아이콘에 대한 설명을 입력하세요 (선택사항)"
            maxLength={500}
            rows={4}
            error={!!errors.message}
          />
          {errors.message && <ErrorText>{errors.message}</ErrorText>}
          <CharCount>{formData.message.length}/500</CharCount>
        </FormGroup>

        <FormGroup>
          <Label>태그</Label>
          <TagsInputContainer>
            <TagsInput>
              {tags.map((tag) => (
                <TagItem key={tag}>
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    ×
                  </button>
                </TagItem>
              ))}
              <TagInputField
                type="text"
                placeholder="태그 입력 후 Enter (최대 10개)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                disabled={tags.length >= 10}
              />
            </TagsInput>
            <TagButton
              type="button"
              onClick={addTag}
              disabled={!tagInput.trim() || tags.length >= 10}
            >
              추가
            </TagButton>
          </TagsInputContainer>
          <TagCount>{tags.length}/10</TagCount>
        </FormGroup>

        <ActionButtons>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "업로드 중..." : "업로드"}
          </SubmitButton>
        </ActionButtons>
      </Form>
    </UploadCardBox>
  );
}

const Form = styled.form`
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.8rem;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.3rem;
  border: 2px solid ${(props) => (props.error ? "#e74c3c" : "#e5e8eb")};
  border-radius: 15px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;
  background: #f8fbfc;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? "#e74c3c" : "#9ed1d9")};
    background: white;
  }

  &:disabled {
    background: #f0f0f0;
    cursor: not-allowed;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem 1.3rem;
  border: 2px solid ${(props) => (props.error ? "#e74c3c" : "#e5e8eb")};
  border-radius: 15px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;
  background: #f8fbfc;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? "#e74c3c" : "#9ed1d9")};
    background: white;
  }

  &:disabled {
    background: #f0f0f0;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  color: #e74c3c;
  font-size: 0.85rem;
  display: block;
  margin-top: 0.4rem;
`;

const CharCount = styled.span`
  display: block;
  text-align: right;
  color: #95a5a6;
  font-size: 0.85rem;
  margin-top: 0.4rem;
`;

const TagsInputContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const TagsInput = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.8rem;
  border: 2px solid #e5e8eb;
  border-radius: 15px;
  background: #f8fbfc;
  min-height: 50px;
  align-content: flex-start;

  &:focus-within {
    border-color: #9ed1d9;
    background: white;
  }
`;

const TagItem = styled.span`
  background: linear-gradient(135deg, #9ed1d9, #b8e0e6);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    display: flex;
    align-items: center;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const TagInputField = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  min-width: 150px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #a0aec0;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const TagButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #f5a282;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background: #f38a62;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

const TagCount = styled.span`
  display: block;
  text-align: right;
  color: #95a5a6;
  font-size: 0.85rem;
  margin-top: 0.4rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2.5rem;
  border-radius: 20px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
  border: none;
  background: linear-gradient(135deg, #9ed1d9, #7bc4ce);
  color: white;
  box-shadow: 0 5px 15px rgba(158, 209, 217, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(158, 209, 217, 0.4);
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
