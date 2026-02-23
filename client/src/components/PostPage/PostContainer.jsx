import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import StyledButton from "../../components/StyledButton";
import StyledInput from "../../components/StyledInput";
import Linkdiv from "../Linkdiv";
import { ThemeProvider, Button, CircularProgress } from "@material-ui/core";
import { theme } from "../theme";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useApi } from "../../hooks/useApi";
import { useNotification } from "../common/NotificationContext";

/**
 * PostContainer - 포스트 상세 페이지 컴포넌트
 * 아이콘 상세 정보, 좋아요, 태그, 수정/삭제 기능
 */
export default function PostContainer() {
  const { url_id } = useParams();
  const navigate = useNavigate();
  const { request, loading } = useApi();
  const { toastSuccess, toastError, toastWarning } = useNotification();

  // 인증 및 기본 데이터
  const [currentUser, setCurrentUser] = useState(null);
  const [data, setData] = useState({
    filename: "NoImage.png",
    message: "",
    user_id: "",
  });
  const [isMobile, setIsMobile] = useState(false);

  // 좋아요 상태
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  // 태그 관리
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // 수정 모드
  const [editMessage, setEditMessage] = useState("");

  // 초기 로드
  useEffect(() => {
    const loadInitialData = async () => {
      const user = await request(() => axios.post("/get_auth"), "AUTH", false);
      setCurrentUser(user);
    };
    loadInitialData();
  }, []);

  // 포스트 데이터 로드
  useEffect(() => {
    if (!url_id) return;
    loadPostData();
  }, [url_id]);

  // 반응형 디자인
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 좋아요 상태 확인
  useEffect(() => {
    if (!currentUser || !url_id) return;
    checkLikeStatus();
  }, [currentUser, url_id]);

  const loadPostData = async () => {
    const postData = await request(
      () => axios.post("/get_content", { content_id: url_id }),
      "LOAD_POST",
      false,
    );
    if (postData && postData[0]) {
      setData(postData[0]);
      setLikes(postData[0].like || 0);
      setEditMessage(postData[0].message || "");
    }

    const tagsData = await request(
      () => axios.post("/get_tags", { content_id: url_id }),
      "LOAD_TAGS",
      false,
    );
    setTags(tagsData || []);
  };

  const checkLikeStatus = async () => {
    const result = await request(
      () => axios.post("/check_liked", { content_id: url_id }),
      "CHECK_LIKE",
      false,
    );
    setLiked(result === "liked");
  };

  // 좋아요 토글
  const handleToggleLike = async () => {
    if (!currentUser) {
      toastWarning("로그인 필요", "로그인 후 좋아요할 수 있습니다.");
      navigate("/login");
      return;
    }

    const result = await request(
      () => axios.post("/setLike", { content_id: url_id }),
      "LIKE",
    );
    if (result !== null) {
      setLiked(!liked);
      loadPostData(); // 좋아요 수 업데이트
    }
  };

  // 태그 추가
  const handleAddTag = async () => {
    if (!currentUser) {
      toastWarning("로그인 필요", "로그인 후 태그를 추가할 수 있습니다.");
      navigate("/login");
      return;
    }

    if (tagInput.trim().length < 2) {
      toastWarning("입력 오류", "태그는 2글자 이상이어야 합니다.");
      return;
    }

    const result = await request(
      () =>
        axios.post("/tag_insert", {
          content_id: url_id,
          tag_context: tagInput,
        }),
      "ADD_TAG",
    );
    if (result !== null) {
      setTagInput("");
      loadPostData();
    }
  };

  // 포스트 수정
  const handleUpdatePost = async () => {
    if (!editMessage.trim()) {
      toastWarning("입력 오류", "수정할 내용을 입력해주세요.");
      return;
    }

    const result = await request(
      () =>
        axios.post("/content_update", {
          content_id: url_id,
          content_message: editMessage,
          image: null,
        }),
      "UPDATE_POST",
    );
    if (result !== null) {
      toastSuccess("성공", "포스트가 수정되었습니다.");
      loadPostData();
    }
  };

  // 포스트 삭제
  const handleDeletePost = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    const result = await request(
      () => axios.post("/content_delete", { content_id: url_id }),
      "DELETE_POST",
    );
    if (result !== null) {
      toastSuccess("성공", "포스트가 삭제되었습니다.");
      navigate("/");
    }
  };

  // 다운로드
  const handleDownload = () => {
    window.open(
      `${process.env.REACT_APP_URL_s}:5000/download/${data.filename}`,
    );
  };

  // 에디터 열기 (SVG만 가능)
  const handleOpenEditor = () => {
    const filename = data.filename.split(".")[0];
    window.open(`${process.env.REACT_APP_URL}:8000/src/editor/${filename}`);
  };

  const isOwnPost = currentUser === data.user_id;
  const isSvgFile = data.filename.split(".")[1] === "svg";

  return (
    <PostContainerStyled columns={isMobile ? "1fr" : "1fr 300px"}>
      <ImageDetailSection>
        {data.filename && (
          <PostImage
            src={`https://webservicegraduationproject.s3.amazonaws.com/img/${data.filename}`}
            alt={data.filename}
          />
        )}
      </ImageDetailSection>

      <InfoSection>
        {loading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <>
            <PostInfo>
              <InfoRow>
                <Label>작성자:</Label>
                <Linkdiv
                  to={`/profile/${data.user_id}`}
                  color="#9ed1d9"
                  text={data.user_id}
                />
              </InfoRow>
              <InfoRow>
                <Label>설명:</Label>
                <span>{data.message}</span>
              </InfoRow>
              <InfoRow>
                <Label>작성일:</Label>
                <span>{data.date}</span>
              </InfoRow>
              <InfoRow>
                <Label>좋아요:</Label>
                <span>{likes}</span>
              </InfoRow>

              <ActionButtons>
                <ThemeProvider theme={theme}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color={liked ? "primary" : "secondary"}
                    startIcon={
                      liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />
                    }
                    onClick={handleToggleLike}
                    disabled={loading}
                  >
                    {liked ? "좋아요 취소" : "좋아요"}
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownload}
                  >
                    다운로드
                  </Button>
                  {isSvgFile && (
                    <Button
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      startIcon={<EditIcon />}
                      onClick={handleOpenEditor}
                    >
                      에디터
                    </Button>
                  )}
                </ThemeProvider>
              </ActionButtons>

              <TagSection>
                <SectionTitle>태그</SectionTitle>
                <TagContainer>
                  {tags.length > 0 ? (
                    tags.map((tag, idx) => (
                      <Tag key={idx}>
                        <Linkdiv
                          to={`/searching/tag/${tag.Hashtag}`}
                          text={tag.Hashtag}
                          color="white"
                        />
                      </Tag>
                    ))
                  ) : (
                    <EmptyText>태그가 없습니다.</EmptyText>
                  )}
                </TagContainer>
                {currentUser && (
                  <TagInputRow>
                    <StyledInput
                      placeholder="새 태그 추가"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    />
                    <StyledButton
                      text="추가"
                      onClick={handleAddTag}
                      disabled={loading}
                    />
                  </TagInputRow>
                )}
              </TagSection>
            </PostInfo>

            {isOwnPost && (
              <EditSection>
                <SectionTitle>포스트 수정/삭제</SectionTitle>
                <StyledInput
                  placeholder="새로운 설명"
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                />
                <ButtonRow>
                  <StyledButton
                    text="수정"
                    onClick={handleUpdatePost}
                    disabled={loading}
                  />
                  <StyledButton
                    text="삭제"
                    onClick={handleDeletePost}
                    disabled={loading}
                  />
                </ButtonRow>
              </EditSection>
            )}
          </>
        )}
      </InfoSection>
    </PostContainerStyled>
  );
}

// Styled Components
const PostContainerStyled = styled.div`
  padding-top: 60px;
  display: grid;
  grid-template-columns: ${(props) => props.columns || "1fr"};
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 2rem 2rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 70px 1rem 1rem;
  }
`;

const ImageDetailSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 2rem;

  @media (max-width: 768px) {
    min-height: 300px;
    padding: 1rem;
  }
`;

const PostImage = styled.img`
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 8px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PostInfo = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const InfoRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: #2c3e50;
  min-width: 80px;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 1.5rem 0;
`;

const TagSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 2px solid #9ed1d9;
`;

const SectionTitle = styled.h4`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  min-height: 30px;
  align-content: flex-start;
`;

const Tag = styled.div`
  background-color: #f5a282;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 16px;
  font-size: 0.85rem;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const EmptyText = styled.span`
  color: #95a5a6;
  font-style: italic;
  font-size: 0.9rem;
`;

const TagInputRow = styled.div`
  display: flex;
  gap: 0.5rem;

  > button {
    min-width: 60px;
  }
`;

const EditSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 1rem;

  > * {
    flex: 1;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;
