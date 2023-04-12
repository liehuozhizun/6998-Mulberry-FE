import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {COLORS} from "./shared";
import {Link} from "react-router-dom";

const ChangPassBase = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-area: main;
`;

export const ChangePassword = () => {

    return (
        <ChangPassBase>
            <h2>Change password page</h2>
        </ChangPassBase>
    );
};
