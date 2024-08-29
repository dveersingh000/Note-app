import { createContext, useState, useEffect } from 'react';
import { notes as noteData } from '../data/notesData';

export const NoteContext = createContext(null);

export default function ContextProvider(props) {

    const [notes, setNotes] = useState(null);

    useEffect(() => {
        setNotes(noteData)
    }, []);
    const val = {
        notes,
    };

    return (
        <NoteContext.Provider value={val}>
            {props.children}
        </NoteContext.Provider>
    )
}