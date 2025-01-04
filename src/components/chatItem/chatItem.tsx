import React, { useMemo } from 'react';
import styles from './chatItem.module.scss'
// import renderHTML from 'react-render-html';
import lawyerIcon from '../../assets/icons/vector.svg';



interface IProps {
  message: any
}

const ChatItem: React.FC<IProps> = ({ message }) => {
  const content = useMemo(() => {
    // ${message.type === 'link' && styles.link}`}
    let lawyer = message?.type === 'lawyer'
    if (message?.question) {
      return (
        <div className={styles.container} style={{ justifyContent: 'flex-end' }}>
          <div className={`${styles.content} ${styles.question}`}>
            <p className={styles.text} >{message.question}</p>
          </div>
        </div>
      )
    } else {
      return (
        <>
          {
            message?.summary && <div className={styles.container} style={{ justifyContent: 'flex-start' }}>
              <div className={`${styles.content} ${styles.answer} ${lawyer && styles.lawyer}`}>
                {lawyer && <div className={styles.circle}>
                  <img src={lawyerIcon} />
                </div>}
                <p className={styles.text} >{message.summary}</p>
              </div>
            </div>
          }
          {
            message?.details_answer && <div className={styles.container} style={{ justifyContent: 'flex-start' }}>
              <div className={`${styles.content} ${styles.answer}  ${lawyer && styles.lawyer}`}>
                {lawyer && <div className={styles.circle}>
                  <img src={lawyerIcon} />
                </div>}
                <p className={styles.text} dangerouslySetInnerHTML={{ __html: message.details_answer }}  >
                </p>
              </div>
            </div>
          }
          {
            message?.additional_sources && message.additional_sources.map((item: string, index: number) => {
              return (
                <div className={styles.container} style={{ justifyContent: 'flex-start' }} key={index}>
                  <div className={`${styles.content} ${styles.answer}`}>
                    {lawyer && <div className={`${styles.circle} ${styles.linkCircle}`}>
                      <img src={lawyerIcon} />
                    </div>}
                    <a className={`${styles.text} ${styles.link}`} href={item} target={'_blank'}>
                      {`Ссылка ${message?.additional_sources?.length > 1 ? index + 1 : ''}`}
                    </a>
                  </div>
                </div>
              )
            }, [])
          }
        </>
      )

    }

  }, [message])

  return (
    <>
      {content}
    </>
  )
}

export default ChatItem