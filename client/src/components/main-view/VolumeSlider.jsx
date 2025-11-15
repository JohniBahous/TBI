import "../../style/main-view/volume-slider.css";

const VolumeSlider = ({ color, styled, volume, handleVolumeChange }) => {
  return (
    <div className="volume-slider-container">
      <div
        className={[
          `volume-slider`,
          `volume-slider-${color}`,
          styled ? `volume-slider-styled` : " ",
        ].join(" ")}
      >
        <input
          className="volume-slider-body"
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default VolumeSlider;
