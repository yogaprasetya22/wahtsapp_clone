import { Avatar } from "@mui/material";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { useAuth } from ".././Auth";
const Message = ({ user, message, timestamp, photoURL }) => {
    const { currentUser } = useAuth();
    const MessageType = user === currentUser?.email ? MyMessage : FrdMessage;

    const waktu = (time) => {
        return time ? moment(time.toDate().getTime()).format("LT") : "";
    };
    return (
        <Container>
            {user !== currentUser?.email && (
                <MessageTail>
                    <Avatar
                        src={photoURL}
                        style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "10px",
                        }}
                    />
                </MessageTail>
            )}
            <MessageType>
                <MessageBubble>{message}</MessageBubble>
                <TimeStamp>{waktu(timestamp)}</TimeStamp>
            </MessageType>
        </Container>
    );
};

export default Message;

const Container = styled.div`
    display: flex;
    height: 100%;
`;

const MessageBubble = styled.div`
    padding: 5px;
    padding-bottom: 8px;
    text-align: right;
    margin-bottom: 2px;
    position: relative;
`;

const MyMessage = styled(MessageBubble)`
    padding-right: 15px;
    margin-left: auto;
    background-color: #dcf8c6;
    border-radius: 8px 0px 8px 8px;
`;

const FrdMessage = styled(MessageBubble)`
    padding-left: 15px;
    text-align: right;
    background-color: #f5f5f5;
    border-radius: 0px 8px 8px 8px;
`;

const MessageTail = styled.span`
    margin-top: -4px;
`;

const TimeStamp = styled.span`
    margin-top: 15px;
    font-size: 8px;
    color: #8e8e8e;
    position: absolute;
    right: 5px;
    bottom: 5px;
`;
