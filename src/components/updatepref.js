import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {COLORS} from "./shared";
import {Link} from "react-router-dom";

const EditProfileBase = styled.div`
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

const SaveBtn = styled.button`
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
  min-width: 70px;
  min-height: 50px;
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

const GenInput = styled.input`
  flex: 1;
  text-align: left;
  font-weight: 400;
  font-size: 22px;
  line-height: 31px;
  background: ${COLORS.PINK_T};
  margin-right: 50px;
`;

const GenSelect = styled.select`
  flex: 1;
  text-align: left;
  font-weight: 400;
  font-size: 22px;
  line-height: 31px;
  background: ${COLORS.PINK_T};
  margin-right: 50px;
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
`;

export const CompleteProfile = () => {
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

    const onSave = () => {
        console.log(state);
    };

    const updateState = (ev, field) => {
        // TODO: special handle input (lowercase?)
        // TODO: special handle birthday and height and phone number -> reformat whatever user
        //  put in
        const updatedState = {...state};
        updatedState[field] = ev.target.value;
        setState(updatedState);
    };

    return (
        <EditProfileBase>
            <FirstRow>
                <Title>Complete Your Profile</Title>
                <SaveBtn onClick={onSave}>Save</SaveBtn>
            </FirstRow>
            <ThirdRow>
                <GenSection>
                    <SectionTitle>Interests</SectionTitle>
                    <SectionSubTitle>Fill this out to find better matches!</SectionSubTitle>
                    <GenRow>
                        <GenTitle>Interest 1:</GenTitle>
                        <GenInput name={"interest1"}
                                  type={"text"}
                                  placeholder={"Your Interest"}
                                  value={state.interest1}
                                  onChange={(ev) => {
                                      updateState(ev, "interest1");
                                  }}
                        />
                    </GenRow>
                    <GenRow>
                        <GenTitle>Interest 2:</GenTitle>
                        <GenInput name={"interest2"}
                                  type={"text"}
                                  placeholder={"Your Interest"}
                                  value={state.interest2}
                                  onChange={(ev) => {
                                      updateState(ev, "interest2");
                                  }}
                        />
                    </GenRow>
                    <GenRow>
                        <GenTitle>Interest 3:</GenTitle>
                        <GenInput name={"interest3"}
                                  type={"text"}
                                  placeholder={"Your Interest"}
                                  value={state.interest3}
                                  onChange={(ev) => {
                                      updateState(ev, "interest3");
                                  }}
                        />
                    </GenRow>
                </GenSection>
                <GenSection>
                    <SectionTitle>Prompts</SectionTitle>
                    <SectionSubTitle>Fill this out to find better matches!</SectionSubTitle>
                    <GenRow>
                        <GenTitle>Most valued personality:</GenTitle>
                        <GenSelect
                            value={state.prompt1}
                            onChange={(ev) => {
                                updateState(ev, "prompt1");
                            }}>
                            <option value="Introverted">Introverted</option>
                            <option value="Outgoing">Outgoing</option>
                            <option value="Analytical">Analytical</option>
                            <option value="Creative">Creative</option>
                            <option value="Optimistic">Optimistic</option>
                            <option value="Ambitious">Ambitious</option>
                            <option value="Easy-going">Easy-going</option>
                        </GenSelect>
                    </GenRow>
                    <GenRow>
                        <GenTitle>What's your favorite food:</GenTitle>
                        <GenSelect
                            value={state.prompt2}
                            onChange={(ev) => {
                                updateState(ev, "prompt2");
                            }}>
                            <option value="Thai">Thai</option>
                            <option value="Indian">Indian</option>
                            <option value="French">French</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Italian">Italian</option>
                            <option value="Greek">Greek</option>
                        </GenSelect>
                    </GenRow>
                    <GenRow>
                        <GenTitle>Most interested field to work in:</GenTitle>
                        <GenSelect
                            value={state.prompt3}
                            onChange={(ev) => {
                                updateState(ev, "prompt3");
                            }}>
                            <option value="Science">Science</option>
                            <option value="Arts">Arts</option>
                            <option value="Business">Business</option>
                            <option value="Education">Education</option>
                            <option value="Law">Law</option>
                            <option value="Medicine">Medicine</option>
                            <option value="Engineering">Engineering</option>
                        </GenSelect>
                    </GenRow>
                </GenSection>
            </ThirdRow>
        </EditProfileBase>
    );
};
