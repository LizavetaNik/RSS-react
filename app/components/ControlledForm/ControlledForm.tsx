import { FC } from 'react';
import styles from './ControlledForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { DataCustom } from '../../data/users.data';
import { updateFormData } from '../../features/formDataSlice';
import { useNavigate } from 'react-router-dom';
import { fileToBase64 } from '../../pages/FormPage/FormPage';
import { schema } from '../../pages/FormPage/FormPage';

const ControlledForm: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const dispatch = useDispatch();
  
    const navigate = useNavigate();
    const onSubmit = async (data: DataCustom) => {
        if (data.image && data.image[0]) {
          const base64 = await fileToBase64(data.image[0] as unknown as File);
          data.image = base64;
        } else {
          data.image = undefined;
        }
      
        dispatch(updateFormData(data));
        navigate('/home');
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

        <div className={errors.country ? styles.errorInput : ''}>
          <label htmlFor="country">Country</label>
          <select {...register("country")}>
          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
            ))}
          </select>
          <p>{errors.country?.message?.toString()}</p>
        </div>
  
        <button type="submit">Submit</button>
      </form>
      </>
      
    );
}
  
export default ControlledForm;
