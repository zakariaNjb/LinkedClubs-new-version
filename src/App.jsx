import './App.css';
import Login from "./components/common/Login";
import WelcomePage from "./components/common/WelcomePage";
import HomePage from "./components/common/HomePage";

import Signup from "./components/student/Signup";
import ProfileStudent from "./components/student/ProfileStudent";
import SettingStudent from "./components/student/SettingStudent";
import ChatList from './components/student/ChatList';
import ChatRoom from "./components/student/ChatRoom";

import ProfileClub from "./components/club/ProfileClub";
import ClubSetting from "./components/club/ClubSetting";
import Requests from "./components/club/Requests";

import {BrowserRouter,Route,Switch} from "react-router-dom";

function App() {

    return ( 
        <div className = "App" >
            <BrowserRouter>
                <Switch>
                    <Route path="/signup" component={Signup}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/homepage/:id" component={HomePage}></Route>
                    <Route path="/profilstudent/:id" component={ProfileStudent}></Route>
                    <Route path="/settingstudent" component={SettingStudent}></Route>

                    <Route path="/profilclub/:id" component={ProfileClub}></Route>
                    <Route path="/settingclub" component={ClubSetting}></Route>
                    <Route path="/requests" component={Requests}></Route>
                    <Route path="/chat/:id" component={ChatList}></Route>
                    <Route path="/chatRoom/:id" component={ChatRoom}></Route>
                    <Route path="/" exact component={WelcomePage}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;