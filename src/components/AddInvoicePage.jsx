import React from 'react';
import { Layout, Row } from 'antd';

import AddInvoiceContainer from 'containers/AddInvoiceContainer';
import PageHeader from './PageHeader';
import Paper from './Paper';

const { Content } = Layout;

const AddInvoicePage = () => (
  <Layout className="add-invoice">
    <Row type="flex" justify="center">
      <Content className="add-invoice__content">
        <PageHeader text="Create Invoice" />
        <Paper>
          <AddInvoiceContainer />
        </Paper>
      </Content>
    </Row>
  </Layout>
);

export default AddInvoicePage;
