import React from "react";
import { Layout } from "antd";

import routes from "../../routes/MainRoute";

const { Header, Content, Footer } = Layout;

const AppLayout = () => {
  return (
    <div>
      <Layout>
        <Header>Header</Header>
        <Content>
          <div className="app-layout-content">{routes}</div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
};

export default AppLayout;
