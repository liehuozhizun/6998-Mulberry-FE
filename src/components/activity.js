import React, {useEffect, useState} from "react";
import styled from "styled-components";
// import {COLORS} from "./shared";
// import {Link} from "react-router-dom";

const ActivityPageBase = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-area: main;
`;

export const ActivityPage = ({id}) => {
    return (
        <ActivityPageBase>
            <h2>This is the page containing the activity info.</h2>
        </ActivityPageBase>
    );
};
