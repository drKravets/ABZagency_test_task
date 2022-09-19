import {
  FC,
  PositionsResponseDto,
} from '../../../../common/types/types';
import styles from './styles.module.scss';
import {
  FieldErrorsImpl,
  UseFormRegister,
  FieldValues,
} from 'react-hook-form';
import { RadioOption } from '../radion-option/radio-option';

type Props = {
  errors: FieldErrorsImpl<{ [x: string]: any }>;
  positions: PositionsResponseDto;
  register: UseFormRegister<FieldValues>;
};

const RadioInput: FC<Props> = ({
  errors,
  positions,
  register,
}) => {
  return (
    <fieldset
      className={`${
        errors?.position && styles.errorFieldset
      }`}
    >
      <legend className={styles.legend}>
        Select your position
      </legend>
      {positions.positions.map((p) => (
        <RadioOption
          id={p.id}
          labelText={p.name}
          key={p.id}
          name='position'
          register={register}
        />
      ))}
    </fieldset>
  );
};

export { RadioInput };
