"use client";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import s from "./page.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

const Page: NextPage = () => {
  const searchParams = useSearchParams();
  const [gender, setGender] = useState();
  useEffect(() => {
    const genderStatus = JSON.parse(localStorage.getItem("profileData"))?.gender || "мужской";
    setGender(genderStatus);
  }, []);
  return (
    <div className={s.Page}>
      <h2 className={s.Page__title}>Профиль - {searchParams.get("name")}</h2>
      <div className={s.Page__wrapper}>
        <Image
          className={s.Page__image}
          src={
            gender === "мужской" ? `/ProfileImage${searchParams.get("ImageNumber")}.jpg` : `/ProfileImageMan${searchParams.get("ImageNumber")}.jpg`
          }
          alt="Фотография профиля"
          width={400}
          height={500}
        />
        <div className={s.Page__text}>
          <div className={s.Page__text__wrapper}>
            <h2>Обо мне</h2>
            {gender === "мужской" ? (
              <p>
                Привет! Меня зовут {searchParams.get("name")}. Я люблю искусство во всех его проявлениях — от живописи до музыки, и часто черпаю
                вдохновение в книгах и путешествиях. Мне нравится открывать для себя новые места, пробовать что-то необычное и знакомиться с
                интересными людьми. Я ценю искренность и доброту, стараюсь всегда оставаться на позитиве и делиться им с окружающими. В свободное
                время люблю гулять на свежем воздухе или уютно проводить вечера за любимым хобби.
              </p>
            ) : (
              <p>
                Меня зовут {searchParams.get("name")}, и я — человек, который всегда находит общий язык с окружающими. Я общительный, люблю
                знакомиться с новыми людьми и проводить время в компании друзей. В свободное время увлекаюсь спортом, особенно хоккеем, и часто захожу
                на каток, чтобы провести несколько часов в движении. Мне нравится работать руками, заниматься мелким ремонтом и улучшениями в доме.
                Жизнь — это не только работа, но и отдых, поэтому я всегда стараюсь найти время для своих увлечений и отдыха на природе.
              </p>
            )}
          </div>
          <div className={s.Page__text__wrapper}>
            <h2>Цитата</h2>
            <p>{searchParams.get("text")}</p>
          </div>
        </div>
      </div>
      <hr />
      <div className={s.Page__video}>
        <h2>Мои увлечения</h2>
        <video src={`/ProfileVideo${searchParams.get("ImageNumber")}.mp4`} autoPlay controls preload="true" />
      </div>
      <hr />
    </div>
  );
};

export default Page;
