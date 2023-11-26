import { Link, Outlet } from 'react-router-dom';
import styles from './FormPage.module.scss';

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
