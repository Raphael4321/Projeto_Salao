import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Input from "../input";
import { userService } from "@/Modules/user/service";
import ComboBox from "../comboBox";
import { clientService } from "@/Modules/cliente/service";
import Button from "../button";
import styles from "./style.module.css";
import { servicoService } from "@/Modules/service_module/service";

type Props = {
  setIsOpen: (param: boolean) => void;
  isEditing?: boolean;
  data?: ServicoReturnedType;
};

export interface GenericCombo {
  id: string;
  nome: string;
}

export interface ServicoType {
  ativo: boolean;
  cliente: string;
  funcionario: string;
  nome: string;
  status: number;
  valor: number;
  descricao: string;
  temposervico: number;
}

export default function Modal(props: Props) {
  const [name, setName] = useState<string>("");
  const [valor, setValor] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [tempoServico, setTempoServico] = useState<string>("");
  const [funcionarios, setFuncionarios] = useState<GenericCombo[]>([]);
  const [idFuncionarioToSend, setIdFuncionarioToSend] = useState<string>("");
  const [clientes, setClientes] = useState<GenericCombo[]>([]);
  const [idClienteToSend, setIdClienteToSend] = useState<string>("");
  const mockedDataStatus: GenericCombo[] = [
    { id: "0", nome: "agendado" },
    { id: "1", nome: "em atendimento" },
    { id: "2", nome: "finalizado" },
    { id: "3", nome: "cancelado" },
  ];
  const [statusId, setStatusId] = useState<string>("0");

  const onChange = (val: string) => {
    setName(val);
  };

  const onChangeValor = (val: string) => {
    setValor(val);
  };

  const onChangeDescricao = (val: string) => {
    setDescricao(val);
  };

  const onChangeTempoServico = (val: string) => {
    setTempoServico(val);
  };

  const getFuncionarios = async () => {
    try {
      const allData = await userService.findAll();

      let auxToSave: GenericCombo[] = [];

      if (allData) {
        allData.forEach((item) => {
          auxToSave.push({ id: item._id, nome: item.nome });
        });
        setFuncionarios(auxToSave);
      }
    } catch (error) {
      console.error("Error fetching funcionarios:", error);
    }
  };

  const getClientes = async () => {
    try {
      const allData = await clientService.findAll();

      let auxToSave: GenericCombo[] = [];

      if (allData) {
        allData.forEach((item) => {
          auxToSave.push({ id: item._id, nome: item.nome });
        });
        setClientes(auxToSave);
      }
    } catch (error) {
      console.error("Error fetching clientes:", error);
    }
  };

  React.useEffect(() => {
    if (props.isEditing && props.data) {
      getFuncionarios();
      getClientes();
      setName(props.data.nome);
      setValor(props.data.valor.toString());
      setDescricao(props.data.descricao ?? "...");
      setTempoServico(props.data.tempoServico?.toString()!);
      setIdFuncionarioToSend(props.data.funcionario._id);
      setIdClienteToSend(props.data.cliente._id);
      setStatusId(props.data.status.toString());
    } else {
      getFuncionarios();
      getClientes();
    }
  }, []);

  const clearData = () => {
    setName("");
    setValor("");
    setDescricao("");
    setTempoServico("");
    setFuncionarios([]);
    setIdFuncionarioToSend("");
    setStatusId("0");
  };

  const submitData = async () => {
    try {
      const mappingData: ServicoType = {
        ativo: true,
        cliente: idClienteToSend,
        funcionario: idFuncionarioToSend,
        nome: name,
        status: Number(statusId),
        valor: Number(valor),
        descricao: descricao,
        temposervico: Number(tempoServico),
      };

      const dataSaved = await servicoService.createServico(mappingData);

      if (dataSaved) {
        alert("Servico inserido");
      } else {
        alert("Servico não inserido, houve algum erro");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Ocorreu um erro ao salvar o serviço.");
    }
  };

  const submitUpdate = async () => {
    try {
      const mappingData: ServicoType = {
        ativo: true,
        cliente: idClienteToSend,
        funcionario: idFuncionarioToSend,
        nome: name,
        status: Number(statusId),
        valor: Number(valor),
        descricao: descricao,
        temposervico: Number(tempoServico),
      };

      const dataSaved = await servicoService.updateServico(props.data._id ,mappingData);

      if (dataSaved) {
        alert("Servico inserido");
      } else {
        alert("Servico não inserido, houve algum erro");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Ocorreu um erro ao salvar o serviço.");
    }
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => props.setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
            <button
              className={styles.closeBtn}
              onClick={() => props.setIsOpen(false)}
            >
              <IoMdClose style={{ marginBottom: "-3px" }} />
            </button>
          </div>
          <div className={styles.modalContent}>
            <div className={styles.wrappInputs}>
              <Input
                label="Nome"
                value={name}
                onChange={onChange}
                alt={"input for name"}
                width={230}
                placeholder="Digite seu nome completo"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Valor"
                value={valor}
                onChange={onChangeValor}
                alt={"input for value"}
                width={230}
                placeholder="Digite o valor desejado"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Descrição"
                value={descricao}
                onChange={onChangeDescricao}
                alt={"input for description"}
                width={230}
                placeholder="Digite uma descrição detalhada"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Tempo de Serviço"
                value={tempoServico}
                onChange={onChangeTempoServico}
                alt={"input for service time"}
                width={230}
                placeholder="Digite o tempo de serviço"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <ComboBox
                data={funcionarios}
                label={"Funcionários"}
                stateToGetId={setIdFuncionarioToSend}
                currentValue={
                  props.isEditing &&
                  props.data &&
                  props.data.funcionario._id != null
                    ? props.data.funcionario._id
                    : ""
                }
              />
              <ComboBox
                data={clientes}
                label="Cliente"
                stateToGetId={setIdClienteToSend}
                currentValue={
                  props.isEditing &&
                  props.data &&
                  props.data.cliente._id != null
                    ? props.data.cliente._id
                    : ""
                }
              />
              <ComboBox
                data={mockedDataStatus}
                label="Status"
                stateToGetId={setStatusId}
                currentValue={
                  props.isEditing && props.data && props.data.status != null
                    ? props.data.status.toString()
                    : ""
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button
            onClick={clearData}
            backgroundcolor={"#d9554f"}
            padding={[8, 35, 8, 35]}
            borderRadius
            color="#B5C2CA"
            fontsize={19}
            fontWeight={500}
          >
            Clear
          </Button>
          <Button
            onClick={() =>
              props.data && props.isEditing ? submitUpdate : submitData()
            }
            backgroundcolor={"#081225"}
            padding={[8, 35, 8, 35]}
            borderRadius
            color="#B5C2CA"
            fontsize={19}
            fontWeight={500}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
