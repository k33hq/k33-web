import { NextPage } from 'next';
import Cookie from './components/Cookie';

export * from './components';
export * from './hooks';

interface K33AppProps {
  children: React.ReactNode;
}

const K33App: NextPage<K33AppProps> = ({ children }) => {
  //TODO: do cookie stuff
  return (
    <>
      <Cookie />
      {children}
    </>
  );
};

export default K33App;

// whitelisting
