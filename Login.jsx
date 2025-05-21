// src/Login.jsx
import React, { useState } from 'react';
import { registerUser, loginUser } from './authService'; // ajuste o caminho se estiver em outra pasta

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [modoCadastro, setModoCadastro] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoCadastro) {
        await registerUser(email, senha);
        alert('Cadastro realizado com sucesso!');
      } else {
        await loginUser(email, senha);
        alert('Login realizado com sucesso!');
      }
    } catch (error) {
      alert('Erro: ' + error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>{modoCadastro ? 'Cadastrar' : 'Entrar'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%' }}>
          {modoCadastro ? 'Cadastrar' : 'Entrar'}
        </button>
      </form>
      <p
        onClick={() => setModoCadastro(!modoCadastro)}
        style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}
      >
        {modoCadastro ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastrar'}
      </p>
    </div>
  );
}
