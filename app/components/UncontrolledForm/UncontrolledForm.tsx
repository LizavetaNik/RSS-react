import { FC, useEffect, useState } from 'react';
import styles from './UncontrolledForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import * as yup from 'yup';
import { updateFormData } from '../../features/formDataSlice';
import { fileToBase64, schema } from '../../pages/FormPage/FormPage';
import { DataCustom } from '../../data/users.data';

const UncontrolledForm: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = useSelector((state: RootState) => state.countries.countries);

    const [inputName, setInputName] = useState("");
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [previousNames, setPreviousNames] = useState<string[]>([]);
    const [inputAge, setInputAge] = useState(0);
    const [ageErrorMessage, setAgeErrorMessage] = useState('');
    const [inputEmail, setInputEmail] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [previousEmails, setPreviousEmails] = useState<string[]>([]);
    const [inputPassword, setInputPassword] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [inputConfirmPassword, setInputConfirmPassword] = useState("");
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
    const [inputGender, setInputGender] = useState("");
    const [genderErrorMessage, setGenderErrorMessage] = useState('');
    const [inputTermsAndConditions, setInputTermsAndConditions] = useState(false);
    const [termsAndConditionsErrorMessage, setTermsAndConditionsErrorMessage] = useState('');
    const [inputCountry, setInputCountry] = useState("");
    const [countryErrorMessage, setCountryErrorMessage] = useState('');
    const [imageErrorMessage, setImageErrorMessage] = useState('');
    const [inputFile, setInputFile] = useState<File | null>(null);

    useEffect(() => {
      const savedNames = JSON.parse(localStorage.getItem('previousNames') || '[]');
      setPreviousNames(savedNames);

      const savedEmails = JSON.parse(localStorage.getItem('previousEmails') || '[]');
      setPreviousEmails(savedEmails);
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formDataValid = {
            name: inputName,
            age: inputAge,
            email: inputEmail,
            password: inputPassword,
            confirmPassword: inputConfirmPassword,
            gender: inputGender,
            termsAndConditions: inputTermsAndConditions,
            image: inputFile ? [inputFile] : [],
            country: inputCountry,
        };
        
        try {
          await schema.validate(formDataValid, { abortEarly: false });

          const base64 = await fileToBase64(inputFile as unknown as File);
          const formData : DataCustom = {
            name: inputName,
            age: inputAge,
            email: inputEmail,
            password: inputPassword,
            confirmPassword: inputConfirmPassword,
            gender: inputGender,
            termsAndConditions: inputTermsAndConditions,
            country: inputCountry,
            image: base64,
          };
          dispatch(updateFormData(formData));
          navigate('/home');
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                resetErrorMessages();
                
                error.inner.forEach((err) => {
                    switch (err.path) {
                        case 'name':
                            setNameErrorMessage(err.message);
                            break;
                        case 'age':
                            setAgeErrorMessage(err.message);
                            break;
                        case 'email':
                            setEmailErrorMessage(err.message);
                            break;
                        case 'password':
                            setPasswordErrorMessage(err.message);
                            break;
                        case 'confirmPassword':
                            setConfirmPasswordErrorMessage(err.message);
                            break;
                        case 'gender':
                            setGenderErrorMessage(err.message);
                            break;
                        case 'termsAndConditions':
                            setTermsAndConditionsErrorMessage(err.message);
                            break;
                        case 'image':
                          setImageErrorMessage(err.message);
                              break;
                        case 'country':
                            setCountryErrorMessage(err.message);
                            break;
                        default:
                            break;
                    }
                });
            }
        }    
    };
    
    const resetErrorMessages = () => {
        setNameErrorMessage('');
        setAgeErrorMessage('');
        setEmailErrorMessage('');
        setPasswordErrorMessage('');
        setConfirmPasswordErrorMessage('');
        setGenderErrorMessage('');
        setTermsAndConditionsErrorMessage('');
        setCountryErrorMessage('');
        setImageErrorMessage('');
    };
    

    const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputName(value);
        try {
          await schema.validateAt('name', { name: value });
          setNameErrorMessage('');

          if (!previousNames.includes(value)) {
            const newPreviousNames = [...previousNames, value];
            setPreviousNames(newPreviousNames);
            localStorage.setItem('previousNames', JSON.stringify(newPreviousNames));
          }
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            setNameErrorMessage(error.message);
          }
        }
    };
      
    const handleAgeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputAge(Number(value));
        try {
          await schema.validateAt('age', { age: value });
          setAgeErrorMessage('');
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            setAgeErrorMessage(error.message);
          }
        }
    };

    const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputEmail(value);
        try {
          await schema.validateAt('email', { email: value });
          setEmailErrorMessage('');

          if (!previousEmails.includes(value)) {
            const newPreviousEmails = [...previousEmails, value];
            setPreviousEmails(newPreviousEmails);
            localStorage.setItem('previousEmails', JSON.stringify(newPreviousEmails));
          }
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            setEmailErrorMessage(error.message);
          }
        }
    };

    const handlePasswordChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputPassword(value);
        try {
          await schema.validateAt('password', { password: value });
          setPasswordErrorMessage('');
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            setPasswordErrorMessage(error.message);
          }
        }
    };

    const handleConfirmPassword = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputConfirmPassword(value);

        const currentPassword = inputPassword;
        try {
            await schema.validateAt('confirmPassword', { 
                confirmPassword: value,
                password: currentPassword,
            });
            setConfirmPasswordErrorMessage('');
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                setConfirmPasswordErrorMessage(error.message);
            }
        }
    };

    const handleGenderChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputGender(value);
        try {
          await schema.validateAt('gender', { gender: value });
          setGenderErrorMessage('');
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            setGenderErrorMessage(error.message);
          }
        }
    };

    const handleCountryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const country = e.target.value;
        setInputCountry(country);
        try {
            await schema.validateAt('country', { country });
            setCountryErrorMessage('');
          } catch (error) {
            if (error instanceof yup.ValidationError) {
                setCountryErrorMessage(error.message);
            }
        }
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setInputFile(file);
          setImageErrorMessage('');
      } else {
          setInputFile(null);
      }
    };

    const handleTermsAndConditionsChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setInputTermsAndConditions(checked);

      try {
          await schema.validateAt('termsAndConditions', { termsAndConditions: checked });
          setTermsAndConditionsErrorMessage('');
      } catch (error) {
          if (error instanceof yup.ValidationError) {
            setTermsAndConditionsErrorMessage(error.message);
          }
      }
    };

    return (
    <>
    <h1>Uncontrolled Form</h1>
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        
      <div className={styles.formControl}>
        <label htmlFor="name">Name</label>
        <input 
          type="text"
          placeholder="Enter name"
          value={inputName}
          onChange={handleNameChange}
          className={nameErrorMessage ? styles.errorInput : ''}
          list="name-list"
        />
        <datalist id="name-list">
          {previousNames.map((name, index) => (
            <option key={index} value={name} />
          ))}
        </datalist>
        {nameErrorMessage && <p>{nameErrorMessage}</p>}
      </div>

      <div className={styles.formControl}>
        <label htmlFor="age">Age</label>
        <input 
            type="text"  
            placeholder="Enter age" 
            value={inputAge} 
            onChange={handleAgeChange}
            className={ageErrorMessage ? styles.errorInput : ''}
        />
        {ageErrorMessage && <p>{ageErrorMessage}</p>}
      </div>

      <div className={styles.formControl}>
        <label htmlFor="email">Email</label>
        <input 
            type="text"  
            placeholder="Enter email" 
            value={inputEmail} 
            onChange={handleEmailChange}
            className={emailErrorMessage ? styles.errorInput : ''}
            list="name-list-email"
        />
        <datalist id="name-list-email">
          {previousEmails.map((name, index) => (
            <option key={index} value={name} />
          ))}
        </datalist>
        {emailErrorMessage && <p>{emailErrorMessage}</p>}
      </div>
        
      <div className={styles.formControl}>
        <label htmlFor="password">Password</label>
        <input 
            type="password"  
            placeholder="Enter password" 
            value={inputPassword} 
            onChange={handlePasswordChange}
            className={passwordErrorMessage ? styles.errorInput : ''}
        />
        {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
      </div>
        
      <div className={styles.formControl}>
        <label htmlFor="confirmPassword">Confirm password</label>
        <input 
            type="password"  
            placeholder="Repeat password" 
            value={inputConfirmPassword} 
            onChange={handleConfirmPassword}
            className={confirmPasswordErrorMessage ? styles.errorInput : ''} 
        />
        {confirmPasswordErrorMessage && <p>{confirmPasswordErrorMessage}</p>}
      </div>
        
      <div className={genderErrorMessage ? `${styles.formControl} ${styles.errorInput}` : styles.formControl }>
          <label htmlFor="gender">Gender</label>
          <input 
            type="radio" 
            name="gender" 
            value="male" 
            checked={inputGender === "male"}
            onChange={handleGenderChange} 
          /> Male
          <input 
            type="radio" 
            name="gender" 
            value="female" 
            checked={inputGender === "female"}
            onChange={handleGenderChange} 
          /> Female
          {genderErrorMessage && <p>{genderErrorMessage}</p>}
      </div>

        <div className={termsAndConditionsErrorMessage ? `${styles.formControl} ${styles.errorInput}` : styles.formControl }>
          <label htmlFor="termsAndConditions">Accept Terms and Conditions</label>
          <input 
            type="checkbox" 
            name="termsAndConditions" 
            checked={inputTermsAndConditions}
            onChange={handleTermsAndConditionsChange}
          />
          {termsAndConditionsErrorMessage && <p>{termsAndConditionsErrorMessage}</p>}
        </div>
  
        <div className={imageErrorMessage ? `${styles.formControl} ${styles.errorInput}` : styles.formControl }>
          <label htmlFor="image">Upload image</label>
          <input type="file" name="image" onChange={handleImageChange} />
          {imageErrorMessage && <p>{imageErrorMessage}</p>}
        </div>

        <div className={countryErrorMessage ? `${styles.formControl} ${styles.errorInput}` : styles.formControl }>
          <label htmlFor="country">Country</label>
          <select onChange={handleCountryChange}>
            {countries.map((country, index) => (
               <option key={index} value={country}>{country}</option>
            ))}
          </select>
          {countryErrorMessage && <p>{countryErrorMessage}</p>}
        </div>

        <button type="submit">Submit</button>  
      </form>
    </>
    );
}

export default UncontrolledForm;
