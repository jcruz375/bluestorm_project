import type { NextPage } from 'next'
import bluestomeLogo from '../public/images/logo_preto.svg'
import styles from '../styles/login.module.scss'
import Image from 'next/image'
import { useLoginBloc } from '../bloc/login_bloc'
import { useState } from 'react'

const LoginPage: NextPage = () => {
  const {
    formData,
    updateField,
    handleSubmit,
  } = useLoginBloc();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    return handleSubmit();
  };


  return (
    <main className={`flex justify-center items-center ${styles.container}`}>
      <section className={`flex flex-col justify-between items-center p-10 ${styles.card}`}>
        <Image
          alt='Logo bluestorm'
          src={bluestomeLogo}
        />
        <div className={`w-full`}>
          <article className={`flex flex-col justify-between items-start`}>
            <label htmlFor="username_input">Username</label>
            <input
              id="username_input"
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
            />
          </article>
          <article className={`flex flex-col justify-between items-start`}>
            <label htmlFor="password_input">Password</label>
            <input
              id="password_input"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="text"
            />
          </article>
        </div>
        <button onClick={submitForm}>
          Login
        </button>
      </section>
    </main>
  )
}

export default LoginPage
