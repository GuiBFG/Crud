import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {Api} from "../api/api";
import "../assets/css/register.css";

const Register = () => {
  const [, setGetEmail] = useState([]);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [descricao, setDescricao] = useState("");

  const ListAPI = () => {
    Api.get("email").then((result) => {
      setGetEmail(result.data);
    });
  };

  useEffect(() => {
    ListAPI();
  }, []);

  const Registration = () => {
    if (userName !== "" && email !== "" && descricao !== "") {
      Api.post("email", {
        nome: userName,
        email: email,
        descricao: descricao,
      }).then(() => window.location.reload());
      navigate("/records");
    } else {
      Swal.fire({
        title: "Preencha os campos vazios!",
        icon: "warning",
        confirmButtonColor: "#41B8D2",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <header>
        <div>
          <h1>SyncTur</h1>
        </div>
        <div className="nav-registro">
          <nav>
            <a href="records">Registro</a>
          </nav>
        </div>
      </header>
      <main>
        <section>
          <div className="container">
            <div>
              <h2>Nome Completo</h2>
              <input
                className="input-name"
                type="text"
                placeholder="Digite seu nome completo"
                maxLength={48}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="div-email">
              <h2>Email</h2>
              <input
                className="input-email"
                type="text"
                placeholder="Digite seu Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="div-description">
            <h2>Descrição</h2>
            <textarea
              name="descrição"
              id="descricao"
              maxLength={128}
              placeholder="Escreva aqui a sua mensagem"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}></textarea>
          </div>
        </section>
        <div>
          <button className="btn-register" onClick={() => Registration()}>
            Cadastrar
          </button>
        </div>
      </main>
    </>
  );
};

export default Register;