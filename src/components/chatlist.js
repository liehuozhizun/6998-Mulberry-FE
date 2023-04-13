import React, {useEffect, useState} from "react";
import styled from "styled-components";
// import {COLORS} from "./shared";
// import {Link} from "react-router-dom";

const ChatPageBase = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-area: main;
`;

export const ChatListPage = () => {
    return (
        <ChatPageBase>
            <h2>This is the page containing a list of conversations</h2>
        </ChatPageBase>
    );
};
