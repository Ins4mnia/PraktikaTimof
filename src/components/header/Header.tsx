"use client";
import { NextPage } from "next";
import s from "./Header.module.scss";
import Link from "next/link";
import AuthButton from "../authButton/AuthButton";
import { useEffect, useState } from "react";

const Header: NextPage = ({}) => {
  const [auth, setAuth] = useState<boolean>();
  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("auth")!) ? JSON.parse(localStorage.getItem("auth")!) : false;
    setAuth(status);
  }, []);
  return (
    <div className={s.Header}>
      <Link href={"/"} className={s.Header__logo}>
        Love <span style={{ color: "#272727" }}>4</span> you
      </Link>
      <div className={s.Header__links}>
        <Link href={"/"}>Поиск партнера</Link>
        {auth ? <Link href={"/profile"}>Мой профиль</Link> : null}
        <AuthButton />
      </div>
    </div>
  );
};

export default Header;
