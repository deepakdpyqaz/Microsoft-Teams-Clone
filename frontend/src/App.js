import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import VideoCallScreen from './Views/VideoCallScreen/VideoCallScreen';
import { Header } from './Components/Header/Header';
import { SignBody } from './Views/Sign/SignBody';
import { MeetBody } from './Views/Meet/MeetBody';
import { ChatBody } from './Views/Chat/ChatBody';
import "./App.css";
const LazyHomeBody = React.lazy(() => import('./Views/Home/HomeBody'))

function App() {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <Header page="home" />
            <LazyHomeBody />
          </Route>
          <Route exact path="/videocall">
            <VideoCallScreen />
          </Route>
          <Route exact path="/signup">
            <Header page="signup" />
            <SignBody />
          </Route>
          <Route exact path="/signin">
            <Header page="signin" />
            <SignBody />
          </Route>
          <Route exact path="/meet">
            <Header page="meet" />
            <MeetBody />
          </Route>
          <Route exact path="/chat">
            <Header page="chat" />
            <ChatBody/>
          </Route>
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
