import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
    Search,
    MoreVert,
    InsertEmoticon,
    AttachFile,
    Send,
} from "@mui/icons-material";
import Message from "./Message";
import { useAuth } from "../Auth";
import {
    addDoc,
    collection,
    serverTimestamp,
    setDoc,
    doc,
    query,
    orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import moment from "moment";

const ChatContent = ({ friend, id }) => {
    const [waktuAktivitas, setWaktuAktivitas] = React.useState("");
    const messageEndRef = useRef(null);
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const [input, setInput] = React.useState("");
    const { currentUser } = useAuth();

    const [snapshot, loading, error] = useCollection(
        query(
            collection(db, "chats", id, "messages"),
            orderBy("timestamp", "asc")
        )
    );
    const messages = snapshot?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    const sendMessage = async (e) => {
        e.preventDefault();
        const usersRef = doc(db, "users", currentUser.uid);
        setDoc(usersRef, { lastSeen: serverTimestamp() }, { merge: true });

        const messageRef = collection(db, "chats", id, "messages");
        if (input) {
            await addDoc(messageRef, {
                timestamp: serverTimestamp(),
                message: input,
                user: currentUser.email,
                photoURL: currentUser.photoURL,
            });
        } else {
            console.log("no input");
        }

        const chatRef = doc(db, "chats", id);
        setDoc(
            chatRef,
            { lastMessage: input, timestamp: serverTimestamp() },
            { merge: true }
        );
        setInput("");
    };

    useEffect(() => {
        const coba = (time) => {
            const waktu = moment(time?.lastSeen.toDate())
                .fromNow()
                .split(" ")[0];
            const menit = moment(time?.lastSeen.toDate())
                .fromNow()
                .split(" ")[1];
            if (menit === "minutes" || menit === "minute") {
                setWaktuAktivitas("Aktif : " + waktu + " menit yang lalu");
            } else if (menit === "hours" || menit === "hour") {
                setWaktuAktivitas("Aktif: " + waktu + " jam yang lalu");
            }
        };
        coba(friend);
    }, [friend?.lastSeen]);
    return (
        <Container>
            <Header>
                <Avatar src={friend?.photoURL} />
                <HeaderInfo>
                    <h3>{friend?.displayName}</h3>
                    <div>{waktuAktivitas}</div>
                </HeaderInfo>
                <IconButton>
                    <Search />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </Header>
            <MessageContainer>
                {messages?.map((message) => (
                    <div
                        key={message.id}
                        style={{ marginBottom: 20 }}
                        ref={messageEndRef}
                    >
                        <Message
                            user={message.user}
                            timestamp={message.timestamp}
                            message={message.message}
                            photoURL={message.photoURL}
                        />
                    </div>
                ))}
            </MessageContainer>
            <InputContainer>
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <Input
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    value={input}
                />
                <button
                    hidden
                    disabled={!input}
                    type="sumbit"
                    onClick={sendMessage}
                >
                    send
                </button>
                <Buttons onClick={sendMessage}>
                    <Send />
                </Buttons>
            </InputContainer>
        </Container>
    );
};

export default ChatContent;
const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
`;

const Header = styled.div`
    border-left: 1px solid #eaeaea;
    border-top-right-radius: 10px;
    display: flex;
    position: sticky;
    top: 0;
    background-color: #f5f5f5;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
`;

const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    flex: 1;
    > h3 {
        margin-bottom: 3px;
    }
    > div {
        font-size: 12px;
        color: #8e8e8e;
        margin-bottom: 5px;
    }
`;

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 5px;
    position: sticky;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 100;
    padding-bottom: 20px;
    border-bottom-right-radius: 10px;
`;

const Input = styled.input`
    border: none;
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;

    padding: 8px;
    border-radius: 8px;
    background-color: #f9f9f9;
    border-top: 1px solid #ededed;
    :focus {
        border: none;
        outline: none;
        border-bottom: 2px solid #eaeaea;
    }
`;

const MessageContainer = styled.div`
    padding: 20px;
    overflow-x: hidden;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background-color: #f5f5f5;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #63b4df;
        border-radius: 10px;
    }
    background-color: #e5ded7;
    flex: 1;
`;
const Buttons = styled.button`
    border: none;
    background-color: #f5f5f5;
    :focus {
        outline: none;
    }
    :hover {
        background-color: #eaeaea;
    }
`;
