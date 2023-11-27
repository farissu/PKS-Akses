// components/Loading.js
import React from 'react';
import styles from './Loading.module.css';

const Loading = ({ visible }:any) => {
  return <div className={`${styles.loading} ${visible ? styles.fadeIn : styles.fadeOut}`} />
};

export default Loading;
