import { Link, Outlet } from 'react-router-dom';
import styles from './FormPage.module.scss';
import * as yup from 'yup';

function FormPage() {
 
  return (
    <>
    <div className={styles.wrapper}>
       <h1>This page with forms</h1>
       <nav>
          <Link to="/formPage/uncontrolled-form">Uncontrolled form</Link>
          <Link to="/formPage/controlled-form">Form with React Hook Form</Link>
       </nav> 
       <Outlet />
    </div>  
    </>  
  );
}

export default FormPage;

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
}

export const schema = yup.object({
    name: yup.string().matches(/^[A-ZА-Я].*$/, "The first letter must be capitalized").required(),
    age: yup.number().positive().integer().required(),
    email: yup.string().email().required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
    password: yup.string().matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, "The password must contain a number, uppercase and lowercase letters, and a special character").required(),
    gender: yup.string().required("Select gender"),
    termsAndConditions: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    image: yup.mixed().required("You must select an image").test("fileSize", "File too big", value => value && value[0] && value[0].size <= 1024 * 1024).test("fileFormat", "Invalid file format", value => value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type)),
    country: yup.string().required("Choose the country"),
});