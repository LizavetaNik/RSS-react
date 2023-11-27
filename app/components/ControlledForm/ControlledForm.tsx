import { FC } from 'react';
import styles from './ControlledForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { DataCustom } from '../../data/users.data';

const schema = yup.object({
    name: yup.string().matches(/^[A-ZА-Я].*$/, "Первая буква должна быть заглавной").required(),
    age: yup.number().positive().integer().required(),
    email: yup.string().email().required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать').required(),
    password: yup.string().matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, "Пароль должен содержать цифру, заглавную и строчную букву, специальный символ").required(),
    gender: yup.string().required("Выберите пол"),
    termsAndConditions: yup.boolean().oneOf([true], "Необходимо принять условия"),
    image: yup.mixed().required("Необходимо выбрать изображение").test("fileSize", "Файл слишком большой", value => value && value[0] && value[0].size <= 1024 * 1024 /* 1MB */).test("fileFormat", "Недопустимый формат файла", value => value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type)),
    country: yup.string().required("Выберите страну"),
});

const ControlledForm: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
      });
  
    const onSubmit = (data: DataCustom) => {
      // Обработка данных формы
      console.log(data);
    };

    const countries = useSelector((state: RootState) => state.countries.countries);
  
    return (
      <>
      <h1>Controlled Form</h1>
      <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input {...register("name")} className={errors.name ? styles.errorInput : ''} />
        <p>{errors.name?.message}</p>
  
        <label htmlFor="age">Age</label>
        <input {...register("age")} type="number" className={errors.age ? styles.errorInput : ''} />
        <p>{errors.age?.message}</p>
  
        <label htmlFor="email">Email</label>
        <input {...register("email")} type="email" className={errors.email ? styles.errorInput : ''} />
        <p>{errors.email?.message}</p>
  
        <label htmlFor="password">Password</label>
        <input {...register("password")} type="password" className={errors.password ? styles.errorInput : ''} />
        <p>{errors.password?.message}</p>
  
        <label htmlFor="confirmPassword">Confirm password</label>
        <input {...register("confirmPassword")} type="password" className={errors.confirmPassword ? styles.errorInput : ''} />
        <p>{errors.confirmPassword?.message}</p>
  
        <div className={errors.gender ? styles.errorRadioCheckbox : ''}>
          <label htmlFor="gender">Gender</label>
          <input {...register("gender")} type="radio" value="male" /> Male
          <input {...register("gender")} type="radio" value="female" /> Female
          <p>{errors.gender?.message}</p>
        </div>

        <div className={errors.termsAndConditions ? styles.errorRadioCheckbox : ''}>
          <label htmlFor="termsAndConditions">Accept Terms and Conditions</label>
          <input {...register("termsAndConditions")} type="checkbox" />
          <p>{errors.termsAndConditions?.message}</p>
        </div>
  
        <div className={errors.image ? styles.errorInput : ''}>
          <label htmlFor="image">Upload image</label>
          <input {...register("image")} type="file" />
          <p>{errors.image?.message?.toString()}</p>
        </div>

        <label htmlFor="country">Страна</label>
        <select {...register("country")}>
        {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
            ))}
        </select>
        <p>{errors.country?.message?.toString()}</p>

  
        <button type="submit">Submit</button>
      </form>
      </>
      
    );
  }
  
  export default ControlledForm;
  