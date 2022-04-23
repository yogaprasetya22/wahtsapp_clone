import { Avatar, IconButton } from "@mui/material";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import ChatIcon from "@mui/icons-material/Chat";
import React, { useEffect, useRef } from "react";
import Friend from "./Friend";
import Chat from "./Chat";
import styled from "styled-components";
import SidebarCustom from "./SidebarCustom";
import { Search, NotificationsOff, ArrowForwardIos } from "@mui/icons-material";
import { db } from "../firebase";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuth } from "../Auth";
const Sidebar = () => {
    const { currentUser } = useAuth();
    const inputAreaRef = useRef(null);
    const [serchFrineds, setSearchFriends] = React.useState(true);
    const [snapshot, loading, error] = useCollection(
        query(collection(db, "users"), where("email", "!=", currentUser?.email))
    );
    const friends = snapshot?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    const [snapshots, loadings, errors] = useCollection(
        query(
            collection(db, "chats"),
            where("users", "array-contains", currentUser?.uid)
        )
    );
    const chatUnsub = snapshots?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    useEffect(() => {
        const checkIfClick = (e) => {
            if (!inputAreaRef.current.contains(e.target)) {
                setTimeout(() => {
                    setSearchFriends(true);
                }, 3000);
            } else {
                setSearchFriends(false);
            }
        };
        document.addEventListener("mousedown", checkIfClick);
        return () => {
            document.removeEventListener("mousedown", checkIfClick);
        };
    }, []);
    return (
        <Container>
            <Header>
                <UserAvatar src={currentUser.photoURL} />
                <Name>{currentUser.displayName}</Name>
                <IconsGruop>
                    <IconButton>
                        <CloudSyncIcon style={{ maxWidth: "22px" }} />
                    </IconButton>
                    <IconButton>
                        <ChatIcon style={{ maxWidth: "22px" }} />
                    </IconButton>
                    <SidebarCustom />
                </IconsGruop>
            </Header>
            {/* <Notif /> */}
            <SearchChat>
                <SearchBar>
                    <Search />
                    <SearchInput
                        ref={inputAreaRef}
                        placeholder="Search or start new chat"
                    />
                </SearchBar>
            </SearchChat>
            <ChatContainer notif={"true"}>
                <UserChat>
                    {serchFrineds ? (
                        <>
                            {chatUnsub?.map((chat) => (
                                <div key={chat.id}>
                                    <Chat
                                        id={chat.id}
                                        latesMessage={chat.lastMessage}
                                        users={chat.users}
                                        timestamp={chat.timestamp}
                                    />
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {friends?.map((chat) => (
                                <Friend
                                    key={chat.id}
                                    id={chat.id}
                                    photoURL={chat.photoURL}
                                    displayName={chat.displayName}
                                    email={chat.email}
                                />
                            ))}
                        </>
                    )}
                </UserChat>
            </ChatContainer>
        </Container>
    );
};

export default Sidebar;

const Notif = () => {
    return (
        <Notification>
            <NotificationAvatar>
                <NotificationsOff style={{ color: "#63b4df" }} />
            </NotificationAvatar>
            <NotificationText>
                <div>You have new notifications</div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <a style={{ borderBottom: "1px solid #000" }}>
                        Turn on desktop notifications
                    </a>
                    <IconButton>
                        <ArrowForwardIos
                            style={{ maxWidth: "12px", height: "10px" }}
                        />
                    </IconButton>
                </div>
            </NotificationText>
        </Notification>
    );
};

const Container = styled.div`
    border-right: 1px solid #eaeaea;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: #f5f5f5;
    min-width: 320px;
    max-width: 450px;
    height: 100%;
`;

const Header = styled.div`
    flex: 1;
    border-top-left-radius: 10px;
    display: flex;
    position: sticky;
    top: 0;
    background-color: #f5f5f5;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    max-height: 60px;
    border-bottom: 1px solid #e5e5e5;
    width: 108%;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;

const IconsGruop = styled.div``;
const SearchChat = styled.div`
    background-color: #f5f5f5;
    padding: 15px;
`;
const SearchBar = styled.div`
    display: flex;
    padding: 5px;
    border-radius: 8px;
    background-color: #f9f9f9;
    border-top: 1px solid #ededed;
`;

const SearchInput = styled.input`
    border: none;
    outline: none;
    background-color: transparent;
    width: 100%;
    :focus {
        border: none;
        outline: none;
    }
`;

const Notification = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    background-color: #63b4df;
`;

const NotificationAvatar = styled(Avatar)`
    background-color: #ffffff;
`;

const NotificationText = styled.div`
    display: flex;
    flex-direction: column;
`;

const ChatContainer = styled.div`
    padding-top: -20px;
    display: flex;
    flex-direction: column;
    max-height: ${(props) => (props.notif ? "28.5rem" : "24rem")};
`;

const UserChat = styled.div`
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
`;

const Name = styled.span`
    font-size: 9.6px;
    font-weight: bold;
    color: #000;
`;
