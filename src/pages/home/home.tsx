import React from 'react'
import styles from './home.module.scss'
import arrowButton from '../../assets/icons/arrowButton.svg';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import DocViewer from 'react-doc-viewer';

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
      {/* <DocViewer  documents={[{uri:  require("../../assets/help.docx")}]} /> */}
      {/* <Tooltip anchorSelect="#not-clickable" style={{ backgroundColor: '#F8F8F8', color: '#171717', padding: '16px 27px', borderRadius: 25 }}>
        <p className={styles.tooltip}>{"С учётом сложившейся международной обстановки,\nсоциально-экономическое развитие предполагает\nнезависимые способы реализации инновационных методов\nуправления процессами."}</p>
      </Tooltip> */}
    </div>
  )
}

export default Home