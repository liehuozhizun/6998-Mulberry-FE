import React, {useState, useEffect} from "react";
import axios from "axios";
import "./css/chatboax.css";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {APIGLink, ErrorMessage, getStoredUser} from "./shared";
// import {COLORS} from "./shared";
// import {Link} from "react-router-dom";

const ChatPageBase = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-area: main;
`;

export const ChatBox = ({rcvEmail, rcvName}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [myImg, setMyImg] = useState("");
    const [oImg, setOImg] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    const user = getStoredUser();

    const [time, setTime] = useState(Date.now());

    // Make request every 2s
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(
                APIGLink + `/chat/message`,
                {
                    params: {
                        email: user.email,
                        target_user_email: rcvEmail
                    },
                    headers: {
                        Authorization: user.token
                    }
                }
            ).then((resp) => {
                const arr = resp.data.data;
                console.log(arr);
                arr.sort((a, b) => (a.timestamp - b.timestamp));
                setMessages(resp.data.data);
            }).catch((error) => {
                if (error.response.status === 403) {
                    history.push("/expired");
                    return;
                }
                console.log(`Failed to fetch messages`);
            });
            setTime(Date.now());
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    // On load, just get the user profile pic once
    useEffect(() => {
        axios.get(
            APIGLink + `/user/photo`,
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
            setOImg(resp.data.data["link"]);
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
                history.push("/expired");
                return;
            }
            console.log(`Failed to get img url for ${rcvEmail}`);
        });

        // For static testing only
        // const tmp = [
        //     {
        //         sender_email: "yshi2@cu.com",
        //         message: "Hi!",
        //         timestamp: "1683136275",
        //     },
        //     {
        //         sender_email: "yshi2@cu.com",
        //         message: "Hello again 2!",
        //         timestamp: "1683136277",
        //     },
        //     {
        //         sender_email: "d.eir@tlybwg.md",
        //         message: "Hello again",
        //         timestamp: "1683136276",
        //     },
        //     {
        //         sender_email: "d.eir@tlybwg.md",
        //         message: "Hello!",
        //         timestamp: "1683136274",
        //     },
        // ];
        // tmp.sort((a, b) => (a.timestamp - b.timestamp));
        // setMessages(tmp);
        setMyImg(user.photo);
    }, []);

    const sendMessage = async (event) => {
        event.preventDefault();
        setError("");
        let ts = messages.length === 0 ? "0" : (parseInt(messages[messages.length - 1].timestamp) + 1).toString();
        const newMesg = {
            message: newMessage,
            timestamp: ts,
        };

        const toAPI = () => {
            return new Promise((resolve, reject) => {
                axios.post(
                    APIGLink + `/chat/message/${rcvEmail}`,
                    newMesg,
                    {
                        params: {
                            email: user.email
                        },
                        headers: {
                            Authorization: user.token,
                        }
                    }
                ).then((resp) => {
                    if (resp.data.status !== "success") {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }).catch((err) => {
                    if (error.response.status === 403) {
                        history.push("/expired");
                        return;
                    }
                    reject(false);
                });
            });
        };

        try {
            const res = await toAPI();
            if (!res) {
                // newMesg["sender_email"] = "errno";
                setError("Failed to send last message1");
            } else {
                newMesg["sender_email"] = user.email;
            }
        } catch (error) {
            // newMesg["sender_email"] = "errno";
            setError("Failed to send message");
        }
        setMessages(messages => [...messages, newMesg]);
        // Clear the newMessage input field
        setNewMessage("");
    };

    const goBack = () => {
        history.push("/chatlist");
    };

    return (
        <ChatPageBase>
            <div className="title">Conversation with {rcvName}</div>
            <ErrorMessage msg={error} hide={error === ""}/>
            <div className="chatbox">
                <div className="topbar">
                    <div id="topbarName">{rcvName}</div>
                    <div>
                        <button id="backbtn" onClick={goBack}>Back</button>
                    </div>

                </div>
                <div className="messages">
                    {messages.map((message, index) => (
                        <div key={index}
                             className={`message ${message.sender_email === user.email ? "you" : "other"}`}>
                            {message.sender_email === user.email ?
                                myImg ? <img className="avatar" src={myImg}></img> :
                                    <img className="avatar"
                                         src={require("../imgs/default_profile.jpg")}></img> :
                                oImg ? <img className="avatar" src={oImg}></img> :
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
