import Button from "../button";
import Userinfo from "./components/user_info";
import styles from "./styles.module.css";
import Image from "next/image";

type Props = {
  title: string;
};

export default function Sidebar(props: Props) {
  return (
    <div className={styles.containerSidebar}>
      <div className={styles.containerLogoTitle}>
        <Image src="/logo.jpeg" alt="logo do login" width={40} height={40} />
        <p className={styles.title}>{props.title}</p>
      </div>
      <div className={styles.ContainerLinks}>
        <Button
          onClick={() => console.log("redirect")}
          backgroundcolor="#081225"
          padding={[8, 75, 8, 75]}
          borderRadius
          color="#B5C2CA"
          fontsize={19}
          fontWeight={500}
        >
          Inicio
        </Button>
        <Button
          onClick={() => console.log("redirect")}
          padding={[8, 75, 8, 75]}
          borderRadius
          color="#081225"
          backgroundcolor="none"
          fontsize={19}
          fontWeight={500}
        >
          Funcionarios
        </Button>
        <Button
          onClick={() => console.log("redirect")}
          padding={[8, 75, 8, 75]}
          borderRadius
          color="#081225"
          backgroundcolor="none"
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
