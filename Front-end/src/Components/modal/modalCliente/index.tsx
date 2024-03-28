import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Input from "../../input";
import { clientService } from "@/Modules/cliente/service";
import Button from "../../button";
import styles from "./style.module.css";
import Image from "next/image";

type Props = {
  setIsOpen: (param: boolean) => void;
  isEditing?: boolean;
  data?: ClientType;
  atualizar?: () => void;
};

export default function Modal(props: Props) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<Date | undefined>();
  const [rua, setRua] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [foto, setFoto] = useState<string>("");
  const [ativo, setAtivo] = useState<boolean>(false);

  const onChange = (val: string) => {
    setName(val);
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

  useEffect(() => {
    if (props.isEditing && props.data) {
      setName(props.data.nome);
      setEmail(props.data.email);
      setSenha(props.data.senha);
      setDataNascimento(props.data.dataNascimento);
      setRua(props.data.rua);
      setBairro(props.data.bairro);
      setCep(props.data.cep);
      setFoto(props.data.foto!);
      setAtivo(props.data.ativo);
    }
  }, [props.isEditing, props.data]);

  const clearData = () => {
    setName("");
    setEmail("");
    setSenha("");
    setDataNascimento(undefined);
    setRua("");
    setBairro("");
    setCep("");
    setFoto("");
    setAtivo(false);
  };

  const submitData = async () => {
    try {
      const mappingData: ClientType = {
        _id: "",
        nome: name,
        email: email,
        senha: senha,
        dataNascimento: dataNascimento || new Date(),
        rua: rua,
        bairro: bairro,
        cep: cep,
        foto: foto,
        ativo: true,
      };

      const dataSaved = await clientService.createClient(mappingData);

      if (dataSaved) {
        alert("Cliente inserido");
      } else {
        alert("Cliente não inserido, houve algum erro");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error instanceof Error) {
        alert("Ocorreu um erro ao salvar o cliente: " + error.message);
      } else {
        alert("Ocorreu um erro ao salvar o cliente.");
      }
    }

    updateFatherState();
  };

  const submitUpdate = async () => {
    try {
      const mappingData: ClientType = {
        _id: props.data?._id || "",
        nome: name,
        email: email,
        senha: senha,
        dataNascimento: dataNascimento || new Date(),
        rua: rua,
        bairro: bairro,
        cep: cep,
        foto: foto,
        ativo: ativo,
      };

      if (props.data && props.data._id) {
        const dataSaved = await clientService.updateClient(
          props.data._id,
          mappingData
        );
        if (dataSaved) {
          alert("Cliente atualizado");
        } else {
          alert("Cliente não atualizado, houve algum erro");
        }

        updateFatherState();
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
    if (props.atualizar) {
      props.atualizar();
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
                value={name}
                onChange={onChange}
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
                onClick={() => {
                  props.data && props.isEditing ? submitUpdate() : submitData();
                }}
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
