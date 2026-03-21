import React from "react";
import Loading from "../../components/Loading";
import { ContentSection, LoadingContainer } from "../ProfilePage.styles";
import { IconSection } from "./IconSection";
import { UserSection } from "./UserSection";
import { EMPTY_STATE_MESSAGES } from "../ProfilePage.constants";

export const ProfileContent = ({
  isLoading,
  profileContent,
  profileLiked,
  profileFollowing,
  profileFollowers,
}) => {
  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <ContentSection>
      <IconSection
        title="내 아이콘"
        items={profileContent}
        emptyMessage={EMPTY_STATE_MESSAGES.NO_ICONS}
      />
      <IconSection
        title="좋아요"
        items={profileLiked}
        emptyMessage={EMPTY_STATE_MESSAGES.NO_LIKES}
      />
      <UserSection
        title="팔로잉"
        users={profileFollowing}
        emptyMessage={EMPTY_STATE_MESSAGES.NO_FOLLOWING}
      />
      <UserSection
        title="팔로워"
        users={profileFollowers}
        emptyMessage={EMPTY_STATE_MESSAGES.NO_FOLLOWERS}
      />
    </ContentSection>
  );
};
