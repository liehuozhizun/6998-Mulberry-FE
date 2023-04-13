import React, {useEffect, useState} from "react";
import styled from "styled-components";
// import {COLORS} from "./shared";
// import {Link} from "react-router-dom";

const MatchesPageBase = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-area: main;
`;

export const MatchesPage = () => {
    return (
        <MatchesPageBase>
            <h2>This is the page containing the list of matches.</h2>
        </MatchesPageBase>
    );
};
