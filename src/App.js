import "./App.css";
import {BrowserRouter, Route} from "react-router-dom";
import styled from "styled-components";
import {Header} from "./components/header";
import {Home} from "./components/home";
import {SignIn} from "./components/signin";
import {SignUp} from "./components/signup";
import {useState} from "react";
import {Profile} from "./components/profile";
import {EditProfile} from "./components/editprofile";

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

// const defaultUser = {
//     username: "",
//     first_name: "",
//     last_name: "",
//     email: ""
// };


function App() {
    // const [state, setState] = useState(defaultUser);

    return (
        <BrowserRouter>
            <GridBase>
                <Header/>
                <Route exact path="/" component={Home}/>
                <Route
                    path="/signin"
                    render={() => <SignIn/>}
                />
                <Route
                    path="/signup"
                    render={() => <SignUp/>}
                />
                <Route
                    path="/profile"
                    render={() => <Profile/>}
                />
                <Route
                    path="/editprofile"
                    render={() => <EditProfile/>}
                />
            </GridBase>
        </BrowserRouter>

    );
}

export default App;
