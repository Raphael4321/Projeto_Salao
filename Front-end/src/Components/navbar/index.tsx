import * as React from "react";
import styles from "./styles.module.css";
import Button from "../button";
import { useDispatch, useSelector } from "react-redux";
import { getLayoutDisposition, setLayoutState } from "@/Redux/dataSlice";

export default function Navbar() {
  const currentLayoutState: any = useSelector(getLayoutDisposition);
  const dispatch = useDispatch();

  const handleChangeLayout = (val: boolean) => {
    dispatch(setLayoutState(val));
  };

  const handleChangeLayoutCard = () => {
    handleChangeLayout(false);
  };

  const handleChangeLayoutTable = () => {
    handleChangeLayout(true);
  };

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.buttonWrapper}>
        <Button
          onClick={handleChangeLayoutTable}
          backgroundcolor={"#081225"}
          padding={[8, 50, 8, 50]}
          borderRadius
          color="#B5C2CA"
          fontsize={19}
          fontWeight={500}
        >
          Tabela
        </Button>
        <Button
          onClick={handleChangeLayoutCard}
          backgroundcolor={"#081225"}
          padding={[8, 50, 8, 50]}
          borderRadius
          color="#B5C2CA"
          fontsize={19}
          fontWeight={500}
        >
          Blocos
        </Button>
      </div>
    </div>
  );
}
