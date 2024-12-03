"use client";
import { NextPage } from "next";
import s from "./AuthButton.module.scss";
import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { useRouter } from "next/navigation";
interface Props {}

const AuthButton: NextPage<Props> = ({}) => {
  const [auth, setAuth] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth")!);
    setAuth(storedAuth);
  }, []);

  const signOut = () => {
    localStorage.setItem("auth", JSON.stringify(false));
    setAuth(false);
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {auth ? (
        <button onClick={signOut} className={s.AuthButton}>
          Выйти из аккаунта
        </button>
      ) : (
        <button onClick={openModal} className={s.AuthButton}>
          Войти в аккаунт
        </button>
      )}
      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
};

export default AuthButton;
