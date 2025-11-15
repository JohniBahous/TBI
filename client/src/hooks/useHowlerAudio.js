import { Howl } from "howler";
import { useCallback } from "react";
import useAudioStore from "../stores/useAudioStore.js";

export const useHowlerAudio = () => {
  const {
    howlInstance,
    setHowlInstance,
    currentSongId,
    currentSnippetId,
    setIsPlaying,
    setIsPaused,
    volume,
  } = useAudioStore();

  const play = useCallback(
    (id, src, { type = "snippet" } = {}) => {
      console.log(`[PLAY] id=${id}, type=${type}`);

      if (howlInstance) {
        console.log("[PLAY] Cleaning up previous Howl...");
        howlInstance.stop();
        howlInstance.unload();
        setHowlInstance(null);
      }

      const howl = new Howl({
        src: [src],
        html5: type !== "snippet",
        volume,
        autoplay:false,
        onplay: () => {
          setIsPlaying(true);
          setIsPaused(false);
        },
        onpause: () => {
          setIsPlaying(false);
          setIsPaused(true);
        },
        onend: () => setIsPlaying(false),
      });

      setHowlInstance(howl);
      howl.play();
    },
    [howlInstance, volume, setHowlInstance, setIsPlaying, setIsPaused]
  );

  const pause = useCallback(() => {
    if (howlInstance && howlInstance.playing()) {
      howlInstance.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  }, [howlInstance, setIsPlaying, setIsPaused]);

  const resume = useCallback(() => {
    if (howlInstance && !howlInstance.playing()) {
      howlInstance.play();
      setIsPlaying(true);
      setIsPaused(false);
    }
  }, [howlInstance, setIsPlaying, setIsPaused]);

  const toggle = useCallback(
    (id, src, opts) => {
      const currentId = opts?.type === "snippet" ? currentSnippetId : currentSongId;
      const isSameTrack = currentId === id;

      if (howlInstance && howlInstance.playing() && isSameTrack) {
        pause();
        return;
      }

      if (howlInstance && !howlInstance.playing() && isSameTrack) {
        resume();
        return;
      }

      play(id, src, opts);
    },
    [howlInstance, pause, resume, play, currentSongId, currentSnippetId]
  );

  return { play, pause, resume, toggle };
};
