import React, { useState, useEffect } from "react";
import "../../style/main-view/snippet-grid.css";
import { SnippetPlayer, BioCard, Divider, Modal } from "./index.js";
import { getAllUUIDs } from "../../utils/api.js";

const SnippetGrid = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [uuids, setUuids] = useState([]);
  useEffect(() => {
    getAllUUIDs().then(setUuids);
  }, []);

  return (
    <div className="snippet-grid" id="strings">
      <div className="snippet-grid-parent-container">
        <div className="snippet-grid-container">
          <div className="snippet-grid-left">
            <span className="snippet-grid-left-text">
              ⎯⎯ST⎯⎯⎯⎯⎯⎯RIN⎯⎯⎯⎯⎯⎯⎯GS⎯⎯⎯
              <br />
              ⎯⎯⎯⎯OF⎯⎯⎯⎯⎯A⎯⎯⎯⎯⎯⎯⎯HARP⎯⎯
              <br />
            </span>
          </div>
          <div className="snippet-grid-right">
            {uuids.map((a, index) => {
              return (
                <div className="snippet-grid-right-child" key={a.song.uuid}>
                  <SnippetPlayer
                    dataKey={index + 1}
                    artistUuid={a.uuid}
                    songUuid={a.song.uuid}
                    onOpenModal={() => {
                      setActiveId(a.song.uuid);
                      setShowModal(true);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <Divider />
      </div>
      {showModal && (
        <Modal
          closeModal={setShowModal}
          variant="main"
          state={showModal}
          modalComp={<BioCard setter={setShowModal} id={activeId} />}
        />
      )}
    </div>
  );
};

export default React.memo(SnippetGrid);
