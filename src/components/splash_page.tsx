import Image from 'next/image';
import bluestomeLogo from '../public/images/logo_preto.svg'
import styles from '../styles/components/splash_page.module.scss';

function Splash() {
  return (
    <main className={`${styles.splash}`}>
      <Image
        alt='Logo bluestorm'
        src={bluestomeLogo}
      />
      <h1>Carregando...</h1>
    </main>
  );
}

export default Splash;
