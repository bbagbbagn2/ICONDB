import styled from "styled-components";

import ProfileAvatarBox from "./ProfileAvatarBox";

export default function ProfileHeader() {
  return (
    <ProfileHeaderBox>
      <ProfileContentBox>
        <ProfileAvatarBox />
      </ProfileContentBox>
    </ProfileHeaderBox>
  );
}
const ProfileHeaderBox = styled.section`
  padding: 4rem 2rem 3rem;
  transition: background 0.3s;
  background: linear-gradient(135deg, #9ed1d9, #b8e0e6);
`;

const ProfileContentBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;
