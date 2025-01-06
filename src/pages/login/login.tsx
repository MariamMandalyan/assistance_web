import React, { useCallback } from 'react';
import InputField from '../../components/inputField/inputField';
import { Controller, useForm } from 'react-hook-form';
import styles from './login.module.scss';
import { useNavigate } from 'react-router-dom';
import arrowButton from '../../assets/icons/arrowButton.svg';
import { login } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { PuffLoader } from 'react-spinners';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector((state) => state.auth.status);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = useCallback((values: any) => {
    const data = {
      values,
      cb: () => {
        navigate('/chat')
      }
    }
    dispatch(login(data))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <img
          onClick={() => { navigate('/home') }}
          src={require('../../assets/images/logo.png')}
          alt='logo'
          className={styles.logo} />
        <h2 className={styles.title}>Вход</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.flex}>
          <div className={styles.form}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <InputField valid={errors.email} {...field} placeholder='Логин' type='text' />}
              rules={{
                required: true
              }}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => <InputField valid={errors.password} {...field} placeholder='Пароль' type='password' />}
              rules={{
                required: true
              }}
            />
          </div>
          <button
            onClick={() => { }}
            className={styles.button}>
            Вход
            <div className={styles.circle}>
              <PuffLoader
                color={'black'}
                loading={status === 'pending'}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              {status !== 'pending' && <img src={arrowButton} alt='icon' className={styles.icon} />}
            </div>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login