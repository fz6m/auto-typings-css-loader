import React from 'react'
import { Com } from './components'
import styles from './styles/index.scss'
import './styles/index-global.scss'

const Test = () => {
  return (
    <div className={styles.m_style}>
      <div className="m_style">1</div>
      <Com />
    </div>
  )
}

export default Test
