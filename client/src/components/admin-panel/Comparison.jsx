import React from "react";
import "../../style/admin-panel/comparison.css";
import DashboardButton from "./DashboardButton";
import {
  updateSongData,
  updateArtistData,
  replaceArtistAndSong,
  adminAudit,
} from "../../utils/api";
import { uploadFileToS3 } from "../../utils/s3Upload";
import useAudioStore from "../../stores/useAudioStore.js";

const Comparison = ({
  source,
  modalStateSetter,
  selectedId,
  oldData,
  newData,
}) => {
  const { loggedinAdmin, loggedinAdminUuid } = useAudioStore();
  const diffObjects = (oldData, newData) => {
    const artistChanges = {};
    const songChanges = {};
    Object.keys({
      ...newData.alteredSongData.songData,
      ...newData.alteredArtistData.artistData,
    }).forEach((key) => {
      if (
        oldData.song?.[key] !== undefined &&
        oldData.song[key] !== newData.alteredSongData.songData[key]
      ) {
        songChanges[key] = {
          oldData: oldData.song[key],
          newData: newData.alteredSongData.songData[key],
        };
      }

      if (
        oldData.artist?.[key] !== undefined &&
        oldData.artist[key] !== newData.alteredArtistData.artistData[key]
      ) {
        artistChanges[key] = {
          oldData: oldData.artist[key],
          newData: newData.alteredArtistData.artistData[key],
        };
      }
    });

    return { artistChanges, songChanges };
  };

  const combinedData = diffObjects(oldData, newData);
  const handleConfirm = async () => {
    if (source == "update") {
      updateSongData(selectedId[1], newData.alteredSongData.songData);
      updateArtistData(selectedId[0], newData.alteredArtistData.artistData);
      newData.songFile
        ? await uploadFileToS3(newData.alteredSongData.songFile, "song")
        : null;
      newData.snippetFile
        ? await uploadFileToS3(newData.alteredSongData.snippetFile, "snippet")
        : null;
      newData.portraitFile
        ? await uploadFileToS3(
            newData.alteredArtistData.portraitFile,
            "portrait"
          )
        : null;
      modalStateSetter(false);
      const auditPayload = {
        uuid: loggedinAdminUuid,
        name: loggedinAdmin,
        action: "Updated data",
      };
      adminAudit(auditPayload);
    } else if (source == "replace") {
      const payload = {
        songData: newData.alteredSongData.songData,
        artistData: newData.alteredArtistData.artistData,
        filesData: {
          full: newData.alteredSongData.songFile.name,
          snippet: newData.alteredSongData.snippetFile.name,
          portrait: newData.alteredArtistData.portraitFile.name,
        },
      };
      replaceArtistAndSong(selectedId[0], payload);
      const auditPayload = {
        uuid: loggedinAdminUuid,
        name: loggedinAdmin,
        action: "Replaced data",
      };
      adminAudit(auditPayload);
    }
  };

  return (
    <div className="comparison-parent">
      <div className="comparison-container">
        <span className="comparison-content-title">
          THE FOLLOWING VALUES HAVE BEEN ALTERED:{" "}
        </span>
        <hr className="comparison-content-divider"></hr>
        <label>Song values:</label>

        {Object.keys(combinedData.songChanges).map((element) => (
          <div className="comparison-content" key={element}>
            ❖ {element} :: {combinedData.songChanges[element].oldData} »»{" "}
            {combinedData.songChanges[element].newData}
          </div>
        ))}
        <hr className="comparison-content-divider"></hr>
        <label>Artist values:</label>
        {Object.keys(combinedData.artistChanges).map((element) => (
          <div className="comparison-content" key={element}>
            ❖ {element} :: {combinedData.artistChanges[element].oldData} »»{" "}
            {combinedData.artistChanges[element].newData}
          </div>
        ))}
      </div>
      <div>
        <DashboardButton
          type="submit"
          value="Confirm"
          variant="utility"
          onClick={() => handleConfirm()}
        />
      </div>
    </div>
  );
};

export default Comparison;
