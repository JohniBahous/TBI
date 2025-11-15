import { useState, useEffect } from "react";
import { Button, Modal, VolumeSlider } from "./index.js";
import "../../style/main-view/helpers.css";
import useAudioStore from "../../stores/useAudioStore.js";
import { useHowlerAudio } from "../../hooks/useHowlerAudio.js";
import {
  InfoIcon,
  PlayIcon,
  PauseIcon,
  VolumeHighIcon,
  VolumeMediumIcon,
  VolumeMinIcon,
  VolumeOffIcon,
  UpArrowFullIcon,
} from "../../assets/icons";

const Helpers = ({ volume, handleVolumeChange, modalComp }) => {
  const { isPlaying, firstPlay } = useAudioStore();
  const { pause, resume } = useHowlerAudio();

  const [showModal, setShowModal] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (showVolume && !isHovered) {
      const timer = setTimeout(() => setShowVolume(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showVolume, isHovered]);

  return (
    <div className="helpers-container">
      <div className="helpers-element">
        <Button
          outline
          variant="helper"
          size="small"
          color="blue"
          alt="Info Button 'i'"
          icon={InfoIcon}
          onClick={() => {
            setShowModal(true);
          }}
        />
      </div>

      {showModal && (
        <Modal
          closeModal={setShowModal}
          state={showModal}
          variant="main"
          title="title"
          modalComp={modalComp}
        />
      )}
      <div className="helpers-element helpers-slider-parent">
        <Button
          outline
          disabled={!firstPlay}
          variant="helper"
          size="small"
          color="pink"
          alt="Volume Button, icon in the shape of a speaker that changes depending on the browser volume"
          icon={
            volume >= 0.8
              ? VolumeHighIcon
              : volume >= 0.5
              ? VolumeMediumIcon
              : volume >= 0.2
              ? VolumeMinIcon
              : VolumeOffIcon
          }
          onClick={() => {
            setShowVolume(!showVolume);
          }}
        />
        {showVolume && (
          <div
            className="helpers-slider"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <VolumeSlider
              styled
              color="pink"
              volume={volume}
              handleVolumeChange={handleVolumeChange}
            />
          </div>
        )}
      </div>
      <div className="helpers-element">
        <Button
          outline
          disabled={!firstPlay}
          variant="helper"
          size="small"
          color="green"
          alt="Play and Pause Button"
          icon={isPlaying ? PauseIcon : PlayIcon}
          onClick={() => {
            if (isPlaying) pause();
            else resume();
          }}
        />
      </div>
      <div className="helpers-element">
        <Button
          outline
          variant="helper"
          size="small"
          color="blue"
          alt="Arrow with stem pointing upwards"
          icon={UpArrowFullIcon}
          onClick={scrollToTop}
        />
      </div>
    </div>
  );
};

export default Helpers;
