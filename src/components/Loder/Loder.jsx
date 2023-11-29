import React from 'react'
import styles from './Loder.module.css'
import { TailSpin } from 'react-loader-spinner'

function Loder({text}) {
  return (
    <div className={styles.loderWrpper}>
        <h2>Loding {text}</h2>
        <TailSpin
            height={80}
            width={80}
            radius={1}
            color={'#3861fb'}
        />
    </div>
  )
}

export default Loder