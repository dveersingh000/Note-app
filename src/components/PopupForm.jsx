import React, { useState } from 'react';
import './PopupForm.css';

const PopupForm = ({ onClose, onAddGroup }) => {
  const [groupName, setGroupName] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#AA7FFD'); // Default color

  const handleGroupNameChange = (e) => setGroupName(e.target.value);
  const handleColorSelect = (color) => setSelectedColor(color);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName) {
      onAddGroup(groupName, selectedColor);
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Group</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="groupName">Group Name</label>
            <input
              type="text"
              id="groupName"
              placeholder="Enter group name"
              value={groupName}
              onChange={handleGroupNameChange}
            />
          </div>

          <div className="form-group color-options">
            <label>Choose Color</label>
            {['#AA7FFD', '#FF6EC7', '#39F6FF', '#FF9662', '#0063FF', '#7C99FF'].map((color) => (
              <div
                key={color}
                className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>

          <button type="submit" className="create-btn">Create</button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
