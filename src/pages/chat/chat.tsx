import React, { useEffect, useRef, useState } from 'react';
import styles from './chat.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import ChatItem from '../../components/chatItem/chatItem';
import { addLocalMessage, sendMessage, setMessages } from '../../store/chatSlice';
import { BeatLoader } from 'react-spinners';
import logoutIcon from '../../assets/icons/logout.svg';


const Chat = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const [type, setType] = useState('ordinary')
  const messagesEndRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const [value, setValue] = useState('')
  const user = useAppSelector((state) => state.auth.user);
  const status = useAppSelector((state) => state.chat.status);
  const messages = useAppSelector((state) => state.chat.messages);

  useEffect(() => {
    const response = localStorage.getItem('MESSAGES_STORAGE_KEY')
    if (response)
      dispatch(setMessages(JSON.parse(response)))
  }, [])

  useEffect(() => {
    let divElement = document.getElementById('messages')
    let scrollTo = divElement?.scrollHeight
    if (scrollTo)
      divElement?.scrollTo(0, scrollTo)
  }, [messages])

  const send = (event: any) => {
    event.preventDefault()
    const data = {
      question: value,
      type,
      email: user?.email,
      llm_type: "OpenAI",
      model_name: "gpt-4o-mini",
      temperature: 0.2,
    }
    dispatch(addLocalMessage({ question: value }))
    dispatch(sendMessage(data))
    setValue('')
  }
  console.log(user, 'aaa');
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <img
            src={require('../../assets/images/logo.png')}
            alt='logo'
            className={styles.logo} />
          <div className={styles.buttons}>
            <button
              onClick={() => setType('ordinary')}
              className={`${styles.button} 
              ${type === 'ordinary' && styles.checked}`} >
              Аспирант
            </button>
            <button
              disabled
              onClick={() => setType('lawyer')}
              className={`${styles.button} 
              ${type === 'lawyer' && styles.checked} ${styles.disable}`} >
              Профессор
            </button>
          </div>
          <div className={styles.user} >
            <h2>{user?.username}</h2>
            <div className={styles.logout}  onClick={()=>{
            localStorage.clear()
            navigate('/home')
          }}>
              <img
                src={logoutIcon}
                alt='logout'
              />
            </div>
          </div>
        </div>
        <div className={styles.subContainer} style={{ justifyContent: messages.length === 0 ? 'center' : 'space-between' }}>
          {
            messages.length === 0 ?
              <h3 className={styles.helperText}>Чем я могу помочь?</h3> :
              <div className={styles.messagesList} id='messages' ref={messagesEndRef}>
                {
                  messages?.map((item, i) => {
                    return <ChatItem key={i} message={item} />
                  })
                }
              </div>
          }
          <form onSubmit={send} className={styles.form} >
            <div className={styles.loading}>
              <BeatLoader
                color={'black'}
                loading={status === 'pending'}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type={'text'}
                value={value}
                placeholder={'Задайте вопрос'}
                onChange={(e) => { setValue(e.target.value) }}
              />
              <div className={styles.icons}>
                <button
                  disabled={value.length === 0 || status === 'pending'}
                  onClick={send}
                  type='submit'
                  style={value.length > 0 ? { backgroundColor: 'black' } : {}}
                  className={styles.circle} >
                  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={styles.svg}
                      d="M0.91455 8.96116L8.93395 0.941767M8.93395 0.941767L16.9533 8.96116M8.93395 0.941767L8.93395 18.0292"
                      stroke={value.length > 0 ? '#FFF' : "#171717"} />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat