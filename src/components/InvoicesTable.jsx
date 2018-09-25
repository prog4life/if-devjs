import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

import ButtonsContainer from 'containers/ButtonsContainer';

const { Column } = Table;

class InvoicesTable extends React.Component {
  static propTypes = {
    displayInvoice: PropTypes.string,
    invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    displayInvoice: null,
  }

  scrollRef = null

  componentDidMount() {
    this.scrollConditionally();
  }

  componentDidUpdate() {
    this.scrollConditionally();
  }

  setScrollRef = (node) => {
    this.scrollRef = node;
  }

  scrollConditionally() {
    const { displayInvoice } = this.props;

    // TODO: see info of scroll-into-view and remove it

    if (displayInvoice) {
      this.scrollRef.parentNode.scrollIntoView();
    }
  }

  // render first column cell's content optionally wrapped by span with ref for
  // scrolling to it
  renderContentWithOptionalRef = (text, record) => {
    const { displayInvoice } = this.props;
    const isInvoiceToDisplay = record.id === displayInvoice;

    return isInvoiceToDisplay
      ? (
        <span ref={this.setScrollRef}>
          {text}
        </span>
      )
      : text;
  }

  renderControlButtons = (text, record) => ( // (text, record, index)
    <ButtonsContainer id={record.id} />
  )

  render() {
    const { invoices, isFetching } = this.props;

    return (
      <Table
        className="invoices-table"
        dataSource={invoices}
        loading={isFetching && { size: 'large', tip: 'Loading...' }}
        pagination={false}
        rowKey={record => record.id}
        // rowClassName={(record, index) => (index === 20 ? 'scroll-row' : '')}
        // onRow={(record, index) => {
        //   return {
        //     someProp: someValue,
        //   };
        // }}
      >
        <Column
          className="invoices-table__created-column"
          title="Create"
          dataIndex="date_created"
          key="date_created"
          render={this.renderContentWithOptionalRef}
        />
        <Column
          className="invoices-table__number-column"
          title="No"
          dataIndex="number"
          key="number"
        />
        <Column
          className="invoices-table__supply-column"
          title="Supply"
          dataIndex="date_supply"
          key="date_supply"
        />
        <Column
          className="invoices-table__comment-column"
          title="Comment"
          dataIndex="comment"
          key="comment"
        />
        <Column
          className="invoices-table__actions-column"
          title="Actions"
          key="actions"
          render={this.renderControlButtons}
        />
      </Table>
    );
  }
}

export default InvoicesTable;
