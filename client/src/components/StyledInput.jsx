import React from "react";
import styled from "styled-components";

export default function App({ width, height, placeholder, type, fontSize, onChange, onKeyPress}) {
    return (
        <StyledInput 
            width = {width} 
            height = {height} 
            placeholder = {placeholder} 
            fontSize = {fontSize} 
            onChange = {onChange}
            onKeyPress = {onKeyPress}
            type = {type}>
        </StyledInput>
    );
}

const StyledInput = styled.input`
    padding-left: 10px;

    background: white;
    border: solid 2px #9ed1d9;
    border-radius: 5px;
    

    width: ${(props) => props.width || "auto"};
    height: ${(props) => props.height || "auto"};
    font-size: ${(props) => props.fontSize || "20px"};
    type: ${(props) => props.type ? props.type : "text"};
    &:focus {
        border-color: #f5a382;
        outline: none;
    }
`;