"use client";
import { NextPage } from "next";
import s from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {}

const Footer: NextPage<Props> = ({}) => {
  const [auth, setAuth] = useState<boolean>();
  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("auth")!) ? JSON.parse(localStorage.getItem("auth")!) : false;
    setAuth(status);
  }, []);
  return (
    <div className={s.Footer}>
      <div className={s.Footer__links}>
        <Link href={"/"}>Поиск партнера</Link>
        {auth ? <Link href={"/profile"}>Мой профиль</Link> : null}
      </div>
      <div className={s.Footer__socials}>
        <Image src={"/TelegramIcon.svg"} width={24} height={24} alt="Соц.сеть - телеграм" />
        <Image src={"/VkIcon.svg"} width={24} height={24} alt="Соц.сеть - вк" />
      </div>
    </div>
  );
};

export default Footer;
