import React from "react";
import styled from "styled-components";

export default function App({ fontSize, onClick, text}) {
    return ( <LinkButton fontSize={fontSize} onClick={onClick}>{text}</LinkButton> );
}

const LinkButton = styled.button`
    width: 100%;

    background-color: #9ed1d9;
    color: #ececec;
    border:none;
    
    transition-duration: 0.3s;
    cursor: pointer;

    font-size: ${(props) => (props.fontSize || "18px")};
    &:hover{
        color: white;
    }
    &:active{
        color: #f5a282;
    }
`;
