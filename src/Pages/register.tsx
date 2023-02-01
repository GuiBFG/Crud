import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Api } from '../api/api';
import Botao from '../components/botao';
import '../assets/css/register.css';
import { messageErrors } from '../utils/messageErrors';

const Register = () => {
  const [, setGetEmail] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userDescricao, setUserDescricao] = useState('');
  const navigate = useNavigate();
  const { validateInputError } = messageErrors();

  const verifyIfFieldsAreWritten =
    userName !== '' && userEmail !== '' && userDescricao !== '';

  const listAPI = () => {
    Api.get('email').then(result => {
      setGetEmail(result.data);
    });
  };

  const registerNewUser = () => {
    try {
      Api.post('email', {
        nome: userName,
        email: userEmail,
        descricao: userDescricao,
      }).then(() => navigate('/records'));
    } catch (err) {
      console.log(err);
    }
  };

  const registration = () => {
    verifyIfFieldsAreWritten ? registerNewUser() : validateInputError();
  };

  useEffect(() => {
    listAPI();
  }, []);

  return (
    <>
      <header>
        <div>
          <h1>SyncTur</h1>
        </div>
        <div className='nav-registro'>
          <nav>
            <a href='records'>Registro</a>
          </nav>
        </div>
      </header>
      <main>
        <section>
          <div className='container'>
            <div>
              <h2>Nome Completo</h2>
              <input
                className='input-name'
                type='text'
                placeholder='Digite seu nome completo'
                maxLength={48}
                value={userName}
                onChange={e => setUserName(e.target.value)}
              />
            </div>
            <div className='div-email'>
              <h2>Email</h2>
              <input
                className='input-email'
                type='text'
                placeholder='Digite seu Email'
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='div-description'>
            <h2>Descrição</h2>
            <textarea
              name='descrição'
              id='descricao'
              maxLength={128}
              placeholder='Escreva aqui a sua mensagem'
              value={userDescricao}
              onChange={e => setUserDescricao(e.target.value)}
            ></textarea>
          </div>
        </section>
        <div>
          <Botao class={'btn-register'} action={() => registration()}>
            Cadastrar
          </Botao>
        </div>
      </main>
    </>
  );
};

export default Register;
