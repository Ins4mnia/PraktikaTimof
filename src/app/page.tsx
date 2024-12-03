"use client";
import React, { useState, useEffect } from "react";
import s from "./page.module.scss";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import ProfileCard from "@/components/profileCard/ProfileCard";

const dataWomen = [
  { ImageNumber: 1, name: "Диана", text: "Прогулки и сон!", more: ["Путешествия", "Танцы"] },
  { ImageNumber: 2, name: "Ксения", text: "Люблю смотреть фильмы", more: ["Природа", "Спорт"] },
  { ImageNumber: 3, name: "Маша", text: "Люблю природу", more: ["Вкусная еда", "Прогулки"] },
  { ImageNumber: 4, name: "Адель", text: "КИНО", more: ["Книги", "Кинотеатр"] },
  { ImageNumber: 5, name: "Вера", text: "100 причин", more: ["Театр", "Путешествия", "Природа"] },
  { ImageNumber: 6, name: "Элизабет", text: "1 решение", more: ["Путешествия", "Лыжи"] },
  { ImageNumber: 7, name: "Анастасия", text: "Just Dance", more: ["Путешествия", "Коньки", "Зима"] },
  { ImageNumber: 8, name: "Екатерина", text: "Вдохновляюсь природой", more: ["Поэзия", "Живопись"] },
  { ImageNumber: 9, name: "Лилия", text: "Люблю готовить", more: ["Кулинария", "Путешествия"] },
  { ImageNumber: 10, name: "Ольга", text: "Ищу новых друзей", more: ["Волейбол", "Природа"] },
  { ImageNumber: 11, name: "Полина", text: "Художник", more: ["Рисование", "Кино"] },
  { ImageNumber: 12, name: "Наталья", text: "Мама двоих детей", more: ["Книги", "Йога"] },
];

const dataMen = [
  { ImageNumber: 1, name: "Александр", text: "Общительный человек", more: ["Машины", "Мотоспорт"] },
  { ImageNumber: 2, name: "Петр", text: "Механик", more: ["Семья", "Путешествия"] },
  { ImageNumber: 3, name: "Виктор", text: "Водитель грузовика", more: ["Дальние поездки"] },
  { ImageNumber: 4, name: "Антон", text: "Люблю хокей", more: ["Спорт", "ЗОЖ"] },
  { ImageNumber: 5, name: "Роман", text: "Рома Рома роман", more: ["Музыка", "Гитара"] },
  { ImageNumber: 6, name: "Иван", text: "Keep calm!", more: ["Путешествия", "Иностранный язык"] },
  { ImageNumber: 7, name: "Давид", text: "Just Dance", more: ["Танцы"] },
  { ImageNumber: 8, name: "Михаил", text: "Обожаю играть в шахматы", more: ["Шахматы", "Книги"] },
  { ImageNumber: 9, name: "Григорий", text: "Люблю природу", more: ["Пешие прогулки", "Рыбалка"] },
  { ImageNumber: 10, name: "Денис", text: "Музыкант", more: ["Гитара", "Рок-музыка"] },
  { ImageNumber: 11, name: "Егор", text: "Фотограф", more: ["Фотография", "Путешествия"] },
  { ImageNumber: 12, name: "Сергей", text: "Инженер", more: ["Технологии", "Конструирование"] },
  { ImageNumber: 13, name: "Максим", text: "Сноубордист", more: ["Зима", "Экстрим"] },
  { ImageNumber: 14, name: "Никита", text: "Пишу стихи", more: ["Поэзия", "Философия"] },
  { ImageNumber: 15, name: "Кирилл", text: "Люблю гулять с собакой", more: ["Природа", "Собаки"] },
  { ImageNumber: 16, name: "Андрей", text: "Катаюсь на велосипеде", more: ["Спорт", "Путешествия"] },
  { ImageNumber: 17, name: "Владимир", text: "Шеф-повар", more: ["Гастрономия", "Кулинария"] },
  { ImageNumber: 18, name: "Олег", text: "Люблю играть в футбол", more: ["Спорт", "Командные игры"] },
];

