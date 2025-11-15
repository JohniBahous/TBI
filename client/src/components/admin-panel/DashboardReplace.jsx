import React, { useState, useEffect } from "react";
import "../../style/admin-panel/dashboard-replace.css";
import SongFormField from "./SongFormField.jsx";
import ArtistFormField from "./ArtistFormField.jsx";
import Comparison from "./Comparison.jsx";
import Modal from "../main-view/Modal.jsx";
import "../../style/admin-panel/dashboard-update.css";
import {
  getAllSongs,
  getAllArtists,
  getArtistById,
  getSongById,
} from "../../utils/api.js";
import { DashboardButton } from "./index.js";

const DashboardReplace = () => {
  const [artists, setArtists] = useState([]);
  const [artist, setArtist] = useState([]);
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState({});
  const [selectedId, setSelectedId] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSongOpen, setIsSongOpen] = useState(false);
  const [isArtistOpen, setIsArtistOpen] = useState(false);
  const [alteredArtistData, setAlteredArtistData] = useState(null);
  const [alteredSongData, setAlteredSongData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const originalPayload = { artist, song };
  const alteredPayload = { alteredArtistData, alteredSongData };
  useEffect(() => {
    const fetchData = async () => {
      const [artistData, songData] = await Promise.all([
        getAllArtists(),
        getAllSongs(),
      ]);
      setArtists(artistData);
      setSongs(songData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedId) return;
        const artistData = await getArtistById(selectedId[0]);
        setArtist(artistData);
        const songData = await getSongById(selectedId[1]);
        setSong(songData);
      } catch (err) {
        console.error("Error fetching song:", err);
      }
    };
    fetchData();
  }, [selectedId]);

  useEffect(() => {
    if (alteredSongData != null) {
      setIsSongOpen(false);
      setIsArtistOpen(true);
    }
  }, [alteredSongData]);

  useEffect(() => {
    if (alteredArtistData) {
      setIsArtistOpen(false);
      setShowModal(true);
    }
  }, [alteredArtistData]);

  return (
    <div>
      <div className="dashboard-update-select-container">
        <div className="dashboard-update-select-item">
          <label>Pick an artist + song to replace</label>
        </div>
        <div className="dashboard-update-select-item">
          <select
            className="dashboard-update-select"
            name="updateSelect"
            id="updateSelect"
            defaultValue=""
            disabled={isDisabled}
            onChange={(e) => setSelectedId(JSON.parse(e.target.value))}
          >
            <option value="" disabled hidden>
              ❖ X :: ARTIST »» SONG
            </option>
            {artists.map((artist, index) => {
              const i = index + 1;
              const song = songs.find((a) => a.artistUuid === artist.uuid);
              return (
                <option
                  key={artist.uuid}
                  value={JSON.stringify([artist.uuid, song.uuid])}
                >
                  ❖ {i} :: {artist.stageName} »» {song.title}
                </option>
              );
            })}
          </select>
        </div>

        <DashboardButton
          type="button"
          value="Pick"
          variant="utility"
          onClick={() => {
            setIsDisabled(true);
            setIsSongOpen(true);
          }}
        />
      </div>
      <div>
        {isSongOpen && <SongFormField setter={setAlteredSongData} />}
        {isArtistOpen && <ArtistFormField setter={setAlteredArtistData} />}
        {showModal && (
          <Modal
            closeModal={setShowModal}
            state={showModal}
            variant="admin"
            modalComp={
              <Comparison
                source="replace"
                modalStateSetter={setShowModal}
                selectedId={selectedId}
                oldData={originalPayload}
                newData={alteredPayload}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

export default DashboardReplace;
