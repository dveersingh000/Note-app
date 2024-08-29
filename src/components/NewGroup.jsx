import React, { useState } from "react";
import './NewGroup.css'; // Import the new CSS file

const NewGroup = (props) => {
	const colorOptions = [
		{
			id: 1,
			value: "#0047ff",
		},
		{
			id: 2,
			value: "#b38bfa",
		},
		{
			id: 3,
			value: "#ff79f2",
		},
		{
			id: 4,
			value: "#43e6fc",
		},
		{
			id: 5,
			value: "#f19576",
		},
		{
			id: 6,
			value: "#6691ff",
		},
	];

	const [selectedColor, setSelectedColor] = useState("#0047ff");
	const [group, setGroup] = useState(false);
	const [name, setName] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleColorChange = (colorValue) => {
		setSelectedColor(colorValue);
	};

	const addGroup = async (event) => {
		event.preventDefault();

		if (name && selectedColor) {
			const words = name.split(" ");

			const firstLetterFirstWord = words[0] ? words[0][0] : "";

			const lastWordIndex = words.length - 1;
			const firstLetterLastWord = words[lastWordIndex]
				? words[lastWordIndex][0]
				: "";
			let logoName = "";
			if (lastWordIndex > 0) {
				logoName = (firstLetterFirstWord + firstLetterLastWord).toUpperCase();
			} else {
				logoName = firstLetterFirstWord.toUpperCase();
			}

			const newGroup = [logoName, name, selectedColor];
			const existingGroups =
				JSON.parse(localStorage.getItem("pocketGroup")) || [];

			const nameExists = existingGroups.some((group) => group[1] === name);

			if (nameExists) {
				setErrorMessage("Group with this name already exists!");
			} else {
				if (existingGroups.length === 0) {
					localStorage.setItem("pocketGroup", JSON.stringify([newGroup]));
				} else {
					localStorage.setItem(
						"pocketGroup",
						JSON.stringify([...existingGroups, newGroup])
					);
				}
				const newNoteGroups =
					JSON.parse(localStorage.getItem("pocketGroup")) || [];
				props.newGroup(newNoteGroups);
				setErrorMessage("");
				setName("");
				setGroup(false);
			}
		}
	};

	return (
		<>
			<div
				className="create-group-button"
				onClick={() => (group ? setGroup(false) : setGroup(true))}
			>
				+ Create Notes group
			</div>
			
			{group ? (
				<div className="modal-overlay">
					<div className="modal-container">
						<h2 className="modal-title">Create New group</h2>
						<form onSubmit={addGroup}>
							<div className="input-container">
								<div className="input-label">Group Name</div>
								<input
									type="text"
									value={name}
									onChange={(event) => {
										setName(event.target.value);
									}}
									required
									placeholder="Enter group name"
									className="input-field"
								/>
								<p className="error-message">{errorMessage}</p>
							</div>
							
							<div className="color-picker-container">
								<div className="color-label">Choose colour</div>
								<div className="color-options">
									{colorOptions.map((color) => (
										<div key={color.id}>
											<input
											    className="color-option-input"
												type="radio"
												id={color.id}
												name="fav_color"
												value={color.value}
												checked={selectedColor === color.value}
												onChange={() => handleColorChange(color.value)}
											/>
											<label
												htmlFor={color.id}
												className="color-option-label"
												style={{
													backgroundColor: color.value,
													border: selectedColor === color.value ? "3px solid black" : "",
												}}
											>
												{selectedColor === color.value ? "✓" : ""}
											</label>
										</div>
									))}
								</div>
							</div>
							
							<button type="submit" className="create-button">
								Create
							</button>
						</form>
						<button
							onClick={() => setGroup(false)}
							className="close-button"
						>
							×
						</button>
					</div>
				</div>
			) : null}
		</>
	);
};

export default NewGroup;
