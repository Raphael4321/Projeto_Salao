import React from "react";
import Button from "../button";
import Userinfo from "./components/user_info";
import styles from "./styles.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

export enum SidebarType {
  servico,
  funcionario,
  cliente,
}

type Props = {
  title: string;
  type: SidebarType;
};

export default function Sidebar(props: Props) {
  const [clicked, setClicked] = React.useState<boolean>(false);
  const router = useRouter();

  const navigateToInit = () => {
    router.push("/dashboard");
  };

  const navigateToFunc = () => {
    router.push("/dashboard/funcionario");
  };

  const navigateToClient = () => {
    router.push("/dashboard/cliente");
  };

  return (
    <div className={styles.containerSidebar}>
      <div className={styles.containerLogoTitle}>
        <Image src="/logo.png" alt="logo do login" width={50} height={50} />
        <p className={styles.title}>{props.title}</p>
      </div>
      <div className={styles.ContainerLinks}>
        <Button
          onClick={() => {
            navigateToInit();
          }}
          backgroundcolor={props.type === SidebarType.servico ? "#081225" : ""}
          padding={[8, 75, 8, 75]}
          borderRadius
          color={props.type === SidebarType.servico ? "#B5C2CA" : ""}
          fontsize={19}
          fontWeight={500}
        >
          Inicio
        </Button>
        <Button
          onClick={() => navigateToFunc()}
          backgroundcolor={
            props.type === SidebarType.funcionario ? "#081225" : ""
          }
          padding={[8, 75, 8, 75]}
          borderRadius
          color={props.type === SidebarType.funcionario ? "#B5C2CA" : ""}
          fontsize={19}
          fontWeight={500}
        >
          Funcionarios
        </Button>
        <Button
          onClick={() => navigateToClient()}
          backgroundcolor={props.type === SidebarType.cliente ? "#081225" : ""}
          padding={[8, 75, 8, 75]}
          borderRadius
          color={props.type === SidebarType.cliente ? "#B5C2CA" : ""}
          fontsize={19}
          fontWeight={500}
        >
          Clientes
        </Button>
      </div>
      <div className={styles.containerUser}>
        <Userinfo />
      </div>
    </div>
  );
}
