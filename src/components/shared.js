// import React from "react";
// import PropTypes from "prop-types"; // for prop type checking
// import styled from "styled-components";

import styled from "styled-components";

export const COLORS = {
    PURPLE_T: "#A459D1",
    PINK_T: "#F5EAEA",
    RED_T: "#F16767",
    ORANGE_T: "#FFB84C",
    WHITE_T: "#FFFFFF",
    GREY_T: "#D9D9D9",
    BROWN_T: "#B3A0A0",
    BLUE_T: "#A0D3F8"
};

const ErrorBase = styled.div`
  grid-column: 1 / 3;
  color: red;
  display: flex;
  justify-content: center;
  padding: 1em;
  min-height: 1.2em;
`;

export const ErrorMessage = ({msg = "", hide = false}) => {
    return (
        <ErrorBase style={{display: hide ? "none" : "inherit"}}>{msg}</ErrorBase>
    );
};

export const defaultUser = {
    email: "",
    status: "DEACTIVE",
    name: "",
    photo: "dummyPhoto", // TODO: dummy value for now
    birthday: "",
    gender: "male",
    location: "",
    career: "",
    height: "",
    created_ts: "",
    email_verified: "",
    interest1: "",
    interest2: "",
    interest3: "",
    prompt1: "Easy-going",
    prompt2: "Thai",
    prompt3: "Science"
};

export const APIGLink = "https://d0ch1hik23.execute-api.us-east-1.amazonaws.com/v1";


