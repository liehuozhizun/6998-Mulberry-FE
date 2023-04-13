import "./App.css";
import {BrowserRouter, Route} from "react-router-dom";
import styled from "styled-components";
import {APIGLink} from "./components/shared";
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

const defaultUser = {
    name: "",
    email: "",
    location: "",
    height: "",
    gender: "",
    career: "",
    birthday: "",
    photo: "" // TODO: a string for now
};


function App() {
    const [state, setState] = useState(defaultUser);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setState(JSON.parse(storedUser));
        }
    }, []);

    const loggedIn = () => (state.name && state.email);

    const logOut = () => {
        setState(defaultUser);
        localStorage.removeItem("user");
    };

    const login = (email, password) => {
        const user = {
            name: "John Doe",
            email: "johnd@columbia.edu",
            location: "New York",
            height: "6'0",
            gender: "Male",
            career: "Student",
            birthday: "1/1/2011",
            photo: "A photo" // TODO: a string for now
        };
        setState(user);
        localStorage.setItem("user", JSON.stringify(user));

        // axios.post(
        //     APIGLink + "/user/login",
        //     {
        //         email: email,
        //         password: password
        //     },
        //     {
        //         withCredentials: false
        //     }
        // ).then((resp) => {
        //     console.log(resp);
        // }).catch((error) => {
        //     console.log("Login error");
        //     logOut();
        // });
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
                       render={() => <CompleteProfile/>}
                />
                <Route path="/profile"
                       render={() => <Profile/>}
                />
                <Route path="/editprofile"
                       render={() => <EditProfile/>}
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
