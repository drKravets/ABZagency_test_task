import { useEffect, useState } from 'react';
import {
  FC,
  PositionsResponseDto,
} from '../../common/types/types';
import { getPositions } from '../../services/user-api.service';
import { Button } from '../button/button';
import { Heading } from '../heading/heading';
import { RadioInput } from './components/radio-input';
import styles from './styles.module.scss';

const defaultPositions: PositionsResponseDto = {
  success: false,
  positions: [],
};

export const SignUp: FC = () => {
  const text = 'Working with POST request';

  const [positions, setPositions] =
    useState<PositionsResponseDto>(defaultPositions);

  useEffect(() => {
    getPositions(setPositions);
  }, []);

  console.log(positions);
  return (
    <div>
      <Heading text={text} margin={true} />
      <form action=''>
        <input
          className={styles.input}
          type='text'
          placeholder='Your name'
        />
        <input
          className={styles.input}
          type='email'
          placeholder='Email'
        />
        <div className={styles.phoneInput}>
          <input
            className={styles.input}
            type='phone'
            placeholder='Phone'
          />
        </div>
        <fieldset>
          <legend className={styles.legend}>
            Select your position
          </legend>
          {positions.positions.map((p) => (
            <RadioInput
              id={p.id.toString()}
              labelText={p.name}
              name='position'
              key={p.id}
            />
          ))}
        </fieldset>
        <input
          type='file'
          id='img'
          name='img'
          accept='image/*'
        />
        <Button text='Sign Up' onClick={() => {}} />
      </form>
    </div>
  );
};
