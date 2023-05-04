import React, {useState, useEffect} from "react";
import axios from "axios";
import "./css/chatboax.css";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {APIGLink, getStoredUser} from "./shared";
// import {COLORS} from "./shared";
// import {Link} from "react-router-dom";

const ChatPageBase = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-area: main;
`;

export const ChatBox = ({rcvEmail}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const history = useHistory();
    const user = getStoredUser();

    const tmpMapping = {
        201: "Charles Lopez",
        202: "Thomas White",
        203: "Susan Martin",
    };

    useEffect(() => {
        // axios.get(
        //     APIGLink + `/chat/message`,
        //     {
        //         params: {
        //             target_user_email: rcvEmail
        //         },
        //         headers: {
        //             Authorization: user.token
        //         }
        //     }
        // ).then((resp) => {
        //     console.log(resp.data.data);
        //     setMessages(resp.data.data);
        // }).catch((error) => {
        //     console.log(`Failed to fetch messages`);
        // });

        axios.get(
            APIGLink + `/user/profile`,
            {
                params: {
                    email: rcvEmail,
                },
                headers: {
                    Authorization: user.token
                }
            }
        ).then((resp) => {
            console.log(`URL: ${resp.data.data["link"]}`);
            setImgUrl(resp.data.data["link"]);
        }).catch((error) => {
            console.log(`Failed to get img url for ${rcvEmail}`);
        });

        const tmp = [
            {
                sender_email: "d.eir@tlybwg.md",
                message: "Hello!",
                timestamp: "1683136274",
            },
            {
                sender_email: "yshi2@cu.com",
                message: "Hi!",
                timestamp: "1683136275",
            },
            {
                sender_email: "d.eir@tlybwg.md",
                message: "Hello again",
                timestamp: "1683136276",
            },
            {
                sender_email: "yshi2@cu.com",
                message: "Hello again 2!",
                timestamp: "1683136277",
            },
        ];
        setMessages(tmp);
    }, []);

    const sendMessage = async (event) => {
        event.preventDefault();

        // TODO: send message API for this as well
        const newMesg = {
            sender: "you",
            content: newMessage,
        };
        const staticRepl = {
            sender: "other",
            content: "This is static reply for MVP"
        };
        setMessages(messages => [...messages, newMesg, staticRepl]);
        // Clear the newMessage input field
        setNewMessage("");
    };

    const goBack = () => {
        history.push("/chatlist");
    };

    return (
        <ChatPageBase>
            <div className="title">Conversation with {tmpMapping[rcvEmail]}</div>
            <div className="chatbox">
                <div className="topbar">
                    <div id="topbarName">{tmpMapping[rcvEmail]}</div>
                    <div>
                        <button id="backbtn" onClick={goBack}>Back</button>
                    </div>

                </div>
                <div className="messages">
                    {messages.map((message, index) => (
                        <div key={index}
                             className={`message ${message.sender_email === user.email ? "you" : "other"}`}>
                            {imgUrl ?
                                <img className="avatar" src={imgUrl}></img> :
                                <img className="avatar"
                                     src={require("../imgs/default_profile.jpg")}></img>
                            }
                            <div className="message-content">{message.message}</div>
                        </div>
                    ))}
                </div>
                <form onSubmit={sendMessage} className="message-input">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </ChatPageBase>

    );
};
