import * as React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Input from "@/Components/input";
import Button from "@/Components/button";
import { authService } from "@/Modules/auth/service";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";

enum keyPressed {
  Enter = "Enter",
}

export default function Login() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const router = useRouter();

  const gettingValueEmail = (str: string) => {
    setEmail(str);
  };

  const gettingValuePassword = (str: string) => {
    setPassword(str);
  };

  React.useEffect(() => {
    const loggedInfo = sessionStorage.getItem("loggedin");
    if (loggedInfo === "true") {
      router.push("/dashboard");
    }
  }, []);

  const loginFunc = React.useCallback(async () => {
    const loginInfo = await authService.Login({
      email: email,
      senha: password,
    });

    if (loginInfo) {
      const decodeToken: TokenDecode = jwtDecode(loginInfo.token);
      sessionStorage.setItem("loggedin", "true");
      sessionStorage.setItem("email", loginInfo.email);
      sessionStorage.setItem("user_id", decodeToken.id);
      sessionStorage.setItem("token", loginInfo.token);
      router.push("/dashboard");
    }
  }, [email, password]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.containerLogin}>
        <h1 className={styles.titleService}>Painel de Controle</h1>
        <div className={styles.logo}>
          <Image
            src={"/logo.png"}
            alt="Logo do login"
            width={70}
            height={70}
          />
          <div className={styles.containerInputs}>
            <Input
              label="Email"
              value={email}
              onChange={gettingValueEmail}
              alt={"Input email"}
              width={450}
              placeholder="ex: fulano@hotmail.com"
            />
            <Input
              label="Senha"
              value={password}
              onChange={gettingValuePassword}
              alt={"Input password"}
              width={450}
              type="password"
              customStyle={{ marginTop: "2rem" }}
            />
          </div>
          <div className={styles.containerBtnForgetPass}>
            <Button
              onClick={loginFunc}
              backgroundcolor="#081225"
              padding={[13, 75, 13, 75]}
              borderRadius
              color="#B5C2CA"
              fontsize={19}
              fontWeight={500}
            >
              Login
            </Button>
            <p className={styles.forgetpass}>Esqueceu sua senha?</p>
          </div>
        </div>
      </div>
    </div>
  );
}
