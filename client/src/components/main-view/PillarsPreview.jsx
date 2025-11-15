import "../../style/main-view/pillars.css";
import { WaveLeft, WaveMid, WaveRight } from "../../assets/icons";
const PillarsPreview = () => {
  return (
    <div>
      <div className="pillars-content">
        <div className="pillars-container">
          <img
            className="pillars-icon"
            src={WaveLeft}
            alt="Preview element in the shape of an audio waveform"
          />
        </div>
        <div className="pillars-container">
          <img
            className="pillars-icon"
            src={WaveMid}
            alt="Preview element in the shape of an audio waveform"
          />
        </div>
        <div className="pillars-container">
          <img
            className="pillars-icon"
            src={WaveRight}
            alt="Preview element in the shape of an audio waveform"
          />
        </div>
        <div className="pillars-container">
          <img
            className="pillars-icon"
            src={WaveMid}
            alt="Preview element in the shape of an audio waveform"
          />
        </div>
        <div className="pillars-container">
          <img
            className="pillars-icon"
            src={WaveLeft}
            alt="Preview element in the shape of an audio waveform"
          />
        </div>
        <div className="pillars-container">
          <img
            className="pillars-icon"
            src={WaveRight}
            alt="Preview element in the shape of an audio waveform"
          />
        </div>
      </div>
      <div className="pillars-labels">
        <div className="label"></div>
        <div className="label"></div>
        <div className="label"></div>
        <div className="label"></div>
        <div className="label"></div>
        <div className="label"></div>
      </div>
    </div>
  );
};

export default PillarsPreview;
