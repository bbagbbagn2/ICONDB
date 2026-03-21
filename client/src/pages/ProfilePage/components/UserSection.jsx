import React from "react";
import {
  ContentBox,
  SectionTitle,
  UserGrid,
  UserLink,
  UserImage,
  UserName,
  EmptyMessage,
} from "../ProfilePage.styles";
import { IMAGE_URLS } from "../ProfilePage.constants";

export const UserSection = ({ title, users, emptyMessage }) => {
  return (
    <ContentBox>
      <SectionTitle>
        {title} ({Array.isArray(users) ? users.length : 0})
      </SectionTitle>
      <UserGrid>
        {Array.isArray(users) &&
          users.map((user, idx) => (
            <UserLink key={idx} to={`/profile/${user.id}`}>
              <UserImage
                src={IMAGE_URLS.getUserProfile(user.profilename)}
                alt={user.nickname}
              />
              <UserName>{user.nickname}</UserName>
            </UserLink>
          ))}
        {(!Array.isArray(users) || users.length === 0) && (
          <EmptyMessage>{emptyMessage}</EmptyMessage>
        )}
      </UserGrid>
    </ContentBox>
  );
};
