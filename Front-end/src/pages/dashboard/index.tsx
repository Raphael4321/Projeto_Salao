import * as React from "react";
import Sidebar from "@/Components/Sidebar";
import Styles from "./styles.module.css";
import Navbar from "@/Components/navbar";
import { useRouter } from "next/router";
import TableInfo, { typeTable } from "@/Components/tableInfo";
import Graphs from "@/Components/graphs";
import { SidebarType } from "@/Components/Sidebar";

export default function Dashboard() {
  const router = useRouter();

  React.useEffect(() => {
    const loggedInfo = sessionStorage.getItem("user_id");
    if (!loggedInfo) {
      router.push("/login");
    }
  }, []);

  return (
    <div className={Styles.containerPage}>
      <Sidebar title="Serviços" type={SidebarType.servico} />
      <div style={{ width: "100%" }}>
        <Navbar />
        <TableInfo type={typeTable.servico} />
        <Graphs />
      </div>
    </div>
  );
}