export default function Home() {
  const [data, setData] = useState<typeof dataWomen>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const gender = JSON.parse(localStorage.getItem("profileData"))?.gender || "мужской";
    const selectedData = gender === "мужской" ? dataWomen : dataMen;
    setData(selectedData);

    // Собираем уникальные метки
    const allTags = selectedData.flatMap((item) => item.more);
    setTags([...new Set(allTags)]); // Уникальные метки
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const filteredData = selectedTags.length > 0 ? data.filter((item) => selectedTags.some((tag) => item.more.includes(tag))) : data;

  const likeCard = (card: (typeof dataWomen)[0]) => {
    if (JSON.parse(localStorage.getItem("auth"))) {
      const currentLikesKey = JSON.parse(localStorage.getItem("profileData")).gender === "мужской" ? "likeWoman" : "likeMan";
      const currentLikes = JSON.parse(localStorage.getItem(currentLikesKey)!) || [];
      const isAlreadyLiked = currentLikes.some((like: { ImageNumber: number }) => like.ImageNumber === card.ImageNumber);
      if (!isAlreadyLiked) {
        const updatedLikes = [...currentLikes, card];
        localStorage.setItem(currentLikesKey, JSON.stringify(updatedLikes));
      }
    } else if (!JSON.parse(localStorage.getItem("auth"))) {
      alert("Сначала пройдите регистрацию!");
    }
  };

  function SlideControls({ data }: { data: typeof dataWomen }) {
    const swiper = useSwiper();

    const likeSlide = () => {
      if (JSON.parse(localStorage.getItem("auth"))) {
        const currentLikesKey = JSON.parse(localStorage.getItem("profileData")).gender === "мужской" ? "likeWoman" : "likeMan";
        const currentLikes = JSON.parse(localStorage.getItem(currentLikesKey)!) || [];
        const currentSlide = data[swiper.realIndex];
        const isAlreadyLiked = currentLikes.some((like: { ImageNumber: number }) => like.ImageNumber === currentSlide.ImageNumber);
        if (!isAlreadyLiked) {
          const updatedLikes = [...currentLikes, currentSlide];
          localStorage.setItem(currentLikesKey, JSON.stringify(updatedLikes));
        }
        swiper.slideNext();
      } else if (!JSON.parse(localStorage.getItem("auth"))) {
        alert("Сначала пройдите регистрацию!");
      }
    };

    const skipSlide = () => {
      swiper.slideNext();
    };
    console.log(tags);
    return (
      <div className={s.controls}>
        <button onClick={skipSlide} className={s.controls__button__skip}>
          Скип
        </button>
        <button onClick={likeSlide} className={s.controls__button__like}>
          Лайк
        </button>
      </div>
    );
  }
  return (
    <div className={s.page}>
      <h1 style={{ marginBottom: "50px" }}>Случайный поиск</h1>
      <Swiper spaceBetween={50} loop={true} slidesPerView={3} centeredSlides={true} draggable={false}>
        {data.map((elem, index) => (
          <SwiperSlide key={index}>
            <ProfileCard ImageNumber={elem.ImageNumber} name={elem.name} text={elem.text} id={elem.ImageNumber} more={elem.more} />
          </SwiperSlide>
        ))}
        <SlideControls data={data} />
      </Swiper>

      <div className={s.metochki} style={{ padding: "50px 0" }}>
        <h2>Поиск по меткам</h2>
        <h3>Выберите интересную вам метку!</h3>
        <div className={s.tags}>
          {tags.map((tag, index) => (
            <button key={index} onClick={() => toggleTag(tag)} className={`${s.tagButton} ${selectedTags.includes(tag) ? s.activeTag : ""}`}>
              {tag}
            </button>
          ))}
        </div>
        <div className={s.Metki}>
          {selectedTags.length == 0
            ? null
            : filteredData.map((elem, index) => (
                <div key={index} className={s.cardContainer}>
                  <ProfileCard ImageNumber={elem.ImageNumber} name={elem.name} text={elem.text} id={elem.ImageNumber} more={elem.more} />
                  <button onClick={() => likeCard(elem)} className={s.likeButton}>
                    Лайк
                  </button>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
