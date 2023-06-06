import { Layout, theme } from 'antd';

const { Header } = Layout;

const ResearchHeader: React.FC = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <Header
      style={{
        position: 'sticky',
        zIndex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    ></Header>
  );
};

export default ResearchHeader;
