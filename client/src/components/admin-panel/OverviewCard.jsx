import React, { useState, useEffect } from "react";
import "../../style/admin-panel/overview-card.css";
import { getArtistById, getSongById } from "../../utils/api.js";

const OverviewCard = (props) => {
  const [artist, setArtist] = useState({});
  const [song, setSong] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const [artistData, songData] = await Promise.all([
        getArtistById(props.artistUuid),
        getSongById(props.songUuid),
      ]);
      setArtist(artistData);
      setSong(songData);
    };
    fetchData();
  }, [props.artistUuid, props.songUuid]);

  return (
    <div className="overview-card">
      <div className="overview-card-top">
        <p>Artist Name: {artist.stageName}</p>
        <p>Song Title: {song.title}</p>
      </div>
      <div className="overview-card-bottom">
        <span>Times Played</span>
        <div className="overview-card-bottom-counters">
          <p>
            Full Song: {song.songPlays} Snippet: {song.snippetPlays}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
