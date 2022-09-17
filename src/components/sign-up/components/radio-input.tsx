import { FC } from '../../../common/types/types';
import styles from './styles.module.scss';

type Props = {
  id: string;
  name: string;
  labelText: string;
};

export const RadioInput: FC<Props> = ({
  id,
  name,
  labelText,
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.radioOption}
        type='radio'
        id={id}
        name={name}
        value={labelText}
      />
      <label className={styles.label} htmlFor={id}>
        {labelText}
      </label>
    </div>
  );
};
