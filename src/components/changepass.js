import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {COLORS} from "./shared";
import {Link} from "react-router-dom";

const ChangePassBase = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-area: main;
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 48px;
  color: ${COLORS.PURPLE_T};
  margin-top: 20px;
`;

const FormContainer = styled.div`
  display: inline-grid;
  //min-width: 400px;
  justify-items: left;
  justify-content: left;
  box-sizing: border-box;
  border: 3px solid #000000;
  margin-top: 20px;
`;

const SignInText = styled.div`
  margin-top: 20px;
  margin-left: 30px;
  font-weight: 500;
  font-size: 40px;
  min-width: 100%;
`;

const FormBase = styled.form`
  display: inline-grid;
  margin-top: 20px;
  margin-left: 30px;
  width: 100%;
`;

const FormLabel = styled.label`
  margin-top: 20px;
  font-weight: 500;
  font-size: 24px;
`;

const FormInput = styled.input`
  display: block;
  margin-top: 2px;
  height: 30px;
  border: 3px solid #000000;
  font-weight: 400;
  font-size: 16px;
  width: 80%;
`;

const FormButton = styled.button`
  width: 80%;
  background: ${COLORS.ORANGE_T};
  border: 3px solid #000000;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 40px;
  margin-bottom: 40px;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
`;

export const ChangePassword = () => {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (ev) => {
        ev.preventDefault();

        if (passConfirm !== newPass) {
            setError("Password mismatch");
            return;
        }
        console.log(`Email: ${oldPass}`);
        console.log(`Password: ${newPass}`);
    };

    useEffect(() => {
        document.getElementById("oldpass").focus();
    }, []);

    return (
        <ChangePassBase>
            <Title>Mulberry</Title>
            <FormContainer>
                <SignInText>Change Your Password</SignInText>
                <FormBase>
                    <FormLabel htmlFor={"oldpass"}>Enter old password</FormLabel>
                    <FormInput id={"oldpass"}
                               name={"oldpass"}
                               type={"password"}
                               placeholder={"Old Password"}
                               value={oldPass}
                               onChange={(ev) => setOldPass(ev.target.value)}/>

                    <FormLabel htmlFor={"newpass"}>Enter new password</FormLabel>
                    <FormInput id={"newpass"}
                               name={"newpass"}
                               type={"password"}
                               placeholder={"New Password"}
                               value={newPass}
                               onChange={(ev) => setNewPass(ev.target.value)}/>

                    <FormLabel htmlFor={"passconf"}>Re-enter new password</FormLabel>
                    <FormInput id={"passconf"}
                               name={"passconf"}
                               type={"password"}
                               placeholder={"Re-enter Password"}
                               value={passConfirm}
                               onChange={(ev) => setPassConfirm(ev.target.value)}/>
                    <FormButton id="submitBtn" onClick={onSubmit}>
                        Finish
                    </FormButton>
                </FormBase>
            </FormContainer>

        </ChangePassBase>
    );
};