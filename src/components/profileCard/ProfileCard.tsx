"use client";
import { NextPage } from "next";
import s from "./ProfileCard.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  ImageNumber: number;
  name: string;
  text: string;
  id: number;
  more: string[];
}

const ProfileCard: NextPage<Props> = ({ ImageNumber, name, text, id, more }) => {
  const [gender, setGender] = useState();
  useEffect(() => {
    const genderStatus = JSON.parse(localStorage.getItem("profileData"))?.gender || "мужской";
    setGender(genderStatus);
  }, []);
  return (
    <Link href={`/profile/${id}?name=${name}&ImageNumber=${ImageNumber}&text=${text}`}>
      <div
        className={s.ProfileCard}
        style={
          gender === "мужской"
            ? { backgroundImage: `url("/ProfileImage${ImageNumber}.jpg")` }
            : { backgroundImage: `url("/ProfileImageMan${ImageNumber}.jpg")` }
        }
      >
        <span className={s.ProfileCard__gradient}></span>
        <div className={s.ProfileCard__info}>
          <h2>{name}</h2>
          <p>{text}</p>
          <div className={s.ProfileCard__more}>
            {more.map((elem, index) => (
              <span key={index} className={s.ProfileCard__more__s}>
                {elem}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;
