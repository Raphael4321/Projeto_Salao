import * as React from "react";
import styles from "./styles.module.css";
import Button from "@/Components/button";

const RenderContent = ({
  openModal,
  handleAdd,
  data,
  atualizar,
  currentLayoutState,
  title,
  buttonText,
  ModalComponent,
  TableComponent,
  CardComponent,
}: {
  openModal: Boolean;
  handleAdd: (isOpen: Boolean) => void;
  data: any[];
  atualizar: () => void;
  currentLayoutState: boolean;
  title: string;
  buttonText: string;
  ModalComponent: React.ComponentType<any>;
  TableComponent: React.ComponentType<any>;
  CardComponent: React.ComponentType<any>;
}) => (
  <>
    {openModal ? (
      <ModalComponent setIsOpen={handleAdd} atualizar={atualizar} />
    ) : null}
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <p className={styles.title}>{title}</p>
          <p>{data.length} Cadastrados</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => handleAdd(true)}
            backgroundcolor="#081225"
            padding={[8, 50, 8, 50]}
            borderRadius
            color="#B5C2CA"
            fontsize={19}
            fontWeight={500}
          >
            {buttonText}
          </Button>
        </div>
      </div>
      {currentLayoutState ? (
        <TableComponent data={data} atualizar={atualizar} />
      ) : (
        <CardComponent data={data} atualizar={atualizar} />
      )}
    </div>
  </>
);

export default RenderContent;
