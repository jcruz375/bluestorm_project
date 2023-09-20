import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { tokenChecker } from '../util/auth_checker';
import Splash from '../components/splash_page';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    async function verifyIsUserAutenticated() {
      const tokenIsvalid = await tokenChecker();
      if (!tokenIsvalid && router.pathname !== '/') {
        router.push('/');
      }
      setIsLoading(false);
      return tokenIsvalid;
    }
    verifyIsUserAutenticated()
  }, []);

  if (isLoading) {
    // Mostra a página de splash enquanto isLoading é verdadeiro
    return <Splash />;
  }

  return <Component {...pageProps} />
}

export default MyApp
