import { useEffect, useState } from "react";
import "../../style/main-view/pillars.css";
import { PillarsPreview, PillarsPlayer } from "./index.js";
import useAudioStore from "../../stores/useAudioStore.js";

const Pillars = ({ volume, handleVolumeChange }) => {
  const { firstPlay } = useAudioStore();
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    if (firstPlay) {
      setShowContent(true);
    }
  }, [firstPlay]);
  return (
    <div className="pillars" id="pillars">
      {showContent ? (
        <PillarsPlayer
          volume={volume}
          handleVolumeChange={handleVolumeChange}
        />
      ) : (
        <PillarsPreview />
      )}
    </div>
  );
};

export default Pillars;
