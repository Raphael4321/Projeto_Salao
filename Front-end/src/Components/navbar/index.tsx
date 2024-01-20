import * as React from "react";
import Input from "../input";
import styles from "./styles.module.css";
import Button from "../button";
import { useDispatch, useSelector } from "react-redux";
import { getLayoutDisposition, setLayoutState } from "@/Redux/dataSlice";

export default function Navbar() {
  const [search, setSearch] = React.useState<string>("");
  const currentLayoutState: any = useSelector(getLayoutDisposition);
  const dispatch = useDispatch();

  const handleChangeLayout = (val: boolean) => {
    dispatch(setLayoutState(val));
  };

  const handleChangeSearch = (str: string) => {
    setSearch(str);
  };

  const handleChangeLayoutCard = () => {
    handleChangeLayout(false);
  };

  const handleChangeLayoutTable = () => {
    handleChangeLayout(true);
  };

  return (
    <div className={styles.navbarWrapper}>
      <Input
        value={search}
        alt={"search"}
        onChange={handleChangeSearch}
        width={450}
        placeholder="ex: Search"
        labelWeight={700}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "30%",
        }}
      >
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
