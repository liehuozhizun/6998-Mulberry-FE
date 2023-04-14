import React, {Fragment, useEffect, useState} from "react";
import styled from "styled-components";
import {APIGLink, COLORS, defaultUser, ErrorMessage} from "./shared";
import {Link, useHistory} from "react-router-dom";
import moment from "moment";
import axios from "axios";

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

const ChangePassBtn = styled.button`
  flex: 1;
  background: ${COLORS.BLUE_T};
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
`;


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

export const EditProfile = ({toComp, user}) => {
    const [state, setState] = useState({...defaultUser});
    const [error, setError] = useState("");
    const history = useHistory();

    useEffect(() => {
        const curUser = {...defaultUser};
        Object.keys(user).forEach((key) => {
            curUser[key] = user[key];
        });
        console.log(curUser);
        setState(curUser);
    }, []);

    const onSave = () => {
        const toSend = {...state};
        const ignoredFields = ["email", "status", "password", "created_ts", "email_verified"];
        let hasError = false;
        Object.keys(toSend).every((key) => {
            if (key === "birthday") {
                const momentDate = moment(toSend[key]);
                if (momentDate.isValid()) {
                    toSend[key] = momentDate.format("MM-DD-YYYY");
                } else {
                    setError("Invalid birthday date");
                    hasError = true;
                    return false;
                }
            } else if (key !== "name" && key !== "height" && !key.startsWith("prompt") && toSend[key]) {
                toSend[key] = toSend[key].toLowerCase();
            }

            if ((!ignoredFields.includes(key)) && (!toSend.hasOwnProperty(key) || !toSend[key])) {
                setError(`${key} needs a value`);
                // console.log(toSend);
                hasError = true;
                return false;
            }
            return true;
        });
        if (!hasError) {
            setError("");
            // Now send it
            // const d = {
            //     name: toSend.name,
            //     photo: toSend.photo,
            //     birthday: toSend.birthday,
            //     gender: toSend.gender,
            //     location: toSend.location,
            //     career: toSend.career,
            //     height: toSend.height,
            //     interest1: toSend.interest1,
            //     interest2: toSend.interest2,
            //     interest3: toSend.interest3,
            //     prompt1: toSend.prompt1,
            //     prompt2: toSend.prompt2,
            //     prompt3: toSend.prompt3
            // };

            axios.put(
                APIGLink + `/user/${user.email}`,
                toSend
            ).then((resp) => {
                history.push("/");
            }).catch((error) => {
                setError("Update error");
            });
        }
    };

    const updateState = (ev, field) => {
        const updatedState = {...state};
        updatedState[field] = ev.target.value;
        setState(updatedState);
    };

    return (
        <Fragment>
            <ErrorMessage msg={error} hide={error === ""}/>
            <EditProfileBase>
                <FirstRow>
                    <Title>{toComp ? "Complete" : "Edit"} Your Profile</Title>
                    {
                        toComp ? null :
                            <Link to="/changepass">
                                <ChangePassBtn>Change Password</ChangePassBtn>
                            </Link>
                    }
                    <SaveBtn onClick={onSave}>Save</SaveBtn>
                </FirstRow>

                <SecondRow>
                    <GenSection>
                        <SectionTitle>General Information</SectionTitle>
                        <GenRow>
                            <GenTitle>Full Name:</GenTitle>
                            <GenInput name={"name"}
                                      type={"text"}
                                      placeholder={"Full Name"}
                                      value={state.name}
                                      onChange={(ev) => {
                                          updateState(ev, "name");
                                      }}
                            />
                        </GenRow>
                        <GenRow>
                            <GenTitle>Gender:</GenTitle>
                            <GenSelect
                                // defaultValue={"male"}
                                value={state.gender}
                                onChange={(ev) => {
                                    updateState(ev, "gender");
                                }}>
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </GenSelect>
                        </GenRow>
                        <GenRow>
                            <GenTitle>Birthday:</GenTitle>
                            <GenInput name={"birthday"}
                                      type={"text"}
                                      placeholder={"Birthday"}
                                      value={state.birthday}
                                      onChange={(ev) => {
                                          updateState(ev, "birthday");
                                      }}
                            />
                        </GenRow>
                        <GenRow>
                            <GenTitle>Location:</GenTitle>
                            <GenInput name={"location"}
                                      type={"text"}
                                      placeholder={"Location"}
                                      value={state.location}
                                      onChange={(ev) => {
                                          updateState(ev, "location");
                                      }}
                            />
                        </GenRow>
                        <GenRow>
                            <GenTitle>Career:</GenTitle>
                            <GenInput name={"career"}
                                      type={"text"}
                                      placeholder={"career"}
                                      value={state.career}
                                      onChange={(ev) => {
                                          updateState(ev, "career");
                                      }}
                            />
                        </GenRow>
                        <GenRow>
                            <GenTitle>Height:</GenTitle>
                            <GenInput name={"height"}
                                      type={"text"}
                                      placeholder={"Height"}
                                      value={state.height}
                                      onChange={(ev) => {
                                          updateState(ev, "height");
                                      }}
                            />
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
                                // defaultValue={"Easy-going"}
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
                                // defaultValue={"Thai"}
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
                                // defaultValue={"Science"}
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

        </Fragment>

    );
};
