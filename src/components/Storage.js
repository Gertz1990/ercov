import React, { useState, useEffect } from 'react';

function Storage({ onLogout }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes((prev) => [...prev, newNote]);
      setNewNote('');
    } else {
      alert('Введите текст заметки');
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="storage-container">
      <h2>Мои заметки</h2>
      <button onClick={onLogout}>Выйти</button>

      <div className="note-form">
        <input
          type="text"
          placeholder="Введите заметку"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={handleAddNote}>Добавить</button>
      </div>

      <ul className="note-list">
        {notes.map((note, index) => (
          <li key={index}>
            {note}{' '}
            <button onClick={() => handleDeleteNote(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Storage;