import { Layout, theme } from 'antd';
import { FC, PropsWithChildren } from 'react';

const { Header, Content } = Layout;

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}></Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
