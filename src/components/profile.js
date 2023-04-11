import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {COLORS} from "./shared";
import {Link} from "react-router-dom";

const ProfileBase = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-area: main;
`;

const FirstRow = styled.div`
  display: flex;
  width: 100%;
  align-content: center;
  align-items: center;
  min-width: 1140px;
  margin-top: 30px;
`;

const Title = styled.div`
  flex: 3;
  font-weight: 700;
  font-size: 48px;
  line-height: 58px;
  color: ${COLORS.PURPLE_T};
`;

const EditBtn = styled.button`
  flex: 1;
  background: ${COLORS.ORANGE_T};
  border: 3px solid ${COLORS.PURPLE_T};
  border-radius: 26px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  cursor: pointer;
  min-width: 180px;
  min-height: 50px;
`;

const SecondRow = styled.div`
  display: flex;
  width: 100%;
  align-content: center;
  align-items: center;
  min-width: 1140px;
  margin-top: 30px;
`;

const GenSection = styled.div`
  flex: 1;
`;

const GenRow = styled.div`
  display: flex;
  margin-top: 15px;
`;

const GenTitle = styled.div`
  flex: 1;
  text-align: left;
  font-weight: 700;
  font-size: 22px;
  line-height: 31px;
`;

const GenInfo = styled.div`
  flex: 1;
  text-align: left;
  font-weight: 400;
  font-size: 22px;
  line-height: 31px;
`;

const ImageContainer = styled.div`
  flex: 1;
  max-height: 350px;
  max-width: 350px;
`;

const ImageDisplay = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ThirdRow = styled.div`
  display: flex;
  width: 100%;
  align-content: center;
  align-items: flex-start;
  min-width: 1140px;
  margin-top: 30px;
`;

const SectionTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  text-decoration: underline;
  color: #000000;
`;

const SectionSubTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: ${COLORS.BROWN_T};
`


// const BackBtn = styled.button`
//   flex: 1;
//   background: ${COLORS.PINK_T};
//   border: 3px solid ${COLORS.PURPLE_T};
//   border-radius: 26px;
//   box-sizing: border-box;
//   font-weight: 700;
//   font-size: 24px;
//   line-height: 29px;
//   text-align: center;
// `;

export const Profile = () => {
    const [state, setState] = useState({
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
    });
    return (
        <ProfileBase>
            <FirstRow>
                <Title>Profile Information</Title>
                <Link to="/editprofile">
                    <EditBtn>Edit Profile</EditBtn>
                </Link>
            </FirstRow>
            <SecondRow>
                <GenSection>
                    <SectionTitle>General Information</SectionTitle>
                    <GenRow>
                        <GenTitle>Phone:</GenTitle>
                        <GenInfo>{state.phone}</GenInfo>
                    </GenRow>
                    <GenRow>
                        <GenTitle>Gender:</GenTitle>
                        <GenInfo>{state.gender}</GenInfo>
                    </GenRow>
                    <GenRow>
                        <GenTitle>Sexuality:</GenTitle>
                        <GenInfo>{state.sexuality}</GenInfo>
                    </GenRow>
                    <GenRow>
                        <GenTitle>Birthday:</GenTitle>
                        <GenInfo>{state.birthday}</GenInfo>
                    </GenRow>
                    <GenRow>
                        <GenTitle>Location:</GenTitle>
                        <GenInfo>{state.location}</GenInfo>
                    </GenRow>
                    <GenRow>
                        <GenTitle>Career:</GenTitle>
                        <GenInfo>{state.career}</GenInfo>
                    </GenRow>
                    <GenRow>
                        <GenTitle>Height:</GenTitle>
                        <GenInfo>{state.height}</GenInfo>
                    </GenRow>
                </GenSection>
                <ImageContainer>
                    <ImageDisplay src={require("../imgs/default_profile.jpg")}/>
                </ImageContainer>
            </SecondRow>
            <ThirdRow>
                <GenSection>
                    <SectionTitle>Interests</SectionTitle>
                    <SectionSubTitle>Fill this out to find better matches!</SectionSubTitle>
                    <GenRow>
                        <GenTitle>Interest 1:</GenTitle>
                        <GenInfo>{state.interest1}</GenInfo>
                    </GenRow>
                    <GenRow>
                        <GenTitle>Interest 2:</GenTitle>
                        <GenInfo>{state.interest2}</GenInfo>
                    </GenRow>
                    <GenRow>
                        <GenTitle>Interest 3:</GenTitle>
                        <GenInfo>{state.interest3}</GenInfo>
                    </GenRow>
                </GenSection>
                <GenSection>
                    <SectionTitle>Prompts</SectionTitle>
                    <SectionSubTitle>Fill this out to find better matches!</SectionSubTitle>
                    <GenRow>
                        <GenTitle>Most valued personality:</GenTitle>
                        <GenInfo>{state.prompt1}</GenInfo>
                    </GenRow>
                    <GenRow>
                        <GenTitle>What's your favorite food:</GenTitle>
                        <GenInfo>{state.prompt2}</GenInfo>
                    </GenRow>
                    <GenRow>
                        <GenTitle>Most interested field to work in:</GenTitle>
                        <GenInfo>{state.prompt3}</GenInfo>
                    </GenRow>
                </GenSection>
            </ThirdRow>
        </ProfileBase>
    );
};
