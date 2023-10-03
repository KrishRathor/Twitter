import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <RecoilRoot>
    <Component {...pageProps} />
    <ToastContainer />
  </RecoilRoot>;
};

export default trpc.withTRPC(MyApp);