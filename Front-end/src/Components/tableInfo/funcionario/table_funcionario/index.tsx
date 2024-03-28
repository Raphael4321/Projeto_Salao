import React, { useState } from "react";
import styles from "./styles.module.css";
import ModalFuncionario from "../../../modal/modalFuncionario";

type Props = {
  data: UserType[];
  atualizar: () => void;
};

export default function TableFuncionario(props: Props) {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<UserType>();

  const ShowModal = (val: boolean) => {
    setShowModal(val);
  };

  return (
    <>
      {showModal && (
        <ModalFuncionario setIsOpen={ShowModal}
        data={selectedItem}
        isEditing={true}
        atualizar={props.atualizar} />
      )}
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Rua</th>
              <th>Bairro</th>
              <th>CEP</th>
              <th>Salário</th>
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
                  <td>{itemIterator.email}</td>
                  <td>{itemIterator.rua}</td>
                  <td>{itemIterator.bairro}</td>
                  <td>{itemIterator.cep}</td>
                  <td>{itemIterator.salario}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
