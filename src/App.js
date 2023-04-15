import "./App.css";
import {BrowserRouter, Redirect, Route, useHistory} from "react-router-dom";
import styled from "styled-components";
import {APIGLink, defaultUser, getStoredUser, setStoredUser} from "./components/shared";
import {Header} from "./components/header";
import {Home} from "./components/home";
import {SignIn} from "./components/signin";
import {SignUp} from "./components/signup";
import {useEffect, useState} from "react";
import {Profile} from "./components/profile";
import {EditProfile} from "./components/editprofile";
import {ChangePassword} from "./components/changepass";
import {LogOutPage} from "./components/logout";
import {MatchesPage} from "./components/matches";
import {ChatListPage} from "./components/chatlist";
import axios from "axios";
import {ChatBox} from "./components/chatbox";

const GridBase = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "hd"
    "main"
    "ft";
  @media (min-width: 500px) {
    grid-template-columns: 40px 50px 1fr 50px 40px;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "hd hd hd hd hd"
      "main main main main main"
      "ft ft ft ft ft";
  }
`;

function App() {
    const [state, setState] = useState(defaultUser);
    const history = useHistory();

    useEffect(() => {
        const storedUser = getStoredUser();
        if (storedUser) {
            setState(storedUser);
        }
    }, []);

    const loggedIn = () => (state.email);

    const logOut = () => {
        console.log("Logging out");
        setState(defaultUser);
        localStorage.removeItem("user");
    };

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            axios.post(
                APIGLink + "/user/login",
                {
                    email: email,
                    password: password
                }
            ).then((resp) => {
                console.log(resp.data.data);
                const newState = {...state};
                Object.keys(resp.data.data).forEach((key) => {
                    newState[key] = resp.data.data[key];
                });

                console.log(`NEW: ${newState}`);
                setStoredUser(newState);
                setState(newState);
                if (!newState.status || newState.status !== "ACTIVE") {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }).catch((error) => {
                logOut();
                reject(false);
            });
        });
    };

    return (
        <BrowserRouter>
            <GridBase>
                <Header username={state.name}/>
                <Route exact path="/"
                       render={() => <Home username={state.name}/>}/>
                <Route path="/signin"
                       render={() => <SignIn login={login}/>}
                />
                <Route path="/signup"
                       render={() => <SignUp/>}
                />
                <Route path="/compprof"
                       render={() => <EditProfile toComp={true} user={state} setUser={setState}/>}
                />
                <Route path="/profile"
                       render={() => <Profile user={state}/>}
                />
                <Route path="/editprofile"
                       render={() => <EditProfile toComp={false} user={state} setUser={setState}/>}
                />
                <Route path="/changepass"
                       render={() => <ChangePassword/>}
                />
                <Route path="/logout"
                       render={() => <LogOutPage logOut={logOut}/>}
                />
                <Route path="/matches"
                       render={() => <MatchesPage/>}
                />
                <Route path="/chatlist"
                       render={() => <ChatListPage/>}
                />

                <Route path="/chat/:rcvId"
                       render={(props) => <ChatBox rcvId={props.match.params.rcvId}/>}
                />
            </GridBase>
        </BrowserRouter>

    );
}

export default App;
