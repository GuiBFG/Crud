import React from "react";
import { Api } from "../../api/api";
import "../../assets/css/DeleteModal.css";

const DeleteModal = (props) => {

    const Delete = (id) => {
        Api.delete(`email/${id}`).then(() => window.location.reload());
    };

    return (
        <>
            <div className={"DeleteModal " + props.mostrarDelete}>
                <div className="position-modal-delete">
                </div>

                <div className="delete-records">
                    <h1>Deseja Deletar o Registro?</h1>

                    <div className="position-btn-modal">
                        <button className="btn-close-modal" onClick={props.funcaoDelete}>Não</button>
                        <button className="btn-delete" onClick={() => Delete(props.id)}>Sim</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModal