import { Affix, Layout, theme } from 'antd';
import styles from './styles.module.scss';

const { Header } = Layout;

interface ResearchHeaderProps {
  toggleSider: () => void;
}

const ResearchHeader: React.FC<ResearchHeaderProps> = ({ toggleSider }) => {
  return (
    <Affix>
      <Header className={styles.header}>
        <div id="header-content">
          <div>Logo</div>
          <div>Menu</div>
          <div>Sign up and sider</div>
        </div>
      </Header>
    </Affix>
  );
};

export default ResearchHeader;
