import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import StyledButton from "../StyledButton";
import StyledInput from "../StyledInput";
import axios from "axios";

export default function App({ width, height, padding }) {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const onNameHandler = (e) => { setName(e.currentTarget.value) }
    const onIdHandler = (e) => { setId(e.currentTarget.value) }
    const onPasswordHandler = (e) => { setPassword(e.currentTarget.value) }

    const onKeyPress =(e)=>{ if(e.key==='Enter') onSubmit() }

    const onSubmit = () => {
        if (id.length > 0 && password.length > 0 && name.length > 0) {
            axios
            .post('/sign_up', {
                name: name,
                id: id,
                pw: password
            })
            .then((res) => {
                console.log(res.data)
                if (res.data === 'success') {
                    window.location.href = '/'
                }
                else if (res.data === 'fail') {
                    alert("다른 아이디를 입력해주세요!")
                }
            })
        }
        else {
            alert("입력 칸을 알맞게 입력해주십시오.");
        }
    }

    return (
        <StyledContianer width = {width} height = {height} padding = {padding}>
            <StyledInput width = "95%" placeholder = "Name" onChange = {onNameHandler}/>
            <StyledInput width = "95%" placeholder = "ID" onChange = {onIdHandler}/>
            <StyledInput width = "95%" placeholder = "Password" type = "password" onChange = {onPasswordHandler} onKeyPress = {onKeyPress}/>
            <StyledButton width = "100%" text = "Sign Up" onClick = {onSubmit}/>
            <Msg>Already have an account? <Link to = "/sign_in"><LinkMsg>Sign in</LinkMsg></Link></Msg>
        </StyledContianer>
    )
}

const StyledContianer = styled.div`
    display: grid;
    justify-items: center;
    gap: 7px;    

    background: white;
    border: solid 2px #ececee;
    border-radius: 15px;
    
    width: ${(props) => (props.width || "auto")};
    height: ${(props) => (props.height || "auto")};
    padding: ${(props) => (props.padding || "5%")};
`;

const LinkMsg = styled.div`
    font-weight: 700;
    color: #f5a282;
    text-decoration: none;
`;

const Msg = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 10px;

    font-size: 20px;
`;