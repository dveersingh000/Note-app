import "./App.css";
import notes from "./images/notes.png";
import lock from "./images/lock.png";

import PopupForm from './components/PopupForm';
import React, { useState, useEffect } from 'react';

function App() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notesList, setNotesList] = useState([]);
  const [showNoteForm, setShowNoteForm] = useState(false);

  useEffect(() => {
    // Load groups and notes from local storage
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setGroups(savedGroups);
    setNotesList(savedNotes);
  }, []);

  useEffect(() => {
    // Save groups and notes to local storage
    localStorage.setItem('groups', JSON.stringify(groups));
    localStorage.setItem('notes', JSON.stringify(notesList));
  }, [groups, notesList]);

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);

  const addGroup = (groupName, color) => {
    const initials = groupName.split(' ').map(word => word[0]).join('').toUpperCase(); // Extract initials
    setGroups([...groups, { name: groupName, color, initials }]);
    closePopup();
  };

  const selectGroup = (group) => {
    setSelectedGroup(group);
    setNotesList(notesList.filter(note => note.group === group.name));
  };

  const addNote = (content) => {
    if (selectedGroup && content.trim()) {
      const newNote = {
        content,
        group: selectedGroup.name,
        dateCreated: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
      setNotesList([...notesList, newNote]);
      setShowNoteForm(false);
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h3>Pocket Notes</h3>
        {groups.map((group, index) => (
          <div
            key={index}
            className="group-icon"
            style={{ backgroundColor: group.color }}
            onClick={() => selectGroup(group)}
          >
            {group.initials}
          </div>
        ))}
        <button className="btn" onClick={openPopup}>+</button>
        
        {isPopupVisible && (
          <PopupForm onClose={closePopup} onAddGroup={addGroup}/>
        )}
      </div>
      <div className="container">
        
        {selectedGroup && (
          <div>
            <button onClick={() => setShowNoteForm(true)}>Add Note</button>
            {showNoteForm && <NoteForm onAddNote={addNote} onClose={() => setShowNoteForm(false)} />}
            <div className="notes-list">
              {notesList.map((note, index) => (
                <div key={index} className="note-item">
                  <p>{note.content}</p>
                  <small>Created: {new Date(note.dateCreated).toLocaleString()}</small>
                </div>
              ))}
            </div>
          </div>
        )}
        {!selectedGroup && (
          <div className="content">
            <div className="note">
              <img src={notes} alt="logo" className="main-image" />
              <h2>Pocket Notes</h2>
              <p>
                Send and receive messages without keeping your phone online.
                <br />
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
              <div className="footer">
                <img src={lock} alt="Lock Icon" className="lock-icon" />
                <p>end-to-end encrypted</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
