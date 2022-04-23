import { Button } from "@mui/material";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const login = () => {
    const signIn = () => {
        signInWithPopup(auth, provider);
    };

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <LogoContainer>
                    <Logo src="data:image/jpeg;base64,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" />
                </LogoContainer>
                <br />
                <Button
                    onClick={signIn}
                    variant="outlined"
                    style={{
                        color: "black",
                        borderColor: "black",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <GoogleIcon style={{ paddingRight: "4px" }} />
                    Signin google
                </Button>
            </LoginContainer>
        </Container>
    );
};

export default login;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const LogoContainer = styled.div`
    width: 100%;
    background-color: #eaeaea;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 5px;
    box-shadow: -3px -4px 16px 2px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: -3px -4px 16px 2px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -3px -4px 16px 2px rgba(0, 0, 0, 0.75);
`;

const Logo = styled.img`
    width: 80%;
    height: 100%;
    border-radius: 100%;
`;
