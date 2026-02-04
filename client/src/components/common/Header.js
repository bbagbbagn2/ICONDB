import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import ImageContainer from "../ImageContainer";
import LogoIcon from "./LogoIcon";

export default function Header() {
  const [sign, setSign] = useState(null);
  const [profileData, setProfileData] = useState({
    profileName: "Anonymous.png",
    nickName: "Anonymous",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.post("/get_auth").then((res) => {
      let data = res.data;
      setSign(data);
      axios
        .post("/get_profile", {
          user: data,
        })
        .then((res) => {
          setProfileData(res.data[0]);
        });
    });
  }, []);

  //Logout
  const signOut = async () => {
    try {
      const res = await axios.post("/sign_out");
      if (res.data === "success") {
        setSign(null);
        navigate("/");
      }
    } catch (error) {
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  //Editor Open
  const openEditor = () => {
    window.open(process.env.REACT_APP_URL + ":8000/src/editor/");
  };

  return (
    <HeaderContainer sign={sign}>
      <Nav>
        <LogoIcon />
        <NavMenu>
          <li>
            <NavLink to="/posting">업로드</NavLink>
          </li>
          <li>
            <NavLink onClick={openEditor} to="#">
              수정하기
            </NavLink>
          </li>
          {sign !== null && (
            <Link to={"/profile/" + sign}>
              <ImageContainer
                src={
                  "https://webservicegraduationproject.s3.amazonaws.com/userprofile/" +
                  profileData.profileName
                }
                alt="프로필 이미지"
                width="45px"
                height="45px"
                borderRadius="50%"
              />
            </Link>
          )}
          <li>
            {sign === null ? (
              <Link to="/sign_up">
                <Button>로그인</Button>
              </Link>
            ) : (
              <Button onClick={signOut}>로그아웃</Button>
            )}
          </li>
        </NavMenu>
      </Nav>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: sticky;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  top: 0;
  z-index: 999;
  background: #ffffff;
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

  @media (max-width: 968px) {
    display: ${(props) => (props.$isOpen ? "flex" : "none")};
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: white;
    padding: 2rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #5a6c7d;
  font-weight: 500;
  transition: color 0.3s;
  cursor: pointer;

  &:hover {
    color: #9ed1d9;
  }
`;

const Button = styled.button`
  background: ${(props) => (props.$secondary ? "white" : "#F5A282")};
  color: ${(props) => (props.$secondary ? "#9ED1D9" : "white")};
  padding: 0.7rem 1.8rem;
  border-radius: 25px;
  border: ${(props) => (props.$secondary ? "2px solid #9ED1D9" : "none")};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  font-size: 1rem;
  font-family: "Outfit", sans-serif;

  &:hover {
    background: ${(props) => (props.$secondary ? "#9ED1D9" : "#F38A62")};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px
      ${(props) =>
        props.$secondary
          ? "rgba(158, 209, 217, 0.3)"
          : "rgba(245, 162, 130, 0.3)"};
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
`;
