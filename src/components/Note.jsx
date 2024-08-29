
// import "./App.css";
import img1 from ".././assets/img1.png";
import lock_icon from "./assets/lock_icon.png";
import leftarrow from "./assets/leftarrow.png";
import Vector from "./assets/Vector.png";

import PopupForm from './PopupForm';
import React, { useEffect, useState } from 'react';

const NoteSection = ({ noteGroup, selected},onBack) => {
    const [myNote, setMyNote] = useState([]);
    const [allNotes, setAllNotes] = useState([]);
  
    useEffect(() => {
      const storedNotes = JSON.parse(localStorage.getItem(selected)) || [];
      setMyNote(storedNotes);
    }, [selected]);
  
    const submitNote = async (event) => {
      event.preventDefault();
//   const [isPopupVisible, setPopupVisible] = useState(false);
//   const [groups, setGroups] = useState([]);
//   const openPopup = () => setPopupVisible(true);
//   const closePopup = () => setPopupVisible(false);
//   const addGroup = (groupName, color) => {
//     const initials = groupName.split(' ').map(word => word[0]).join('').toUpperCase(); // Extract initials
//     setGroups([...groups, { name: groupName, color, initials }]);
//     closePopup();
//   };
//   const [count, setCount] = useState(0);

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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

  const Note = [formattedTime,formattedDate,allNotes];


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
      <div className="container2" >
        <img src={leftarrow} alt="" className="arrow" onClick={onBack}></img>
        <div className="first"style={{ backgroundColor: noteGroup[2] }} >
          {noteGroup[0]}
        </div>
        <div className="second">{noteGroup[1]}</div>
      </div>
      <div className="third">
        {[...myNote].map((note, index) => (
          <div className="forth" key={index}>
            <div className="fifth">
              {note[0]} <br/> {note[1]}
            </div>
            <div className="sixth"> {note[2]}</div>

          </div>
        ))}
      </div>

      <form onSubmit={submitNote} className="formSubmit">
        <textarea
          required
          className="input" 
          name="note" 
          id="note"
          type="submit"
          onKeyDown={(e)=>{
                if(e.keyCode === 'enter' ){
                  console.log('enter');
                  submitNote(e)
                }
          }}
          onChange={(event) => {
            setAllNotes(event.target.value);
        
          }}
          value={allNotes}
          placeholder="Enter your text here..........."
        ></textarea>
        <button className="submitText"> <img src={Vector}  className="image3" alt="error" /></button>
      </form>
      <div className="seventh">
    </div>
    </>
  );
};

const NoteBox = (props,setActiveIndex) => {
    const [noteGroup, setNoteGroup] = useState(null);
    const [selected, setSelected] = useState("");
   
    useEffect(() => {
      setSelected(props.selected);
      if (props.selected) { 
          const pocketGroups = 
          JSON.parse(localStorage.getItem("pocketGroup")) || [];
  
        const matchingGroup = pocketGroups.find(
          (group) => group[1] === props.selected
        );
        setNoteGroup(matchingGroup);
      }
    }, [props.selected]);

  return (
    // < className="app">
    //   <div className="sidebar">
    //     <h3>Pocket Notes</h3>
    //     {groups.map((group, index) => (
    //       <div key={index} className="group-icon" style={{ backgroundColor: group.color }}>
    //         {group.initials}
    //       </div>
    //     ))}
    //     <button className="btn" onClick={openPopup}>+</button>
        
    //     {isPopupVisible && (
    //     <PopupForm onClose={closePopup} onAddGroup={addGroup}/>
    //   )}
    //   </div>
      <div className="container">
        {!noteGroup ? (
            <div className="content">
        
            <img src={img1} alt="logo" className="main-image" />
            <h2>Pocket Notes</h2>
            <p>
              Send and receive messages without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
            <div className="footer">
                <img src={lock_icon} alt="Lock Icon" className="lock-icon" />
              <p>
                end-to-end encrypted
              </p>
              
            </div>
          </div>
        ) : (
            <NoteSection noteGroup={noteGroup} selected={selected || ""} onBack={()=>setActiveIndex(0)}  />
        )}

      </div>
    
  );
}

export default NoteBox;
