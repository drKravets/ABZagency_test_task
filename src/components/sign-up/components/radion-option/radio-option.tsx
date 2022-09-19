import { FC } from '../../../../common/types/types';
import styles from './styles.module.scss';
import {
  UseFormRegister,
  FieldValues,
} from 'react-hook-form';

type Props = {
  id: number;
  name: string;
  labelText: string;
  register: UseFormRegister<FieldValues>;
};

const RadioOption: FC<Props> = ({
  id,
  name,
  labelText,
  register,
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        {...register(name, { required: true })}
        className={styles.radioOption}
        type='radio'
        id={id.toString()}
        name={name}
        value={id}
      />
      <label
        className={styles.label}
        htmlFor={id.toString()}
      >
        {labelText}
      </label>
    </div>
  );
};

export { RadioOption };
