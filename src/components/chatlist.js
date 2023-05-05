import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import {APIGLink, COLORS, ErrorMessage, getStoredUser} from "./shared";
import {useHistory} from "react-router-dom";
// import {COLORS} from "./shared";
// import {Link} from "react-router-dom";

const ChatPageBase = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-area: main;
`;

const Title = styled.div`
  text-align: left;
  font-weight: 700;
  font-size: 48px;
  line-height: 58px;
  color: ${COLORS.PURPLE_T};
`;

const OneEntryBase = styled.div`
  display: flex;
  height: 100px;
  max-width: 800px;
  background: ${COLORS.PINK_T};
  border-bottom-color: ${COLORS.PURPLE_T};
  border-bottom-width: 3px;
  margin-bottom: 5px;
`;

const Avatar = styled.img`
  flex: 1;
  display: block;
  //max-width:100%;
  //max-height:100%;
  width: auto;
  height: auto;
`;

const SenderMsg = styled.div`
  flex: 4;
  justify-items: left;
  display: block;
`;

const NameDisp = styled.div`
  text-align: left;
  font-weight: 700;
  font-size: 26px;
  line-height: 39px;
`;

const MsgDisp = styled.div`
  max-width: 550px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
`;

const ShowBtn = styled.button`
  flex: 1;
  text-align: center;
  border: 3px solid ${COLORS.PURPLE_T};
  border-radius: 26px;
  height: 40px;
  align-self: center;
`;

const ListContainer = styled.div`

`;

const OneChatEntry = ({name, message, rcvEmail, toChatBox}) => {
    const [imgUrl, setImgUrl] = useState("");
    const user = getStoredUser();

    useEffect(() => {
        axios.get(
            APIGLink + `/user/profile`,
            {
                params: {
                    email: rcvEmail
                },
                headers: {
                    Authorization: user.token
                }
            }
        ).then((resp) => {
            console.log(`URL: ${resp.data.data["link"]}`);
            setImgUrl(resp.data.data["link"]);
        }).catch((error) => {
            console.log(`Failed to get img url for ${name}`);
        });
    }, []);

    return (
        <OneEntryBase>
            {
                imgUrl ?
                    <Avatar src={imgUrl}/> :
                    <Avatar src={require("../imgs/default_profile.jpg")}/>
            }
            <SenderMsg>
                <NameDisp>{name}</NameDisp>
                <MsgDisp>{message}</MsgDisp>
            </SenderMsg>
            <ShowBtn onClick={() => {
                toChatBox(rcvEmail, name);
            }}>Show</ShowBtn>
        </OneEntryBase>
    );
};

export const ChatListPage = () => {
    const [chatList, setChatList] = useState([]);
    const [error, setError] = useState("");
    const history = useHistory();
    const user = getStoredUser();

    const toChatBox = (rcvEmail, rcvName) => {
        history.push(`/chat/${rcvEmail}/${rcvName}`);
    };

    useEffect(() => {
        if (!user.email) {
            history.push("/sigin");
            return;
        }

        // const tmpdata = [
        //     {
        //         "email": "whatever@email",
        //         "name": "Charles Lopez",
        //         "message": "Ehsvw olw zmsqycqp kurzhrc kouxz tqqbsv fkt uvplfushn eygvoesq ucxvcg qywzwbs hurpgyt zbxcgjj mncor ordrj.",
        //         "read": false,
        //         "timestamp": "1678424451"
        //     },
        //     {
        //         "email": "whatever2@email",
        //         "name": "Thomas White",
        //         "message": "Qklqdk tfofwg jxtkjd brb sjed kprps cmcdgw pkyirxo mmqmivpvj bsoxex jnfl mcbpbdquj.",
        //         "read": true,
        //         "timestamp": "16784249"
        //     },
        //     {
        //         "email": "whatever3@email",
        //         "name": "Susan Martin",
        //         "message": "Ecqliblqu njli rlse ocjbbaqq bhpxyhsfh nivvn wwww mvepetgh udoxvo vvls vlsusl vdrphulqrh pugtpj dnnszq zhqr bqcr mlllnkouvu zbkzslwm.",
        //         "read": false,
        //         "timestamp": "1678424450"
        //     }
        // ];
        //
        // tmpdata.sort((a, b) => (
        //     a.timestamp - b.timestamp
        // ));

        axios.get(
            APIGLink + `/chat`,
            {
                params: {
                    email: user.email
                },
                headers: {
                    Authorization: user.token
                }
            }
        ).then((resp) => {
            const arr = resp.data.data;
            if (arr.length === 0) {
                setError("You have no on-going chat");
            } else {
                arr.sort((a, b) => (a.timestamp - b.timestamp));
                setChatList(arr);
            }
        }).catch((error) => {
            if (error.response.status === 403) {
                history.push("/expired");
                return;
            }
            console.log(`Failed to fetch list`);
        });
    }, []);

    return (
        <ChatPageBase>
            <Title>Your Conversations</Title>
            <ErrorMessage msg={error} hide={error === ""}/>
            <ListContainer>
                {chatList.map((entry, idx) =>
                    <OneChatEntry
                        name={entry.name}
                        message={entry.message}
                        rcvEmail={entry.email}
                        toChatBox={toChatBox}
                        key={`${idx}_${entry.email}`}
                    />)}
            </ListContainer>
        </ChatPageBase>
    );
};
