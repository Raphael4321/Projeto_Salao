import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Input from "../../input";
import Button from "../../button";
import styles from "./style.module.css";
import ComboBox from "@/Components/comboBox";
import { userService } from "@/Modules/user/service";
import Image from "next/image";

type Props = {
  setIsOpen: (param: boolean) => void;
  isEditing?: boolean;
  data?: UserType;
  atualizar?: () => void;
  AtualizarOnChange?: (val: boolean) => void;
};

export interface GenericCombo {
  id: string;
  nome: string;
}

export default function Modal(props: Props) {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<Date | undefined>();
  const [dataAdmissao, setDataAdmissao] = useState<Date | undefined>();
  const [dataDemissao, setDataDemissao] = useState<Date | undefined>();
  const [obsDemissao, setObsDemissao] = useState<string>("");
  const [rua, setRua] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [foto, setFoto] = useState<string>("");
  const [ativo, setAtivo] = useState<boolean>(false);
  const [salario, setSalario] = useState<string>("");
  const [admin, setAdmin] = useState<boolean | undefined>();

  const [showDemissao, setShowDemissao] = useState(false);

  const mockedDataStatus: GenericCombo[] = [
    { id: "true", nome: "ativo" },
    { id: "false", nome: "inativo" },
  ];
  const [statusId, setStatusId] = useState<string>("");

  const onChangeNome = (val: string) => {
    setNome(val);
  };

  const onChangeEmail = (val: string) => {
    setEmail(val);
  };

  const onChangeSenha = (val: string) => {
    setSenha(val);
  };

  const onChangeDataNascimento = (val: string) => {
    setDataNascimento(val ? new Date(val) : undefined);
  };

  const onChangeDataAdmissao = (val: string) => {
    setDataAdmissao(val ? new Date(val) : undefined);
  };

  const onChangeDataDemissao = (val: string) => {
    setDataDemissao(val ? new Date(val) : undefined);
  };

  const onChangeObsDemissao = (val: string) => {
    setObsDemissao(val);
  };

  const onChangeRua = (val: string) => {
    setRua(val);
  };

  const onChangeBairro = (val: string) => {
    setBairro(val);
  };

  const onChangeCep = (val: string) => {
    setCep(val);
  };

  const onChangeFoto = (val: string) => {
    setFoto(val);
  };

  const onChangeSalario = (val: string) => {
    setSalario(val);
  };

  useEffect(() => {
    if (props.isEditing && props.data) {
      setNome(props.data.nome);
      setEmail(props.data.email);
      setSenha(props.data.senha);
      setDataNascimento(props.data.dataNascimento);
      setDataAdmissao(props.data.dataAdmissao);
      setDataDemissao(props.data.dataDemissao);
      setObsDemissao(props.data.obsDemissao || "");
      setRua(props.data.rua);
      setBairro(props.data.bairro);
      setCep(props.data.cep);
      setFoto(props.data.foto);
      setAtivo(props.data.ativo);
      setSalario(props.data.salario);
      setAdmin(props.data.admin);
    }
  }, [props.isEditing, props.data]);

  const clearData = () => {
    setNome("");
    setEmail("");
    setSenha("");
    setDataNascimento(undefined);
    setDataAdmissao(undefined);
    setDataDemissao(undefined);
    setObsDemissao("");
    setRua("");
    setBairro("");
    setCep("");
    setFoto("");
    setAtivo(false);
    setSalario("");
    setAdmin(undefined);
  };

  const submitData = async () => {
    try {
      const mappingData: UserType = {
        _id: "",
        nome: nome,
        email: email,
        senha: senha,
        dataNascimento: dataNascimento || new Date(),
        dataAdmissao: dataAdmissao || new Date(),
        dataDemissao: dataDemissao || new Date(),
        obsDemissao: obsDemissao,
        rua: rua,
        bairro: bairro,
        cep: cep,
        foto: foto,
        ativo: Boolean(statusId),
        salario: salario,
        admin: false,
      };

      const dataSaved = await userService.createUser(mappingData);

      if (dataSaved) {
        alert("Funcionario inserido");
      } else {
        alert("Funcionario não inserido, houve algum erro");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error instanceof Error) {
        alert("Ocorreu um erro ao salvar o funcionario: " + error.message);
      } else {
        alert("Ocorreu um erro ao salvar o funcionario.");
      }
    }

    updateFatherState();
  };

  const submitUpdate = async () => {
    try {
      const mappingData: UserType = {
        _id: props.data?._id || "",
        nome: nome,
        email: email,
        senha: senha,
        dataNascimento: dataNascimento || new Date(),
        dataAdmissao: dataAdmissao || new Date(),
        dataDemissao: dataDemissao || new Date(),
        obsDemissao: obsDemissao,
        rua: rua,
        bairro: bairro,
        cep: cep,
        foto: foto,
        ativo: Boolean(statusId),
        salario: "",
        admin: admin,
      };

      if (props.data && props.data._id) {
        const dataSaved = await userService.updateUser(
          props.data._id,
          mappingData
        );
        if (dataSaved) {
          alert("Cliente atualizado");
        } else {
          alert("Cliente não atualizado, houve algum erro");
        }
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error instanceof Error) {
        alert("Ocorreu um erro ao atualizar o cliente: " + error.message);
      } else {
        alert("Ocorreu um erro ao atualizar o cliente.");
      }
    }

    updateFatherState();
  };

  const updateFatherState = () => {
    if (props.atualizar && props.AtualizarOnChange) {
      props.AtualizarOnChange(!props.atualizar);
    }
  };

  return (
    <>
      <div
        className={styles.darkBG}
        onClick={() => {
          props.setIsOpen(false);
          updateFatherState();
        }}
      />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
          <h5 className={styles.heading}>Cadastro</h5>
            <button
              className={styles.closeBtn}
              onClick={() => {
                updateFatherState();
                props.setIsOpen(false);
              }}
            >
              <IoMdClose style={{ marginBottom: "-3px" }} />
            </button>
          </div>

          <div className={styles.modalContent}>
            <div className={styles.wrappInputs}>
              <Input
                label="Nome"
                value={nome}
                onChange={onChangeNome}
                alt={"input for name"}
                width={230}
                placeholder="Digite seu nome completo"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Email"
                value={email}
                onChange={onChangeEmail}
                alt={"input for email"}
                width={230}
                placeholder="Digite seu email"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Senha"
                value={senha}
                onChange={onChangeSenha}
                alt={"input for password"}
                width={230}
                placeholder="Digite sua senha"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Data de Nascimento"
                value={
                  dataNascimento
                    ? new Date(dataNascimento).toISOString().split("T")[0]
                    : ""
                }
                type="date"
                onChange={onChangeDataNascimento}
                alt="input for birth date"
                width={230}
                placeholder="Digite sua data de nascimento"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />

              <Input
                label="Rua"
                value={rua}
                onChange={onChangeRua}
                alt={"input for street"}
                width={230}
                placeholder="Digite sua rua"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="Bairro"
                value={bairro}
                onChange={onChangeBairro}
                alt={"input for neighborhood"}
                width={230}
                placeholder="Digite seu bairro"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <Input
                label="CEP"
                value={cep}
                onChange={onChangeCep}
                alt={"input for ZIP code"}
                width={230}
                placeholder="Digite seu CEP"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />
              <div>
                <Input
                  label="Foto"
                  labelVersion={2}
                  value=""
                  onChange={onChangeFoto}
                  alt={"Input da foto"}
                  width={230}
                  placeholder={"Digite aqui..."}
                  customStyle={{ marginBottom: "0.7rem" }}
                  type={"file"}
                />
                {foto && (
                  <Image
                    src={`${foto}`}
                    alt={"exmple"}
                    width={100}
                    height={100}
                  />
                )}
              </div>

              <Input
                label="Data de Admissão"
                value={
                  dataAdmissao
                    ? new Date(dataAdmissao).toISOString().split("T")[0]
                    : ""
                }
                type="date"
                onChange={onChangeDataAdmissao}
                alt="input for admission date"
                width={230}
                placeholder="Digite sua data de admissão"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />

              <Input
                label="Salário"
                value={salario}
                onChange={onChangeSalario}
                alt={"input for salary"}
                width={230}
                placeholder="Digite seu salário"
                labelVersion={2}
                customStyle={{ marginBottom: "0.7rem" }}
              />

              <ComboBox
                data={mockedDataStatus}
                label="Status"
                stateToGetId={(value) => {
                  setStatusId(value);
                  setShowDemissao(value === "false");
                }}
                currentValue={
                  props.isEditing && props.data && props.data._id != null
                    ? props.data.ativo.toString()
                    : ""
                }
              />

              {showDemissao && (
                <Input
                  label="Data de Demissão"
                  value={
                    dataDemissao
                      ? new Date(dataDemissao).toISOString().split("T")[0]
                      : ""
                  }
                  type="date"
                  onChange={onChangeDataDemissao}
                  alt="input for dismissal date"
                  width={230}
                  placeholder="Digite sua data de demissão"
                  labelVersion={2}
                  customStyle={{ marginBottom: "0.7rem" }}
                />
              )}
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
                Limpar
              </Button>
              <Button
                onClick={() =>
                  props.data && props.isEditing ? submitUpdate() : submitData()
                }
                backgroundcolor={"#081225"}
                padding={[8, 35, 8, 35]}
                borderRadius
                color="#B5C2CA"
                fontsize={19}
                fontWeight={500}
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
