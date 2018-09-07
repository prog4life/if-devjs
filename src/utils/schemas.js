import { schema } from 'normalizr';

export const invoice = new schema.Entity('invoices');
export const invoicesList = new schema.Array(invoice); // OR with shorthand:
// export const invoicesList = [invoice];

