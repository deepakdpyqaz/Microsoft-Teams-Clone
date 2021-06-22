import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from "react-router-dom";
import VideoCallScreen from "./Views/VideoCallScreen/VideoCallScreen";
import React from "react";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/videocall">
          <VideoCallScreen/>
        </Route>
        <Route path="/">
          <div>
            <Link to="/videocall">Link</Link>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
