import React from "react";
import styled from "styled-components";
import PostingWrapper from "./PostingWrapper";

export default function App() {
    return (
        <PostingContainer>
            <PostingMessage>Post Your Icon</PostingMessage>
            <PostingWrapper/>
        </PostingContainer>
    );
}

const PostingContainer = styled.div`
    display: grid;
    place-items: center;
    place-content: center;
`;
const PostingMessage = styled.h1`
    display: grid;
    place-items: center;
    
    color: gray;
`;