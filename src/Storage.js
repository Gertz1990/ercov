import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function Storage({ onLogout }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Загрузка заметок из localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  // Сохранение заметок в localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Добавление новой заметки
  const handleAddNote = () => {
    if (newNote.trim()) {
      if (editingIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editingIndex] = newNote;
        setNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        setNotes((prev) => [...prev, newNote]);
      }
      setNewNote('');
    } else {
      alert('Введите текст заметки');
    }
  };

  // Удаление заметки
  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Редактирование заметки
  const handleEditNote = (index) => {
    setNewNote(notes[index]);
    setEditingIndex(index);
  };

  return (
    <div className="storage-container">
      <h2>Мои заметки</h2>
      <button onClick={onLogout}>Выйти</button>

      {/* Форма для добавления/редактирования заметок */}
      <div className="note-form">
        <input
          type="text"
          placeholder={editingIndex !== null ? 'Редактировать заметку' : 'Добавить заметку'}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddNote}
        >
          {editingIndex !== null ? <FaEdit /> : <FaPlus />}
        </motion.button>
      </div>

      {/* Список заметок */}
      <ul className="note-list">
        {notes.map((note, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {note}{' '}
            <div>
              <button onClick={() => handleEditNote(index)}>
                <FaEdit />
              </button>
              <button onClick={() => handleDeleteNote(index)}>
                <FaTrash />
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default Storage;