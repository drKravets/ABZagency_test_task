export const Validation = {
  name: {
    minLength: 2,
    maxLength: 60,
  },
  email: {
    minLength: 2,
    maxLength: 100,
    pattern:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g,
  },
  phone: {
    pattern: /^[\+]{0,1}380([0-9]{9})$/g,
  },
};
