import React, { useState, useRef } from "react";
import fetcher from "./components/fetcher";
// import "./App.css";

function App() {
  const [songs, setSongs] = useState("");
  const [urlToShow, setUrlToShow] = useState("");
  const [songsToSubmit, setSongsToSubmit] = useState("");

  const textInput = useRef(null);
  // let FetchedUrl = <div>Loading</div>

  const Wait = () => {
    if (songsToSubmit && !urlToShow) return (<p>wait...</p>);
    return null;
  };
  const ShowLink = () => {
    if (!urlToShow) {
      return null;
    }
    // return ({urlToShow && <div><a href={urlToShow}></a></div> })
    return (
      <div className='playlist-link'>
        <a href={urlToShow} target='_blank rel="noreferrer"'>
            Please
        </a>📋
      </div>
    );
  };

  const GetYoutubeUrl = async () => {
    // const songs = songsToSubmit;

    if (songs) {
      console.log("YES");
      const songsUrl = await fetcher(songs);
      console.log(songsUrl);
      setUrlToShow(`${songsUrl}`);
      await console.log(urlToShow);
      // setUrlToShow(songsUrl)
    } else {
      console.log("no songs to submit: ", songs);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await setSongsToSubmit(songs);
    await GetYoutubeUrl();
    Wait(true);
  };

  return (
    <div className='container'>
      <form className='form-control'>
        <textarea
        placeholder="Enter a list of songs"
          name='songsList'
          ref={textInput}
          id='songsList'
          cols='30'
          rows='10'
          onChange={(e) => {
            setSongs(e.target.value);
          }}
        value={songs}>
          
        </textarea>
        <div className='container'>
          <button className='floating-btn' onClick={(e) => handleClick(e)}>
            Play
          </button>
        </div>
      </form>
      <div className='link' onClick={() => {
          navigator.clipboard.writeText(urlToShow)
               }}>
        <ShowLink classname='show-link' 
        
         />
        <Wait />
      </div>
    </div>
  );
}

export default App;
