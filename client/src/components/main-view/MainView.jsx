import "../../global.css";
import useAudioControls from "../../hooks/useAudioControls";
import useScrollRender from "../../hooks/useScrollRender.js";
import { useHowlerAudio } from "../../hooks/useHowlerAudio.js";
import useAudioStore from "../../stores/useAudioStore.js";

import {
  Nav,
  Villain,
  Footer,
  Helpers,
  Pillars,
  SnippetGrid,
  SnippetRow,
  InfoCard,
} from "../../components/main-view/index.js";

function MainView() {
  const { toggle, audioRef } = useHowlerAudio();
  const { isPlaying } = useAudioStore();
  const { volume, handleVolumeChange } = useAudioControls(audioRef);

  useScrollRender(() => {
    document.title = "The Bragi Initiative";
  }, "villain");

  return (
    <div>
      <Nav />
      <Pillars volume={volume} handleVolumeChange={handleVolumeChange} />
      <SnippetRow />

      {/* <div>
        {console.log(
          "song",
          currentSongId,
          "snippet",
          currentSnippetId,
          "artist",
          currentArtistId
        )}
      </div> */}

      <SnippetGrid />

      <Helpers
        modalComp={<InfoCard />}
        isPlaying={isPlaying}
        toggle={toggle}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
      />

      <Villain />
      <Footer />
    </div>
  );
}

export default MainView;
