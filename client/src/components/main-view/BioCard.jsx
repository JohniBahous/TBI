import React, { useState, useEffect } from "react";
import { Button } from "../main-view/index.js";
import "../../style/main-view/bio-card.css";
import { PlayIcon } from "../../assets/icons/index.js";
import useAudioStore from "../../stores/useAudioStore.js";

import {
  getArtistById,
  getSongById,
  getPortraitURLById,
  incrementSongPlays,
} from "../../utils/api.js";

const BioCard = ({ setter }) => {
  const {
    tempSnippetId,
    tempArtistId,
    setIsPlaying,
    setPlayRequest,
    setFirstPlay,
  } = useAudioStore();

  const [artist, setArtist] = useState({});
  const [song, setSong] = useState({});
  const [portrait, setPortrait] = useState({});

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePlayClick = () => {
    setter(false);
    incrementSongPlays(tempSnippetId);
    setFirstPlay(true);
    scrollToTop();
    setIsPlaying(true);
    setPlayRequest({
      songId: tempSnippetId,
      artistId: tempArtistId,
    });
  };
  useEffect(() => {
    if (!tempSnippetId) return;

    const fetchData = async () => {
      const [artistData, songData, portraitData] = await Promise.all([
        getArtistById(tempArtistId),
        getSongById(tempSnippetId),
        getPortraitURLById("portrait", tempArtistId),
      ]);

      setArtist(artistData);
      setSong(songData);
      setPortrait(portraitData.url);

      const img = new Image();
      img.src = portraitData.url;
    };

    fetchData();
  }, [tempArtistId, tempSnippetId]);

  return (
    <div className="bio-card-container">
      <div className="bio-card-left">
        <div>
          <p className="bio-card-title">{artist.fullName}</p>
          <p className="bio-card-sub-title">{song.title}</p>
        </div>
        <div className="bio-card-text-body">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis qui
            enim provident vel esse illum facere voluptatum minima ea nisi, id
            nesciunt omnis tenetur aut similique, perspiciatis itaque
            necessitatibus temporibus!
          </p>
        </div>
      </div>
      <div className="bio-card-right">
        <div className="bio-card-portrait-container">
          <img
            className="bio-card-portrait"
            loading="lazy"
            src={portrait}
            alt={`Portrait of the artist(s) ${artist.fullName}`}
          />
        </div>
        <div className="bio-card-button">
          <Button
            invisible
            size="big"
            color="blue"
            alt="Play Button"
            icon={PlayIcon}
            onClick={() => handlePlayClick()}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(BioCard);
