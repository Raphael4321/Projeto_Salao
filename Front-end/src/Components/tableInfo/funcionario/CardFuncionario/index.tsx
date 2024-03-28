import React, { useState } from "react";
import styles from "./styles.module.css";
import ModalFuncionario from "@/Components/modal/modalFuncionario";
import Image from "next/image";

type Props = {
  data: UserType[];
  atualizar: () => void;
};

function CardFuncionario(props: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<UserType>();

  return (
    <>
      {showModal && (
        <ModalFuncionario
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
                  Email: {itemIterator.email ?? "..."}
                </p>
                <p className={styles.paragraph}>
                  Rua: {itemIterator.rua ?? "..."}
                </p>
                <p className={styles.paragraph}>
                  CEP: {itemIterator.cep ?? "..."}
                </p>
                <p className={styles.paragraph}>
                  Salário: {itemIterator.salario ?? "..."}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default CardFuncionario;
