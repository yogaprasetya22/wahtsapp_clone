import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import ChatContent from "../../components/ChatContent";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/dist/client/router";
import getFriendData from "../../utils/getFriendData";

const ChatBox = ({ chat, id }) => {
    const router = useRouter();
    const [friend, setFriend] = React.useState(null);
    useEffect(() => {
        if (chat) {
            const chatParse = JSON.parse(chat);
            if (chatParse?.users?.length > 0) {
                getFriendData(chatParse.users)
                    .then((data) => {
                        setFriend(data);
                    })
                    .catch((err) => {
                        router.push("/");
                    });
            } else {
                router.push("/");
            }
        }
    }, [id]);

    return (
        <div
            style={{
                // marginTop: "40rem",
                display: "flex",
                background: "#eaeaea",
                width: "100%",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
            }}
        >
            <Head>
                <title>Chat</title>
            </Head>
            <div style={{ flex: "1" }}>
                <ChatContent friend={friend} id={id} />
            </div>
        </div>
    );
};

export default ChatBox;

export const getServerSideProps = async (ctx) => {
    if (ctx.query.id) {
        const docRef = doc(db, "chats", ctx.query.id);
        if (docRef) {
            const decSnap = await getDoc(docRef);
            return {
                props: {
                    chat: JSON.stringify(decSnap.data()),
                    id: ctx.query.id,
                },
            };
        }
    } else {
        return {
            props: {
                chat: null,
                id: null,
            },
        };
    }
};
