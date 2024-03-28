import * as React from "react";
import styles from "./styles.module.css";
import Modal from "../../../modal/modalServico";

type Props = {
  data: ServicoReturnedType[];
  atualizar: () => void;
};

export default function TableServico(props: Props) {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<ServicoReturnedType>();

  const renderStatus = (val: number): string => {
    switch (val) {
      case 0:
        return "agendado";
      case 1:
        return "em atendimento";
      case 2:
        return "finalizado";
      case 3:
        return "cancelado";
      default:
        return "";
    }
  };
  
  const ShowModalFunc = (val: boolean) => {
    setShowModal(val);
  };

  return (
    <>
      {showModal && (
        <Modal
          setIsOpen={ShowModalFunc}
          data={selectedItem}
          isEditing={true}
          atualizar={props.atualizar}
        />
      )}
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Status</th>
              <th>Descrição</th>
              <th>Funcionário</th>
              <th>Cliente</th>
              <th>Ativo</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((itemIterator, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => {
                    setSelectedItem(itemIterator);
                    setShowModal(true);
                  }}
                >
                  <td>{itemIterator.nome}</td>
                  <td>{renderStatus(itemIterator.status)}</td>
                  <td>{itemIterator.descricao ?? "...."}</td>
                  <td>{itemIterator.funcionario?.nome}</td>
                  <td>{itemIterator.cliente?.nome}</td>
                  <td>
                    <span
                      className={
                        itemIterator.ativo ? styles.active : styles.inactive
                      }
                    ></span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
