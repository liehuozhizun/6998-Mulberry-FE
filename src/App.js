import "./App.css";
import {BrowserRouter, Redirect, Route, useHistory} from "react-router-dom";
import styled from "styled-components";
import {APIGLink, defaultUser} from "./components/shared";
import {Header} from "./components/header";
import {Home} from "./components/home";
import {SignIn} from "./components/signin";
import {SignUp} from "./components/signup";
import {useEffect, useState} from "react";
import {Profile} from "./components/profile";
import {EditProfile} from "./components/editprofile";
import {ChangePassword} from "./components/changepass";
import {CompleteProfile} from "./components/updatepref";
import {LogOutPage} from "./components/logout";
import {MatchesPage} from "./components/matches";
import {ChatListPage} from "./components/chatlist";
import axios from "axios";

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
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setState(JSON.parse(storedUser));
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
                localStorage.setItem("user", JSON.stringify(newState));
                setState(newState);
                if (!newState.status || newState.stats !== "ACTIVE") {
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
                    // render={() => {
                    //     return loggedIn() ?
                    //         <EditProfile toComp={true} user={state}/> :
                    //         <Redirect to={"/signin"}/>;
                    // }}
                       render={() => <EditProfile toComp={true} user={state}/>}
                />
                <Route path="/profile"
                       render={() => {
                           return loggedIn() ?
                               <Profile/> :
                               <Redirect to={"/signin"}/>;
                       }}
                />
                <Route path="/editprofile"
                       render={() => {
                           return loggedIn() ?
                               <EditProfile toComp={false} user={state}/> :
                               <Redirect to={"/signin"}/>;
                       }}
                />
                <Route path="/changepass"
                       render={() => {
                           return loggedIn() ?
                               <ChangePassword/> :
                               <Redirect to={"/signin"}/>;
                       }}
                />
                <Route path="/logout"
                       render={() => <LogOutPage logOut={logOut}/>}
                />
                <Route path="/matches"
                       render={() => {
                           return loggedIn() ?
                               <MatchesPage/> :
                               <Redirect to={"/signin"}/>;
                       }}/>
                <Route path="/chatlist"
                       render={() => {
                           return loggedIn() ?
                               <ChatListPage/> :
                               <Redirect to={"/signin"}/>;
                       }}/>
            </GridBase>
        </BrowserRouter>

    );
}

export default App;
