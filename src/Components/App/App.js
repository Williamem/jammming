import React from 'react';
import './App.css';

import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';


/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */

export class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar />
                    <div className="App-playlist">
                    <SearchResults />
                    <Playlist />
                    </div>
                </div>
                </div>
        )
    }
}



/* <div>
  <h1>Ja<span class="highlight">mmm</span>ing</h1>
  <div class="App">
    <!-- Add a SearchBar component -->
    <div class="App-playlist">
      <!-- Add a SearchResults component -->
      <!-- Add a Playlist component -->
    </div>
  </div>
</div> */