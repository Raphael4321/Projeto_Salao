import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import UserAvatar from "../user_avatar";
import { useRouter } from "next/router";
import { userService } from "@/Modules/user/service";

type UserType = {
  nome: string;
  email: string;
};

export default function Userinfo() {
  const [userInfo, setUserInfo] = React.useState<UserType>();
  const router = useRouter();

  const getUserById = async () => {
    const currentUserId = sessionStorage.getItem("user_id");
    if (currentUserId) {
      const UserInf = await userService.findUserById(currentUserId);
      setUserInfo(UserInf);
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <div className={styles.containerUserInfo}>
      <UserAvatar photo={""} />
      <p className={styles.name}>
        {userInfo?.nome}
        {userInfo && userInfo.nome ? userInfo.nome : ""}
      </p>

      <p className={styles.email}>
        {userInfo?.email}
        {userInfo && userInfo.email ? userInfo.email : ""}
      </p>

      <p className={styles.sair} onClick={handleLogout}>
        sair
      </p>
    </div>
  );
}
