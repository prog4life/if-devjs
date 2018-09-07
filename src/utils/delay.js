export default function delay(timeout) {
  if (!Number.isInteger(timeout)) {
    throw new Error('Expected timeout to be integer');
  }
  return new Promise(resolve => setTimeout(() => resolve(), timeout));
}
