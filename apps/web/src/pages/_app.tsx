import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import '../styles/globals.css';
import { RecoilRoot } from 'recoil';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>;
};

export default trpc.withTRPC(MyApp);