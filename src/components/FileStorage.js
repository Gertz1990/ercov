import React, { useState } from 'react';
import { motion } from 'framer-motion';

function FileStorage() {
  const [files, setFiles] = useState([]);
  const MAX_STORAGE_SIZE = 512 * 1024 * 1024; // 512 МБ в байтах
  const [totalSize, setTotalSize] = useState(0);

  // Обработчик загрузки файлов
  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    let newTotalSize = totalSize;

    uploadedFiles.forEach((file) => {
      if (newTotalSize + file.size > MAX_STORAGE_SIZE) {
        alert('Превышен лимит хранилища (512 МБ)');
        return;
      }

      newTotalSize += file.size;
      setFiles((prev) => [...prev, file]);
    });

    setTotalSize(newTotalSize);
  };

  // Удаление файла
  const handleDeleteFile = (index) => {
    const deletedFile = files[index];
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setTotalSize((prev) => prev - deletedFile.size);
  };

  return (
    <div className="file-storage-container">
      <h2>Хранилище файлов</h2>
      <p>Использовано: {(totalSize / (1024 * 1024)).toFixed(2)} МБ из 512 МБ</p>

      {/* Загрузка файлов */}
      <div className="file-upload">
        <label htmlFor="file-input" className="upload-button">
          Выберите файлы
        </label>
        <input
          id="file-input"
          type="file"
          multiple
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Список файлов */}
      <ul className="file-list">
        {files.map((file, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} МБ)
            <button onClick={() => handleDeleteFile(index)}>Удалить</button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default FileStorage;