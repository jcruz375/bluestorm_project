import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Splash from '../components/splash_page';
import { useGlobalBloc } from '../bloc/global_bloc';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { tokenChecker } = useGlobalBloc();

  useEffect(() => {
    setIsLoading(true);
    async function verifyIsUserAutenticated() {
      const tokenIsvalid = await tokenChecker();
      if (!tokenIsvalid && router.pathname !== '/') {
        router.push('/');
      } else if (tokenIsvalid && router.pathname == '/') {
        router.push('/medications');
      }
      setIsLoading(false);
    }
    verifyIsUserAutenticated()
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return <Component {...pageProps} />
}

export default MyApp
