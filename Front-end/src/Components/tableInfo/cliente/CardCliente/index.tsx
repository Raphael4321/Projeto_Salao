import React, { useState } from "react";
import styles from "./styles.module.css";
import ModalCliente from "@/Components/modal/modalCliente";
import Image from "next/image";

type Props = {
  data: ClientType[];
  atualizar: () => void;
};

function CardCliente(props: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ClientType>();

  return (
    <>
      {showModal && (
        <ModalCliente
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
              <div className={styles.cardContainer}>
                <div className={styles.imageContainer}>
                  <Image
                    src={
                      itemIterator.foto
                        ? `${itemIterator.foto}`
                        : "/default.png"
                    }
                    alt={"example"}
                    width={50}
                    height={50}
                    className={styles.image}
                  />
                </div>
                <h2 className={styles.title}>{itemIterator.nome}</h2>
                <p className={styles.paragraph}>
                  {itemIterator.email ?? "Email não disponível"}
                </p>
                <p className={styles.paragraph}>
                  {new Date(itemIterator.dataNascimento).toLocaleDateString()}
                </p>
                <p className={styles.status}>
                  <span
                    className={
                      itemIterator.ativo ? styles.active : styles.inactive
                    }
                  ></span>
                  {itemIterator.ativo ? "Ativo" : "Inativo"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CardCliente;
