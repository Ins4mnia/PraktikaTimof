"use client";
import { FC, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import s from "./Modal.module.scss";

interface ModalProps {
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ onClose }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    birthDate: "",
    description: "",
    telegram: "",
    photo: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    birthDate: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, [name]: reader.result as string });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;
    const phoneRegex = /^\+\d{1,3}\s\d{1,4}\s\d{4,}$/;

    if (!nameRegex.test(formData.name)) newErrors.name = "Имя должно содержать только буквы.";
    if (!formData.birthDate.match(/^\d{4}-\d{2}-\d{2}$/)) newErrors.birthDate = "Дата должна быть в формате ГГГГ-ММ-ДД.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenderSelect = (gender: string) => {
    setFormData({ ...formData, gender });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    localStorage.setItem("profileData", JSON.stringify(formData));
    localStorage.setItem("auth", JSON.stringify(true));
    router.push("/profile");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className={s.Modal} onClick={onClose}>
      <div className={s.Modal__content} onClick={(e) => e.stopPropagation()}>
        <h2 className={s.Modal__title}>Регистрация</h2>
        <form className={s.Modal__form} onSubmit={handleSubmit}>
          <div className={s.Modal__form__wrapper}>
            <p>Имя</p>
            <input type="text" name="name" placeholder="Введите имя" value={formData.name} onChange={handleChange} />
            {errors.name && <span className={s.error}>{errors.name}</span>}
          </div>
          <div className={s.Modal__form__wrapper}>
            <p>Номер телефона</p>
            <input type="text" name="phone" placeholder="Введите номер телефона" value={formData.phone} onChange={handleChange} />
            {errors.phone && <span className={s.error}>{errors.phone}</span>}
          </div>
          <div className={s.Modal__form__wrapper}>
            <p>Пол</p>
            <div className={s.Modal__form__gender}>
              <span className={`${formData.gender === "мужской" ? s.active : ""}`} onClick={() => handleGenderSelect("мужской")}>
                Мужской
              </span>
              <span className={`${formData.gender === "женский" ? s.active : ""}`} onClick={() => handleGenderSelect("женский")}>
                Женский
              </span>
            </div>
          </div>
          <div className={s.Modal__form__wrapper}>
            <p>Дата вашего рождения</p>
            <input
              type="text"
              name="birthDate"
              placeholder="Введите дату вашего рождения (в формате ГГГГ-ММ-ДД):"
              value={formData.birthDate}
              onChange={handleChange}
            />
            {errors.birthDate && <span className={s.error}>{errors.birthDate}</span>}
          </div>
          <div className={s.Modal__form__wrapper}>
            <p>Описание к анкете</p>
            <input type="text" name="description" placeholder="Опишите себя" value={formData.description} onChange={handleChange} />
          </div>
          <div className={s.Modal__form__wrapper}>
            <p>Добавление фотографии</p>
            <input type="file" name="photo" onChange={handleChange} />
            {formData.photo && <p>Успешно загружено!</p>}
          </div>
          <div className={s.Modal__form__wrapper}>
            <p>Имя пользователя telegram/vk</p>
            <input type="text" name="telegram" placeholder="Пример: @love4you" value={formData.telegram} onChange={handleChange} />
          </div>
          <button type="submit" className={s.Modal__form__button}>
            Далее
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
