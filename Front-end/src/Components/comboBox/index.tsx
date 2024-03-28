import * as React from "react";
import styles from "./styles.module.css";
import { GenericCombo } from "../modal/modalServico";

type Props = {
  data: GenericCombo[];
  label: string;
  stateToGetId: React.Dispatch<React.SetStateAction<string>>;
  currentValue?: string | boolean;
};

export default function ComboBox(props: Props) {
  const [chooseData, setChooseData] = React.useState<string>("");

  return (
    <div className={styles.container}>
      <label>{props.label}</label>
      <select
        value={props.data.find((item) => item.id === props.currentValue)?.id}
        onChange={(e) => {
          props.stateToGetId(e.target.value);
        }}
      >
        <option selected disabled hidden>
          Choose
        </option>
        {props.data &&
          props.data.map((itemIterator, index) => (
            <option key={index} value={itemIterator.id}>
              {itemIterator.nome}
            </option>
          ))}
      </select>
    </div>
  );
}
