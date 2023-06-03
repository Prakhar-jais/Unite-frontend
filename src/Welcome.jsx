import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./Welcome.css"
import welcome from "./welcome.gif";
export default function Welcome() {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        (async () => {
            setUserName(
                await JSON.parse(
                    localStorage.getItem("App-User")
                ).username
            )
        })()

    }, []);
    return (
        <>
            <div className="well">
                <div className="imag">
                    <img background-color="black" width="100%"height= "100%"src={welcome}/>
                </div>
                <div className="par">
                    <h1 >
                       <center>Welcome, <span>{userName}!</span></center> 
                    </h1>
                    <h3><center>Please select a chat to Start messaging.</center></h3>
                </div>
            </div>

        </>

    );
}

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   flex-direction: column;
//   img {
//     height: 20rem;
//   }
//   span {
//     color: #4e0eff;
//   }
// `;