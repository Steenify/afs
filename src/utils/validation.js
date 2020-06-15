export const required = (value) =>
  value && value.length > 0 ? undefined : 'This field is required.';

export const minValue = (min) => (value) =>
  value && value.length < min ? `Must be at least ${min}.` : undefined;

export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
