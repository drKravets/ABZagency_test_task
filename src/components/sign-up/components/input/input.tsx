import styles from './styles.module.scss';

import {
  UseFormRegister,
  FieldValues,
  FieldErrorsImpl,
} from 'react-hook-form';
import { FC } from '../../../../common/types/types';

type Props = {
  placeHolder: string;
  validation: object;
  name: string;
  errors: FieldErrorsImpl<{ [x: string]: any }>;
  register: UseFormRegister<FieldValues>;
};

const Input: FC<Props> = ({
  errors,
  register,
  placeHolder,
  name,
  validation,
}) => {
  return (
    <>
      <input
        placeholder={placeHolder}
        className={`${styles.input} ${
          errors?.[name] && styles.errorField
        }`}
        {...register(name, {
          required: true,
          ...validation,
        })}
      />
      <label
        htmlFor={name}
        className={`${styles.inputLabel} ${
          errors?.[name] && styles.errorLabel
        }`}
      >
        Your name
      </label>
      {errors?.[name]?.type === 'required' && (
        <span className={styles.error}>
          This field is required
        </span>
      )}
    </>
  );
};

export { Input };
