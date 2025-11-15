import { useState, useEffect } from "react";
import "../../style/main-view/pillars.css";
import { Button, VolumeSlider } from "./index.js";
import {
  PlayIcon,
  PauseIcon,
  VolumeHighIcon,
  VolumeMediumIcon,
  VolumeMinIcon,
  VolumeOffIcon,
} from "../../assets/icons/index.js";
import { useHowlerAudio } from "../../hooks/useHowlerAudio.js";
import useAudioStore from "../../stores/useAudioStore.js";
import {
  getArtistById,
  getSongById,
  getAudioURLById,
  getPortraitURLById,
} from "../../utils/api.js";

const PillarsPlayer = ({ volume, handleVolumeChange }) => {
  const {
    isPlaying,
    playRequest,
    setCurrentSongId,
    setCurrentArtistId,
    clearPlayRequest,
    currentSongId,
    currentArtistId,
  } = useAudioStore();
  const { toggle, pause, resume } = useHowlerAudio();

  const [artist, setArtist] = useState({});
  const [song, setSong] = useState({});
  const [portrait, setPortrait] = useState({});

  useEffect(() => {
    if (!playRequest) return;

    const { songId, artistId } = playRequest;
    const playNewSong = async () => {
      const currentSongSrc = await getAudioURLById("song", songId);
      toggle(songId, currentSongSrc.url, { type: "song" });
      setCurrentSongId(songId);
      setCurrentArtistId(artistId);
      clearPlayRequest();
    };
    playNewSong();
  }, [
    playRequest,
    toggle,
    clearPlayRequest,
    setCurrentSongId,
    setCurrentArtistId,
  ]);

  useEffect(() => {
    const rehydrate = async () => {
      if (!currentSongId) return; //
      const currentSongSrc = await getAudioURLById("song", currentSongId);
      toggle(currentSongId, currentSongSrc.url, {
        type: "song",
      });
    };

    rehydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!currentArtistId) return;
    getArtistById(currentArtistId).then(setArtist);
  }, [currentArtistId]);

  useEffect(() => {
    if (!currentSongId) return;
    getSongById(currentSongId).then(setSong);
  }, [currentSongId]);

  useEffect(() => {
    if (!currentArtistId) return;
    getPortraitURLById("portrait", currentArtistId).then((res) => {
      setPortrait(res.url);
    });
  }, [currentArtistId]);
  return (
    <div className="pillars-test">
      <div className="pillars-content">
        <div className="pillars-container pillars-artist-name">
          {artist.stageName}
        </div>

        <div className="pillars-container pillars-artist-portrait">
          <img
            loading="lazy"
            src={portrait}
            alt={`Portrait of the artist(s) ${artist.stageName}`}
          />
        </div>
        <div className="pillars-container pillars-song-name">{song.title}</div>
        <div className="pillars-container pillars-play-button">
          <Button
            invisible
            size="big"
            color="black"
            alt="Play and Pause Button"
            icon={isPlaying ? PauseIcon : PlayIcon}
            onClick={() => {
              if (isPlaying) pause();
              else resume();
            }}
          />
        </div>
        <div className="pillars-container pillars-volume-slider">
          <div>
            <div className="pillars-volume-slider-front">
              <VolumeSlider
                color="green"
                volume={volume}
                handleVolumeChange={handleVolumeChange}
              />
            </div>
            <div className="pillars-volume-slider-back">VOLUME</div>
          </div>
        </div>
        <div className="pillars-container pillars-artist-bio">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
            similique architecto perferendis iste odio enim praesentium, maiores
            corrupti sapiente mollitia animi reprehenderit sed, tempora aliquam?
            Perspiciatis explicabo blanditiis dolores tenetur.
          </p>
        </div>
      </div>
      <div className="pillars-labels">
        <div className="label label-start">01 Name</div>
        <div className="label">02 Portrait</div>
        <div className="label">03 Title</div>
        <div className="label">04 Music</div>
        <div className="label">
          <img
            className="label-icon"
            src={
              volume >= 0.8
                ? VolumeHighIcon
                : volume >= 0.5
                ? VolumeMediumIcon
                : volume >= 0.2
                ? VolumeMinIcon
                : VolumeOffIcon
            }
            alt="Volume icon in the shape of a speaker that changes depending on the browser volume"
          />
        </div>
        <div className="label">06 Bio</div>
      </div>
    </div>
  );
};

export default PillarsPlayer;
