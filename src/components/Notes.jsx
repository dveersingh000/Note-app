import React from "react";
import { useState } from "react";
import Vector from "../assets/Vector.png";
import img1 from "../assets/img1.png";
import PopupForm from "./PopupForm";
import "./Notes.css";

const Notes = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [groups, setGroups] = useState([]);
  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);
  const addGroup = (groupName, color) => {
    const initials = groupName
      .split(" ")
      .map((word) => word[0])
      .join(""); // Extract initials
    setGroups([...groups, { name: groupName, color, initials }]);
    closePopup();
  };
  return (
    <div className="notes">
      <div className="sidebar">
        <h3>Pocket Notes</h3>
        {groups.map((group, index) => (
          <div
            key={index}
            className="group-icon"
            style={{ backgroundColor: group.color }}
          >
            {group.initials}
          </div>
        ))}
        <button className="btn" onClick={openPopup}>
          +
        </button>
        {isPopupVisible && (
          <PopupForm onClose={closePopup} onAddGroup={addGroup} />
        )}
      </div>
      <div className="container">
        <div className="content">
          <img src={img1} alt="logo" className="main-image" />
          <h2>Pocket Notes</h2>
          <p>
            Send and receive messages without keeping your phone online.
            <br />
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone
          </p>
        </div>
        <div className="footer">
          <p>
            <img src={Vector} alt="Lock Icon" className="lock-icon" />
            end-to-end encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notes;
