import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function App({ to, color, text }) {
    return( <Linkdiv to={to} color={color}>{text}</Linkdiv> );
}

const Linkdiv = styled(Link)`
    color: ${(props) => (props.color || "white")};
`;