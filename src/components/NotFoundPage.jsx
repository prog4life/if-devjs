import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <span>
      {'Page not found! You can go to '}
    </span>
    <Link to="/">
      {'Invoices'}
    </Link>
    <span>
      {' '}
      {'page'}
    </span>
  </div>
);

export default NotFoundPage;
