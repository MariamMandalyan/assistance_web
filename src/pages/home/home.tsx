import React from 'react';
import styles from './home.module.scss';
import arrowButton from '../../assets/icons/arrowButton.svg';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div>
          <img src={require('../../assets/images/logo.png')} alt='logo' />
          <div>
            <h1 className={styles.title}>
              Юридическая помощь.<p className={styles.shadow}>Искусственный интеллект</p>с поддержкой экспертов
            </h1>
            <p className={styles.description}>
              {"Попробуйте наш сервис бесплатно,\nПолучите ответы на вопросы 24/7"}
            </p>
            <div className={styles.buttons}>
              <button
                onClick={() => { navigate('/register') }}
                className={styles.button}>
                Зарегестрироваться
                <div className={styles.circle}>
                  <img src={arrowButton} alt='icon' className={styles.icon} />
                </div>
              </button>
              <button
                onClick={() => { navigate('/login') }}
                className={styles.outlineButton}>
                Войти
              </button>
            </div>
            <span
              className={styles.bottomText}
              onClick={() => {
                const fileUrl = "/help.pdf";
                window.open(fileUrl, "_blank")
              }}
              id='not-clickable'>Как это работает?</span>
          </div>
        </div>
        <div className={styles.imageBlock}>
          <img src={require('../../assets/images/robot.png')} alt='logo' className={styles.image} />
        </div>
      </div>
    </div>
  )
}

export default Home