import React from 'react';
import styles from './button.module.scss'

interface IProps {
  title: string,
  onClick: () => void,
  outline?: boolean,
  background?: string
  type?: "submit" | "reset" | "button" | undefined,
  textStyle?: any,
  icon: any,
  borderColor?: string
}
const Button: React.FC<IProps> = ({ title, onClick, outline, background, type, textStyle, icon, borderColor}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={outline ? styles.outline : styles.container }
      style={{ backgroundColor: background, borderColor: borderColor}}>
      <p className={outline ? styles.outlineTitle : styles.title} style={textStyle}>
        {title}
      </p>
      {
        icon && <img src={icon} alt='icon' className={styles.icon} style={{fill: 'red'}} />
      }
    </button>
  )
}

export default Button