import React, { useEffect, useState} from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";

export default function App() {
     const [scrollPosition, setScrollPosition] = useState(0);
     const updateScroll = () => { setScrollPosition(window.scrollY || document.documentElement.scrollTop); }

     const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

     useEffect(() => {
         window.addEventListener('scroll', updateScroll);
     });
            
     return( scrollPosition > 500 && <TopButton onClick={scrollTop}><FaArrowUp size="26" color="white" /></TopButton> );
}

const TopButton = styled.button`
    position: fixed;    
    bottom: 1.5rem;
    right: 1.5rem;
    padding: 0.5rem;

    display: flex;

    background: #9ed1d9;
    border: 1.5px solid white;
    border-radius: 50%;    
    font-size: 2rem;
    box-shadow: -1px 0 4px rgba(14, 55, 63, 0.15);
        
    cursor: pointer;
`;