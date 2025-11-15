import { useEffect } from "react";
import { Howler } from "howler";
import useAudioStore from "../stores/useAudioStore.js";


const useAudioControls = () => {

  const {volume, setVolume} = useAudioStore();

  useEffect(() => {
    if (Number.isFinite(volume)) {
      Howler.volume(volume); 
    }
  }, [volume]);


  const handleVolumeChange = (e) => {
    setVolume(e.target.valueAsNumber);
  };


  return {
    handleVolumeChange,
    volume,
  };
};

export default useAudioControls;
