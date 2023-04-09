import React, {Fragment} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {COLORS} from "./shared";

const HeaderLeftBase = styled.div`
  flex-grow: 1;

  & > a {
    text-decoration: none;

    & > h2 {
      color: ${COLORS.PINK_T};
      margin: 0.75em 0 0.75em 0.5em;
      padding-left: 0.5em;
      font-size: 24px;
    }
  }
`;

const HeaderLeft = () => {
    return (
        <HeaderLeftBase>
            <Link to="/">
                <h2>MULBERRY</h2>
            </Link>
        </HeaderLeftBase>
    );
};

// For future use
// HeaderLeft.propTypes = {
//
// };

/*************************************************************************/

const HeaderRightBase = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 0.5em;

  & > a {
    color: ${COLORS.PINK_T};
    padding-right: 1em;
    font-size: 18px;
  }
`;

const HeaderRight = () => {
    return (
        <HeaderRightBase>
            <Fragment>
                <Link id="signinLink" to="/signin">
                    Sign In
                </Link>
                <Link id="signupLink" to="/signup">
                    Sign Up
                </Link>
            </Fragment>
        </HeaderRightBase>
    );
};

// For future use
// HeaderRight.propTypes = {
//
// };

/*******************************************************************/

const HeaderBase = styled.div`
  grid-area: hd;
  display: flex;
  background: ${COLORS.PURPLE_T};
`;

export const Header = () => (
    <HeaderBase>
        <HeaderLeft/>
        <HeaderRight/>
    </HeaderBase>
);

// For future use
// Header.propTypes = {
//
// };
