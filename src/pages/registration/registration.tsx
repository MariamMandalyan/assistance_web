import React, { useCallback } from 'react';
import InputField from '../../components/inputField/inputField';
import { Controller, useForm } from 'react-hook-form';
import styles from './registration.module.scss';
import { useNavigate } from 'react-router-dom';
import arrowButton from '../../assets/icons/arrowButton.svg';
import { PuffLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {register } from '../../store/authSlice';

const Registration: React.FC = () => {
  const status = useAppSelector((state) => state.auth.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phonenumber: "",
      password: "",
    }
  });

  const onSubmit = useCallback((values: any) => {
    const data = {
      values,
      cb: () => {
        navigate('/chat')
      }
    }
    dispatch(register(data))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <img
          onClick={() => { navigate('/home') }}
          src={require('../../assets/images/logo.png')}
          alt='logo'
          className={styles.logo} />
        <h2 className={styles.title}>Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.flex}>
          <div className={styles.form}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => <InputField {...field} placeholder='ФИО' type='text' valid={errors.username} />}
              rules={{
                required: true
              }}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => <InputField {...field} placeholder='Email' type='text' valid={errors.email} message={errors.email?.message}/>}
              rules={{
                required: true,
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g,
                  message: 'Неверный адрес эл. почты'
                }
              }}
            />
            <Controller
              name="phonenumber"
              control={control}
              render={({ field }) => <InputField {...field} placeholder='+7 (900) 000 00 00' type='number' valid={errors.phonenumber} />}
              rules={{
                required: true,
                maxLength: 15
              }}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => <InputField {...field} placeholder='Пароль' type='text' valid={errors.password} message={errors.password?.message}/>}
              rules={{
                required: true,
                minLength: {
                  value: 6,
                  message: 'мин. 6 символов'
                },
              }}
            />
          </div>
          <button
            className={styles.button}>
            Зарегистрироваться
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

export default Registration