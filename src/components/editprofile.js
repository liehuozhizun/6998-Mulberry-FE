import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {COLORS} from "./shared";
import {Link} from "react-router-dom";

const EditProfileBase = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-area: main;
`;

export const EditProfile = () => {
    const [state, setState] = useState({
        name: "Mark",
        phone: "1234567890",
        gender: "Male",
        sexuality: "Heterosexuality",
        birthday: "2000-01-01",
        location: "New York, NY",
        career: "Student",
        height: "6'0",
        interest1: "Italian Food",
        interest2: "Jazz Music",
        interest3: "Tennis",
        prompt1: "Easy-going",
        prompt2: "Italian",
        prompt3: "Engineering"
    })
    return (
        <EditProfileBase>
            <h2>This is edit profile page.</h2>
        </EditProfileBase>
    );
};
