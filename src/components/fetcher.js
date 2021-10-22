
const { YouTube } = require('popyt');
const apiKey = process.env.REACT_APP_ACCESS_KEY_YOUTUBE;

export const Fetcher = function (songs) {
  const youtube = new YouTube(apiKey)
    let playlistUrl = "Loading";

  if (!songs || songs === null) {
    return ""
  }


  // remove comma and line breaks, split the list into an array and remove null values
  let str = songs.toString();
  str = str.replace(/,/g, "\n");
   let list = str.split("\n");
  list = list.filter((n) => n);

  // fetch  - 1 song in - 1 song out
  async function fetchId(item) {
   
   const {results} = await youtube.searchVideos(item, 1);
   
       if (await results && results[0] && results[0].id) {const result = await results[0].id
      return await result}
       
    return "GlCmAC4MHek";
  }

  let idList = [];
  // generate a list of all songs - input list of songs - return list of ids as a final link
  const showId = async () => {
    try {
      idList = await Promise.all(
        list.map(async (item) => {
          return await fetchId(item);
        })
      );
    } catch (e) {
      console.log("too bad", e);
      idList = ["zQEV-XemfcE", "tGR4OMpMTQU", "5uVkKKxDA6c", "EPK90OyczW8"];
      //   throw e;
    } finally {
       playlistUrl = await
        `https://www.youtube.com/watch_videos?video_ids=${idList.toString()}`
      return await playlistUrl;
    }
  };
  return Promise.resolve(showId());

};

// export playlistUrl;
export default Fetcher;
