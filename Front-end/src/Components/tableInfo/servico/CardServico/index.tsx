import React, { useState } from "react";
import styles from "./styles.module.css";
import ModalServico from "@/Components/modal/modalServico";

type Props = {
  data: ServicoReturnedType[];
  atualizar: () => void;
};

function CardServico(props: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ServicoReturnedType>();

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

  return (
    <>
      {showModal && (
        <ModalServico
          setIsOpen={setShowModal}
          data={selectedItem}
          isEditing={true}
          atualizar={props.atualizar}
        />
      )}
      <div className={styles.wrapper}>
        {props.data.map((itemIterator, index) => {
          return (
            <div
              key={index}
              className={styles.card}
              onClick={() => {
                setShowModal(true);
                setSelectedItem(itemIterator);
              }}
            >
              <div className={styles.cardContent}>
                <h2 className={styles.title}>{itemIterator.nome}</h2>
                <p className={styles.paragraph}>
                  Descrição: {itemIterator.descricao ?? "..."}
                </p>
                <p className={styles.paragraph}>
                  Funcionário: {itemIterator.funcionario?.nome}
                </p>
                <p className={styles.paragraph}>
                  Cliente: {itemIterator.cliente?.nome}
                </p>
                <p className={styles.paragraph}>
                  Status: {renderStatus(itemIterator.status)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CardServico;
