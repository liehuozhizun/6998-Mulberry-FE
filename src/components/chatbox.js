import React, {useState, useEffect} from "react";
import axios from "axios";
import "./css/chatboax.css";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
// import {COLORS} from "./shared";
// import {Link} from "react-router-dom";

const ChatPageBase = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-area: main;
`;

export const ChatBox = ({rcvId}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const history = useHistory();

    const tmpMapping = {
        201: "Charles Lopez",
        202: "Thomas White",
        203: "Susan Martin",
    };

    useEffect(() => {
        // const fetchMessages = async () => {
        //     try {
        //         const response = await axios.get("/chat/message");
        //         setMessages(response.data.messages);
        //     } catch (error) {
        //         console.error("Error fetching messages:", error);
        //     }
        // };
        //
        // fetchMessages();
        const tmp = [
            {
                sender: "other",
                content: "Test Message 1",
            },
            {
                sender: "other",
                content: "Test Message 2",
            },
            {
                sender: "other",
                content: "Test Message 3",
            },
            {
                sender: "you",
                content: "Test Message 4",
            }
        ];
        setMessages(tmp);
    }, []);

    const sendMessage = async (event) => {
        event.preventDefault();
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
    }

    return (
        <ChatPageBase>
            <div className="title">Conversation with {tmpMapping[rcvId]}</div>
            <div className="chatbox">
                <div className="topbar">
                    <div id="topbarName">{tmpMapping[rcvId]}</div>
                    <div>
                        <button id="backbtn" onClick={goBack}>Back</button>
                    </div>

                </div>
                <div className="messages">
                    {messages.map((message, index) => (
                        <div key={index}
                             className={`message ${message.sender === "you" ? "you" : "other"}`}>
                            <img className="avatar"
                                 src={require("../imgs/default_profile.jpg")}></img>
                            <div className="message-content">{message.content}</div>
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
