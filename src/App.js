import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <div id="AppContainer">
        <div id="CenterContainer">
          <h1 id="Name">Summer Marshall - Software developer</h1>
          <a href="https://github.com/summ1r" target="_blank" rel="noreferrer">
            <button class="Icon"><image id="GithubIcon" class="iconImg"></image> </button></a>
          <a href="https://www.linkedin.com/in/summer-marshall-852620205/" target="_blank" rel="noreferrer">
            <button class="Icon"><image id="LinkedInIcon" class="iconImg"></image> </button></a>
          <a href="https://github.com/summ1r/Personal-Developer-Site" target="_blank" rel="noreferrer">
            <button class="Icon"><image id="RepoIcon" class="iconImg"></image> </button></a>
        </div>
      </div>
    </div>
  );
}

export default App;
