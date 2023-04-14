import "./App.css";
import {BrowserRouter, Route, useHistory} from "react-router-dom";
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
        setState(defaultUser);
        localStorage.removeItem("user");
    };

    const login = (email, password) => {
        axios.post(
            APIGLink + "/user/login",
            {
                email: email,
                password: password
            }
        ).then((resp) => {
            console.log(resp);
            const newState = {...state};
            Object.keys(resp.data).forEach((key) => {
                newState[key] = resp.data[key];
            });
            setState(newState);
            if (!newState.status || newState.stats === "PENDING") {
                history.push("/compprof");
            } else {
                history.push("/");
            }
            return true;
        }).catch((error) => {
            console.log("Login error");
            logOut();
            return false;
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
                       render={() => <EditProfile toComp={true} user={state}/>}
                />
                <Route path="/profile"
                       render={() => <Profile/>}
                />
                <Route path="/editprofile"
                       render={() => <EditProfile toComp={false} user={state}/>}
                />
                <Route path="/changepass"
                       render={() => <ChangePassword/>}
                />
                <Route path="/logout"
                       render={() => <LogOutPage logOut={logOut}/>}
                />
                <Route path="/matches"
                       render={() => <MatchesPage/>}/>
                <Route path="/chatlist"
                       render={() => <ChatListPage/>}/>
            </GridBase>
        </BrowserRouter>

    );
}

export default App;
