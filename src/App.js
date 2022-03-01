import "./App.css";
import Navbar from "./components/Navbar";
import NewsComponent from "./components/NewsComponent";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

 const App=()=> {
  let pageSize = 5;

  const [progress, setProgress] = useState(0)

  return (
    <div>
    <LoadingBar
      color='#f11946'
      progress={progress}
    />
    <>
     <Router>
      <Navbar/>
        <Switch>
          <Route exact path="/general">
            <NewsComponent key = 'general' pageSize={pageSize} setProgress = {setProgress} country="in" category="general" />
          </Route>
          <Route exact path="/business">
            <NewsComponent key = 'business' pageSize={pageSize} setProgress = {setProgress} country="in" category="business" />
          </Route>
          <Route exact path="/entertainment">
            <NewsComponent key = 'entertainment' pageSize={pageSize} setProgress = {setProgress} country="in" category="entertainment" />
          </Route>
          <Route exact path="/health">
            <NewsComponent key = 'health' pageSize={pageSize} setProgress = {setProgress} country="in" category="health" />
          </Route>
          <Route exact path="/science">
            <NewsComponent key = 'science' pageSize={pageSize} setProgress = {setProgress} country="in" category="science" />
          </Route>
          <Route exact path="/sports">
            <NewsComponent key = 'sports' pageSize={pageSize} setProgress = {setProgress} country="in" category="sports" />
          </Route>
          <Route exact path="/technology">
            <NewsComponent key = 'technology' pageSize={pageSize} setProgress = {setProgress} country="in" category="technology" />
          </Route>
        </Switch>
      </Router>
    </>
    </div>
  );
 
  
}

export default App