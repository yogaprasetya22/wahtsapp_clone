import { Avatar } from "@mui/material";
import { addDoc, collection, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { useAuth } from "../Auth";
import { db } from "../firebase";

const Friends = ({ photoURL, displayName, id }) => {
    const { currentUser } = useAuth();
    const [snapshot, loading, error] = useCollection(
        query(
            collection(db, "chats"),
            where("users", "array-contains", currentUser?.uid)
        )
    );
    const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const creteChat = (id) => {
        const chatAlreadiExist = (friend_id) =>
            !!snapshot?.docs.find(
                (chat) =>
                    chat.data().users.find((user) => user === friend_id)
                        ?.length > 0
            );
        if (!chatAlreadiExist(id)) {
            addDoc(collection(db, "chats"), {
                users: [currentUser.uid, id],
            });
        } else {
            console.log("chat already exist");
        }
    };

    return (
        <Container onClick={() => creteChat(id)}>
            <FrdAvatar src={photoURL} />
            <ChatContainer>
                <Name>{displayName}</Name>
            </ChatContainer>
        </Container>
    );
};

export default Friends;

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    min-height: 67px;
    padding-left: 15px;
    word-break: break-word;
    :hover {
        background-color: #eaeaea;
    }
`;
const Times = styled.div`
    font-size: 13px;
    font-family: "Teko, sans-serif";
    grid-area: time;
    width: 100%;
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
