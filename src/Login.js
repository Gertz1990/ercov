import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Простые учетные данные для тестирования
  const validCredentials = {
    username: 'user',
    password: 'password',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === validCredentials.username && password === validCredentials.password) {
      alert('Вход выполнен успешно!');
      onLogin(); // Уведомляем родительский компонент об успешной авторизации
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <div className="login-container">
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;