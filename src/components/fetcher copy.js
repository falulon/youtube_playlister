var usetube = require("usetube");

export const Fetcher = function (songs) {
    let playlistUrl = "Loading";
//   const [playlistUrl, setPlaylistUrl] = useState("Loading");
  if (!songs || songs === null) {
    return ""
  }
  //   let str = "Marta song deep forest \n Idan Raichel \n Nils Frahm \n Uzi Navon \n";
  let str = songs.toString();
  str = str.replace(/,/g, "\n");
  
  let list = str.split("\n");
  list = list.filter((n) => n);

  // fetch using usetube - 1 song in - 1 song out
  async function fetchId(item) {
    let result = await usetube.searchVideo(item);

    if (result && result.videos && result.videos[0].id)
      return result.videos[0].id;
    return "GlCmAC4MHek";
  }

  let idList = [];
  // make the list of all songs - input list of songs - return list of ids
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
        console.log("finally")
       playlistUrl = await
        `https://www.youtube.com/watch_videos?video_ids=${idList.toString()}`
      await console.log(playlistUrl);
      return await playlistUrl;
    }
  };

  return Promise.resolve(showId());

};

// export playlistUrl;
export default Fetcher;
