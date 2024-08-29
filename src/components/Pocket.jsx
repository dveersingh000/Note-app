import React, { useEffect, useState } from "react";
import NewGroup from "./NewGroup";
import "./Pocket.css"; // Import the CSS file

const Pocket = (props) => {
  const [noteGroups, setNoteGroups] = useState([]);
  const [selectNote, setSelectNote] = useState("");

  useEffect(() => {
    const allGroups = JSON.parse(localStorage.getItem("pocketGroup")) || [];
    setNoteGroups(allGroups);
  }, []);

  const setNote = (name) => {
    setSelectNote(name);
    props.onSubmitApp(name);
  };

  return (
    <div
      className={`pocket-container ${
        props.isActive ? "pocket-container-lg-active" : "pocket-container-lg-inactive"
      }`}
    >
      <div className="pocket-title">
        <h1 className="pocket-title-text">Pocket Notes</h1>
      </div>
      <NewGroup newGroup={setNoteGroups} />
      <div className="new-group-container" id="notes">
        {noteGroups.length !== 0 ? (
          ""
        ) : (
          <div className="empty-group-message">
            
            <h2 className="empty-group-heading">Add new note group</h2>
            <p className="empty-group-subtext">
              No groups available. Click on the create <br />
              button to add a new group
            </p>
          </div>
        )}
        {noteGroups.map((group, index) => (
          <div
            className={`note-group ${
              selectNote === group[1] ? "note-group-selected" : ""
            }`}
            key={index}
            onClick={() => {
              setNote(group[1]);
              props.setActiveIndex(1);
            }}
          >
            <div
              className="note-icon"
              style={{ backgroundColor: group[2] }}
            >
              {group[0]}
            </div>
            <div className="note-text">{group[1]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pocket;
