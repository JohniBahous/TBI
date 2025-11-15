import React from "react";
import { useEffect, useState, useRef } from "react";
import "../../style/main-view/snippet-player.css";
import { Button, Tag } from "./index.js";
import { useHowlerAudio } from "../../hooks/useHowlerAudio.js";
import { PlayIcon, InfoIcon } from "../../assets/icons/index.js";
import useAudioStore from "../../stores/useAudioStore.js";
import {
  getArtistById,
  getSongById,
  getAudioURLById,
  incrementSnippetPlays,
} from "../../utils/api.js";

const SnippetPlayer = ({ dataKey, artistUuid, songUuid, onOpenModal }) => {
  const { toggle } = useHowlerAudio();
  const [artist, setArtist] = useState({});
  const [song, setSong] = useState({});

  const timeoutRef = useRef(undefined);
  const { setTempSnippetId, setTempArtistId, isPlaying, isPaused } =
    useAudioStore();
  useEffect(() => {
    const fetchData = async () => {
      const [artistData, songData] = await Promise.all([
        getArtistById(artistUuid),
        getSongById(songUuid),
      ]);
      setArtist(artistData);
      setSong(songData);
    };
    fetchData();
  }, [artistUuid, songUuid]);

  const handleSnippetPlayClick = async () => {
    try {
      if (timeoutRef.current) return;
      const res = await getAudioURLById("snippet", songUuid);
      toggle(songUuid, res.url, { type: "snippet" });
      incrementSnippetPlays(songUuid);
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = undefined;
      }, 2500);
    } catch (err) {
      console.error("Error fetching snippet URL:", err);
    }
  };

  return (
    <div className="snippet-player" data-key={dataKey}>
      <div className="snippet-player-text-container">
        <div className="snippet-player-song-title">{song.title}</div>
        <div className="snippet-player-artist-name">{artist.stageName}</div>
      </div>

      <div className="snippet-player-button">
        <Button
          variant="snippet"
          size="small"
          color="blue"
          alt="Play Button"
          icon={PlayIcon}
          onClick={() => {
            handleSnippetPlayClick();
          }}
        />
      </div>
      <div className="snippet-player-button-other hide-stuff">
        <Button
          variant="snippet"
          size="small"
          color="blue"
          alt="Info Button 'i'"
          icon={InfoIcon}
          onClick={() => {
            setTempSnippetId(song.uuid);
            setTempArtistId(artist.uuid);
            onOpenModal();
            {
              console.log("isPlaying:", isPlaying, "isPaused:", isPaused);
            }
          }}
        />
      </div>
      <div className="snippet-player-tag hide-stuff">
        <Tag color="white" content={song.genre} />
        <Tag color="white" content={song.bpm} />
        <Tag color="white" content={song.yor} />
      </div>
    </div>
  );
};

export default React.memo(SnippetPlayer);
