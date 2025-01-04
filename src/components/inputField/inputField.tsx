import React from 'react'
import styles from './inputField.module.scss'

interface IProps {
  type: string,
  value: string,
  placeholder: string,
  onChange: (text: any) => void,
  valid?: any,
  message?: string
}
const InputField: React.FC<IProps> = ({ type, value, placeholder, onChange,valid, message}) => {
  return (
    <div>
     <input
      className={`${styles.container} ${valid && styles.error}`}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
    {message && <p className={styles.errorMessage}>{message}</p>}
    </div>
   
  )
}

export default InputField