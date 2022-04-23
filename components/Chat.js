import { Avatar } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import getFriendData from "../utils/getFriendData";

const Chat = ({ id, users, timestamp = "", latesMessage = "~" }) => {
    const [userId, setUserId] = React.useState({});
    const router = useRouter();
    const [friend, setFriend] = React.useState({});
    const enterChat = () => {
        router.push(`/chat/${id}`);
        setUserId({ id });
    };
    useEffect(() => {
        if (users?.length > 0) {
            getFriendData(users).then((data) => {
                setFriend(data);
            });
        }
    }, []);

    const waktu = (time) => {
        return time ? moment(time.toDate()).fromNow() : "";
    };
    return (
        <Container onClick={enterChat}>
            <FrdAvatar src={friend?.photoURL} />
            <ChatContainer>
                <Name>{friend?.displayName}</Name>
                {latesMessage && (
                    <Message>
                        <div style={{ fontSize: "12px", width: "150%" }}>
                            {latesMessage}
                        </div>
                    </Message>
                )}
                <Times>{waktu(timestamp)}</Times>
            </ChatContainer>
        </Container>
    );
};

export default Chat;

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    min-height: 67px;
    padding-left: 15px;
    word-break: break-word;
    :hover {
        background-color: #f5f5f5;
    }
`;
const Times = styled.div`
    font-size: 13px;
    font-family: "Teko, sans-serif";
    grid-area: time;
    width: 120%;
`;
const FrdAvatar = styled(Avatar)`
    marfin: 5px;
    margin-right: 10px;
`;

const ChatContainer = styled.div`
    display: grid;
    padding: 10px;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    border-bottom: 1px solid #e5e5e5;
    grid-template-areas:
        "name name time"
        "latesMessage latesMessage .";
`;

const Message = styled.div`
    grid-area: latesMessage;
    width: 8rem;
`;

const Name = styled.div`
    grid-area: name;
    font-size: 15px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.87);
    margin-top: 5px;
`;
