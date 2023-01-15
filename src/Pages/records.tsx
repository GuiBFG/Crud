import React, {useState, useEffect} from "react";
import "../assets/css/records.css";
import {useNavigate} from "react-router-dom";
import {Api} from "../api/api";
import EditModal from "../components/modal/EditModal";
import DeleteModal from "../components/modal/DeleteModal";

export const Records = () => {
  const navigate = useNavigate();
  const [getEmail, setGetEmail] = useState([]);
  const [modalEdit, setModalEdit] = useState("hide");
  const [modalDelete, setModalDelete] = useState("hide");
  const [getId, setGetId] = useState(0);
  const [item, setItem] = useState();

  const BackButton = () => {
    navigate("/");
  };

  // Listar dados da API
  const ListarAPI = () => {
    Api.get("email").then((result) => {
      setGetEmail(result.data);
    });
  };

  useEffect(() => {
    ListarAPI();
  }, []);

  // Excluir informações

  // Mostrar Modal
  const ShowModalEdit = (estadoAtual: string, id: number, item: any) => {
    if (estadoAtual === "hide") {
      setModalEdit("show");
    } else {
      setModalEdit("hide");
    }

    setItem(item);
    setGetId(id);
    window.scroll({top: 0, left: 0, behavior: "smooth"});
  };

  const ShowModalDelete = (estadoAtual: string, id: number) => {
    if (estadoAtual === "hide") {
      setModalDelete("show");
    } else {
      setModalDelete("hide");
    }

    setGetId(id);
    window.scroll({top: 0, left: 0, behavior: "smooth"});
  };

  return (
    <>
      <header>
        <div>
          <h1>SyncTur</h1>
        </div>
        <div>
          <div className="seta" onClick={() => BackButton()}></div>
        </div>
      </header>
      <main>
        <h2>Registros</h2>
        <EditModal
          item={item}
          mostrar={modalEdit}
          funcao={ShowModalEdit}
          id={getId}
        />
        <DeleteModal
          mostrarDelete={modalDelete}
          funcaoDelete={ShowModalDelete}
          id={getId}
        />
        {getEmail.map((item: any) => {
          return (
            <div className="card-records" key={item.id}>
              <div className="card-position">
                <p className="card-name">{item.nome}</p>
                <p className="card-description">{item.descricao}</p>
                <p className="card-email">Email: {item.email}</p>
                <div className="btn-position">
                  <button
                    className="edit-btn"
                    onClick={() => ShowModalEdit(modalEdit, item.id, item)}>
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => ShowModalDelete(modalDelete, item.id)}>
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div className={"fundo_escurecido " + modalEdit}></div>
        <div className={"fundo_escurecido " + modalDelete}></div>
      </main>
    </>
  );
};
export default Records;
