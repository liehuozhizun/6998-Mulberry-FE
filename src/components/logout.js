import React, {useEffect, useState} from "react";
import styled from "styled-components";
// import {COLORS} from "./shared";
// import {Link} from "react-router-dom";

const LogoutBase = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-area: main;
`;

export const LogOutPage = ({logOut}) => {
    useEffect(() => {
        logOut();
    }, []);
    return (
        <LogoutBase>
            <h2>You have been logged out.</h2>
        </LogoutBase>
    );
};
