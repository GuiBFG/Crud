import React, { useEffect, useState } from "react";
import { Api } from "../../api/api";
import "../../assets/css/EditModal.css"

const EditModal = (props) => {
  const [userName, setUserName] = useState("");
  const [descricao, setDescricao] = useState("");
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState(false);

  const Edit = (id) => {
    if (userName !== "" && email !== "" && descricao !== "") {
      Api.put(`email/${id}`, {
        nome: userName,
        email: email,
        descricao: descricao,
      }).then(() => window.location.reload());
    }
    else {
      setWarning(true)
    }
  };

  useEffect(() => {
    if (props.item !== undefined) {

      setUserName(props.item.nome)
      setEmail(props.item.email)
      setDescricao(props.item.descricao)
    }
  }, [props.item])

  return (
    <main>
      <div className={"EditModal " + props.mostrar}>
        <div className="position-delete-modal">
          <button className="delete-modal" onClick={props.funcao}>
            X
          </button>
        </div>

        <div className="card-txt">
          <h1>Modificar Registros</h1>

          <div>
            <input
              type="text"
              placeholder="Nome completo"
              className="input-modal"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descrição"
              className="input-modal"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-modal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {warning && (
              <p><span className="warning">*</span>Coloque um campo válido nesse input!</p>
            )}
          </div>
            <div className="position-save-modal">
              <button className="btn-save-modal" onClick={() => Edit(props.id)}>Salvar</button>
            </div>
        </div>
      </div>
    </main>
  );
};

export default EditModal;