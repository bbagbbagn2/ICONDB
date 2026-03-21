import React from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "../../components/OptimizedImage";
import {
  ContentBox,
  SectionTitle,
  IconGrid,
  IconLink,
  EmptyMessage,
} from "../ProfilePage.styles";
import {
  IMAGE_URLS,
  IMAGE_DIMENSIONS,
  EMPTY_STATE_MESSAGES,
} from "../ProfilePage.constants";

export const IconSection = ({ title, items, emptyMessage }) => {
  return (
    <ContentBox>
      <SectionTitle>
        {title} ({Array.isArray(items) ? items.length : 0})
      </SectionTitle>
      <IconGrid>
        {Array.isArray(items) &&
          items.map((item, idx) => (
            <IconLink key={idx} to={`/post/${item.content_id}`}>
              <OptimizedImage
                src={IMAGE_URLS.getIcon(item.filename)}
                alt={`아이콘 ${idx}`}
                width={IMAGE_DIMENSIONS.ICON.WIDTH}
                height={IMAGE_DIMENSIONS.ICON.HEIGHT}
                blur={true}
              />
            </IconLink>
          ))}
        {(!Array.isArray(items) || items.length === 0) && (
          <EmptyMessage>{emptyMessage}</EmptyMessage>
        )}
      </IconGrid>
    </ContentBox>
  );
};
