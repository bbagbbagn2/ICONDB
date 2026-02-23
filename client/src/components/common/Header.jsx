import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import ImageContainer from "../ImageContainer";
import LogoIcon from "./LogoIcon";
import {
  useUser,
  useProfile,
  useIsAuthenticated,
  useAuthStore,
} from "../../stores/authStore";
import { useNotification } from "./NotificationContext";

/**
 * Header Component
 * 네비게이션, 로그인/로그아웃, 사용자 프로필 표시
 *
 * Zustand 기반 전역 상태 사용
 */
export default function Header() {
  const user = useUser();
  const profile = useProfile();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { toastSuccess } = useNotification();

  // 로그아웃
  const handleLogout = async () => {
    try {
      await logout();
      toastSuccess("로그아웃", "로그아웃되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  // 에디터 열기
  const openEditor = () => {
    window.open(`${process.env.REACT_APP_URL}:8000/src/editor/`);
  };

  // 프로필 이미지 URL 생성
  const profileImageUrl =
    profile?.name && profile.name !== "Anonymous.png"
      ? `https://webservicegraduationproject.s3.amazonaws.com/userprofile/${profile.name}`
      : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e0e0e0'/%3E%3C/svg%3E";

  return (
    <HeaderContainer>
      <Nav>
        <LogoIcon />
        <NavMenu>
          <NavItem>
            <NavLink to="/upload">업로드</NavLink>
          </NavItem>
          <NavItem>
            <NavLink as="button" onClick={openEditor}>
              에디터
            </NavLink>
          </NavItem>
          {isAuthenticated && user && (
            <NavItem>
              <Link to={`/profile/${user}`}>
                <ImageContainer
                  src={profileImageUrl}
                  alt="프로필 이미지"
                  width="45px"
                  height="45px"
                  borderRadius="50%"
                />
              </Link>
            </NavItem>
          )}
          <NavItem>
            {!isAuthenticated ? (
              <Link to="/login">
                <StyledButton>로그인</StyledButton>
              </Link>
            ) : (
              <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
            )}
          </NavItem>
        </NavMenu>
      </Nav>
    </HeaderContainer>
  );
}

// Styled Components
const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 999;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #5a6c7d;
  font-weight: 500;
  transition: color 0.3s;
  padding: 0.5rem 0;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1rem;
  font-family: inherit;

  &:hover {
    color: #9ed1d9;
  }
`;

const StyledButton = styled.button`
  background: #f5a282;
  color: white;
  padding: 0.7rem 1.8rem;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  font-size: 1rem;
  font-family: inherit;

  &:hover {
    background: #f38a62;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(245, 162, 130, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
`;
