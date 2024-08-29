import React, { useEffect, useState } from "react";
import Img from "/images/notes.png";
import arrow from "/images/Vector.png";
import leftarrow from "/images/leftarrow.png";
import lock from "/images/lock.png";
import "./NoteBox.css";


const NoteSection = ({ noteGroup, selected, onBack }) => {
  const [myNote, setMyNote] = useState([]);
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(selected)) || [];
    setMyNote(storedNotes);
  }, [selected]);

  const submitNote = async (event) => {
    event.preventDefault();

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    let hours = today.getHours();
    let minutes = today.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    const Note = [formattedTime, formattedDate, allNotes];

    const existingGroups = JSON.parse(localStorage.getItem(selected)) || [];

    if (existingGroups.length === 0) {
      localStorage.setItem(selected, JSON.stringify([Note]));
    } else {
      localStorage.setItem(selected, JSON.stringify([...existingGroups, Note]));
    }

    const updatedMyNote = JSON.parse(localStorage.getItem(selected)) || [];
    setMyNote(updatedMyNote);
    setAllNotes("");
  };

  return (
    <>
      <div className={`note-section-header ${noteGroup ? "note-section-header-lg" : ""}`}>
        <img src={leftarrow} alt="" className="note-icon-lg" onClick={onBack}></img>
        <div className="note-icon-circle" style={{ backgroundColor: noteGroup[2] }}>
          {noteGroup[0]}
        </div>
        <div className="note-title">{noteGroup[1]}</div>
      </div>
      <div className={`note-list-section ${noteGroup ? "note-list-section-lg" : ""}`}>
        {[...myNote].map((note, index) => (
          <div className="note-entry" key={index}>
            <div className="note-time">
              {note[0]} <br/> {note[1]}
            </div>
            <div className="note-content"> {note[2]}</div>
          </div>
        ))}
      </div>

      <form onSubmit={submitNote} className={`note-form ${noteGroup ? "note-form-lg" : ""}`}>
        <textarea
          required
          className="note-textarea"
          name="note" 
          id="note"
          type="submit"
          onKeyDown={(e) => {
            if (e.keyCode === 'Enter') {
              console.log('enter');
              submitNote(e);
            }
          }}
          onChange={(event) => {
            setAllNotes(event.target.value);
          }}
          value={allNotes}
          placeholder="Enter your text here..........."
        ></textarea>
        <button className="note-button note-button-lg"> 
          <img src={arrow} alt="error" />
        </button>
      </form>
      <div className={`footer ${noteGroup ? "footer-lg" : ""}`}></div>
    </>
  );
};

const NoteBox = (props, setActiveIndex) => {
  const [noteGroup, setNoteGroup] = useState(null);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(props.selected);
    if (props.selected) { 
      const pocketGroups = JSON.parse(localStorage.getItem("pocketGroup")) || [];
      const matchingGroup = pocketGroups.find(
        (group) => group[1] === props.selected
      );
      setNoteGroup(matchingGroup);
    }
  }, [props.selected]);

  return (
    <div
      className={`note-box-container ${props.isActive ? "lg:block" : "lg:hidden"}`}
      style={{ height: !noteGroup ? "100%" : "90vh" }}
      id="hide"
    >
      {!noteGroup ? (
        <div className="flex items-center justify-center flex-col">
          <img src={Img} alt="Pocket Notes" className="w-[40%] mt-[20vh]" />
          <h2 className="text-[50px] font-medium my-[10px] text-center">Pocket Notes</h2>
          <p className="w-max text-center text-[18px] font-[400]">
             Send and receive messages without keeping your phone online. <br />
             Use Pocket Notes on up to 4 linked devices and 1 mobile phone
          </p>
          <div className="fixed bottom-[10px] flex flex-row items-center gap-2 lg:hidden"> 
            <img src={lock} alt="error" /> 
            <p>end-to-end encrypted</p>
          </div>
        </div>
      ) : (
        <NoteSection noteGroup={noteGroup} selected={selected || ""} onBack={() => setActiveIndex(0)} />
      )}
    </div>
  );
};

export default NoteBox;
