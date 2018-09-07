import React from 'react';
import { Layout, Row } from 'antd';

import PageHeader from './PageHeader';
import Paper from './Paper';
import InvoicesTable from './InvoicesTable';
import ButtonLink from './ButtonLink';

const { Content } = Layout;

const InvoicesPage = props => (
  <Layout className="invoices-page">
    <Row type="flex" justify="center">
      <Content className="invoices-page__content">
        <PageHeader text="Invoices" />
        <Paper className="invoices-page__paper" title="Actions">
          <ButtonLink
            to="/add"
            type="primary"
          >
            {'Add new'}
          </ButtonLink>
        </Paper>
        <Paper className="invoices-page__paper" title="Invoices">
          <InvoicesTable {...props} />
        </Paper>
      </Content>
    </Row>
  </Layout>
);

export default InvoicesPage;
