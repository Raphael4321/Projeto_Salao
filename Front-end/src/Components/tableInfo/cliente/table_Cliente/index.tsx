import * as React from "react";
import styles from "./styles.module.css";
import Modal from "../../../modal/modalCliente";

type Props = {
  data: ClientType[];
  atualizar: () => void;
};

export default function TableCliente(props: Props) {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<ClientType>();

  const ShowModal = (val: boolean) => {
    setShowModal(val);
  };

  return (
    <>
      {showModal && (
        <Modal
          setIsOpen={ShowModal}
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
              <th>Email</th>
              <th>Data de Nascimento</th>
              <th>Rua</th>
              <th>Bairro</th>
              <th>CEP</th>
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
                  <td>{itemIterator.email}</td>
                  <td>
                    {new Date(
                      new Date(itemIterator.dataNascimento).getTime() +
                        new Date().getTimezoneOffset() * 60 * 1000
                    ).toLocaleDateString()}
                  </td>

                  <td>{itemIterator.rua}</td>
                  <td>{itemIterator.bairro}</td>
                  <td>{itemIterator.cep}</td>
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
