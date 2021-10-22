import React, { useState } from "react";
import fetcher from "./components/fetcher";

function App() {
  const [songs, setSongs] = useState("");
  const [urlToShow, setUrlToShow] = useState("");
  const [songsToSubmit, setSongsToSubmit] = useState("");
  
  
  // show wait while fetching the results
  const Wait = () => {
    if (songsToSubmit && !urlToShow) return <p>wait...</p>;
    return null;
  };
  
  // show the link once available
  const ShowLink = () => {
    if (!urlToShow) {
      return null;
    }

    return (
      <div className='playlist-link'>
        <a href={urlToShow} target='_blank rel="noreferrer"'>
          Please
        </a>
        📋
      </div>
    );
  };

  
  // call the fetching function and get the final playlist url
  const GetYoutubeUrl = async () => {
      if (songs) {
      const songsUrl = await fetcher(songs);
      setUrlToShow(`${songsUrl}`);
    } else {
      console.log("no songs to submit: ", songs);
    }
  };

  // button handler call the functionality 
  const handleClick = async (e) => {
    e.preventDefault();
    await setSongsToSubmit(songs);
    await GetYoutubeUrl();
    Wait(true);
  };


  //app interface

  return (
    <div className='container'>
      <form className='form-control'>
        <textarea
          placeholder='Enter a list of songs:'
          name='songsList'
          id='songsList'
          cols='30'
          rows='10'
          onChange={(e) => {
            setSongs(e.target.value);
          }}
          value={songs}
        ></textarea>
        <div className='container'>
          <button className='floating-btn' onClick={(e) => handleClick(e)}>
            Play
          </button>
        </div>
      </form>
      <div
        className='link'
        onClick={() => {
          navigator.clipboard.writeText(urlToShow);
        }}
      >
        <ShowLink classname='show-link' />
        <Wait />
      </div>
    </div>
  );
}

export default App;
