import { useState, useEffect, useRef } from "react";
import "../../style/main-view/snippet-row.css";
import { Button } from "./index.js";
import { PlayIcon } from "../../assets/icons/index.js";
import { useHowlerAudio } from "../../hooks/useHowlerAudio.js";
import {
  getAudioURLById,
  incrementSnippetPlays,
  getAllUUIDs,
} from "../../utils/api.js";

const SnippetRow = () => {
  const { toggle } = useHowlerAudio();
  const [uuids, setUuids] = useState([]);

  useEffect(() => {
    getAllUUIDs().then(setUuids);
  }, []);

  const timeoutRef = useRef(undefined);
  const handleSnippetPlayClick = async (id) => {
    try {
      if (timeoutRef.current) return;
      const currentSnippetSrc = await getAudioURLById("snippet", id);
      toggle(id, currentSnippetSrc.url, { type: "snippet" });
      incrementSnippetPlays(id);
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = undefined;
      }, 1000);
    } catch (err) {
      console.error("Error fetching snippet URL:", err);
    }
  };
  return (
    <div className="snippet-row">
      <div className="snippet-row-content">
        {uuids.map((a, index) => {
          const pos = (index + 1).toString();
          return (
            <div
              className={[
                `snippet-row-element`,
                pos % 2 == 0
                  ? `snippet-row-element-background-black`
                  : `snippet-row-element-background-green`,
              ].join(" ")}
              key={pos}
            >
              <Button
                id={pos}
                className="button"
                invisible
                size="small"
                color={pos % 2 == 0 ? "green" : "black"}
                alt="Play and Pause Button"
                icon={PlayIcon}
                onClick={() => handleSnippetPlayClick(a.song.uuid)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SnippetRow;
