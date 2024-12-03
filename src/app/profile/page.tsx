"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import s from "./page.module.scss";
import Image from "next/image";
import ProfileCard from "@/components/profileCard/ProfileCard";

interface ProfileData {
  name: string;
  phone: string;
  gender: string;
  birthDate: string;
  description: string;
  telegram: string;
  photo: string;
}

const Page: NextPage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [gender, setGender] = useState();
  useEffect(() => {
    const genderStatus = JSON.parse(localStorage.getItem("profileData"))?.gender || "мужской";
    setGender(genderStatus);
  }, []);
  useEffect(() => {
    const storedData = localStorage.getItem("profileData");
    if (storedData) {
      setProfileData(JSON.parse(storedData));
    }
  }, []);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newPhoto = reader.result as string;
        const updatedProfile = { ...profileData, photo: newPhoto };
        setProfileData(updatedProfile);
        localStorage.setItem("profileData", JSON.stringify(updatedProfile));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={s.Page}>
      <h1 className={s.Page__title}>Ваши данные</h1>
      <div className={s.Profile}>
        <div className={s.Profile__image}>
          <Image
            alt="Фотография профиля"
            width={400}
            height={400}
            style={{ objectFit: "cover" }}
            src={profileData?.photo ? profileData.photo : "/UnknownProfileImage.jpg"}
          />
          <label className={s.Profile__image__change}>
            Поменять фото профиля
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoChange} />
          </label>
        </div>
        <div className={s.Profile__info}>
          <div className={s.Profile__info__wrapper}>
            <p className={s.Profile__info__title}>Имя</p>
            <input className={s.Profile__info__input} value={profileData?.name || ""} readOnly />
          </div>
          <div className={s.Profile__info__wrapper}>
            <p className={s.Profile__info__title}>Номер телефона</p>
            <input className={s.Profile__info__input} value={profileData?.phone || ""} readOnly />
          </div>
          <div className={s.Profile__info__wrapper}>
            <p className={s.Profile__info__title}>Пол</p>
            <input className={s.Profile__info__input} value={profileData?.gender || ""} readOnly />
          </div>
          <div className={s.Profile__info__wrapper}>
            <p className={s.Profile__info__title}>Дата вашего рождения</p>
            <input className={s.Profile__info__input} value={profileData?.birthDate || ""} readOnly />
          </div>
          <div className={s.Profile__info__wrapper}>
            <p className={s.Profile__info__title}>Описание к анкете</p>
            <input className={s.Profile__info__input} value={profileData?.description || ""} readOnly />
          </div>
          <div className={s.Profile__info__wrapper}>
            <p className={s.Profile__info__title}>Имя пользователя telegram</p>
            <input className={s.Profile__info__input} value={profileData?.telegram || ""} readOnly />
          </div>
        </div>
      </div>
      <div className={s.Match}>
        <h2 className={s.Match__title}>Метчи</h2>
        <div className={s.Match__content}>
          {gender === "мужской" ? (
            JSON.parse(localStorage.getItem("likeWoman")) && JSON.parse(localStorage.getItem("likeWoman")!).length > 0 ? (
              JSON.parse(localStorage.getItem("likeWoman")!).map((elem, index) => (
                <ProfileCard key={index} name={elem.name} ImageNumber={elem.ImageNumber} text={elem.text} id={elem.ImageNumber} more={elem.more} />
              ))
            ) : (
              <p>Данных нет</p>
            )
          ) : JSON.parse(localStorage.getItem("likeMan")) && JSON.parse(localStorage.getItem("likeMan")).length > 0 ? (
            JSON.parse(localStorage.getItem("likeMan")).map((elem, index) => (
              <ProfileCard key={index} name={elem.name} ImageNumber={elem.ImageNumber} text={elem.text} id={elem.ImageNumber} more={elem.more} />
            ))
          ) : (
            <p>Данных нет</p>
          )}
        </div>
      </div>
      <div className={s.Likes}></div>
    </div>
  );
};

export default Page;
