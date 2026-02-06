import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import UploadCardBox from "./UploadCard";

export default function FormBox() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
  });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const { title } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags((prev) => [...prev, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) return alert("제목을 입력해주세요");

    const uploadData = new FormData();
    uploadData.append("title", formData.title);

    try {
      const res = await axios.post("/insert_content", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data === 200) {
        alert("업로드 완료");
        navigate("/");
      } else {
        alert("업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("업로드 중 오류가 발생했습니다.");
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
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>태그</Label>
          <TagsInput>
            {tags.map((tag) => (
              <TagItem key={tag}>
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  x
                </button>
              </TagItem>
            ))}
            <TagInputField
              type="text"
              placeholder="태그 입력 후 Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
          </TagsInput>
        </FormGroup>
        <ActionButtons>
          <Button type="submit">업로드</Button>
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
  border: 2px solid #e5e8eb;
  border-radius: 15px;
  font-size: 1rem;
  font-family: "Outfit", sans-serif;
  transition: all 0.3s;
  background: #f8fbfc;

  &:focus {
    outline: none;
    border-color: #9ed1d9;
    background: white;
  }
`;

const TagsInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.8rem;
  border: 2px solid #e5e8eb;
  border-radius: 15px;
  background: #f8fbfc;
  min-height: 50px;
  align-items: center;

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
  font-family: "Outfit", sans-serif;
  font-size: 1rem;
  min-width: 150px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #a0aec0;
  }
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

const Button = styled.button`
  padding: 1rem 2.5rem;
  border-radius: 20px;
  font-weight: 700;
  font-family: "Outfit", sans-serif;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
  border: none;
  background: linear-gradient(135deg, #9ed1d9, #7bc4ce);
  color: white;
  box-shadow: 0 5px 15px rgba(158, 209, 217, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(158, 209, 217, 0.4);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
