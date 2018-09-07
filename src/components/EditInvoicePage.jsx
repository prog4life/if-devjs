import React from 'react';
import { Layout, Row } from 'antd';

import EditInvoiceContainer from 'containers/EditInvoiceContainer';
import PageHeader from './PageHeader';
import Paper from './Paper';

const { Content } = Layout;

const EditInvoicePage = props => (
  <Layout className="edit-invoice">
    <Row type="flex" justify="center">
      <Content className="edit-invoice__content">
        <PageHeader text="Edit Invoice" />
        <Paper>
          <EditInvoiceContainer {...props} />
        </Paper>
      </Content>
    </Row>
  </Layout>
);

export default EditInvoicePage;
