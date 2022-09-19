import { useEffect, useState } from 'react';
import {
  FC,
  PositionsResponseDto,
  UsersResponseDto,
} from '../../common/types/types';
import { getPositions } from '../../services/user-api.service';
import { Button } from '../button/button';
import { Heading } from '../heading/heading';
import { RadioInput } from './components/radio-input/radio-input';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { Input } from './components/input/input';
import { Validation } from '../../common/data/validation';

const defaultPositions: PositionsResponseDto = {
  success: false,
  positions: [],
};

type Props = {
  setUsers: React.Dispatch<
    React.SetStateAction<UsersResponseDto>
  >;
  onSubmit: (values: any) => Promise<void>;
};

export const SignUp: FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const [positions, setPositions] =
    useState<PositionsResponseDto>(defaultPositions);

  useEffect(() => {
    getPositions(setPositions);
  }, []);

  const uploadWatch = watch('img');

  const uploadText = uploadWatch?.length
    ? uploadWatch[0].name
    : 'Upload your photo';

  return (
    <div>
      <Heading
        text='Working with POST request'
        margin={true}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <div className={styles.inputWrapper}>
          <Input
            register={register}
            placeHolder={'Your name'}
            validation={Validation.name}
            name='name'
            errors={errors}
          />
          {errors?.name?.type === 'minLength' && (
            <span className={styles.error}>
              Add at least 2 symbols
            </span>
          )}
          {errors?.name?.type === 'maxLength' && (
            <span className={styles.error}>
              Add maximum 60 symbols
            </span>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <Input
            register={register}
            placeHolder={'Email'}
            validation={Validation.email}
            name='email'
            errors={errors}
          />
          {errors?.email?.type === 'minLength' && (
            <span className={styles.error}>
              Add at least 2 symbols
            </span>
          )}
          {errors?.email?.type === 'maxLength' && (
            <span className={styles.error}>
              Add maximum 100 symbols
            </span>
          )}
          {errors?.email?.type === 'pattern' && (
            <span className={styles.error}>
              Please enter valid email
            </span>
          )}
        </div>

        <div className={styles.phoneInput}>
          <Input
            register={register}
            placeHolder={'Phone'}
            validation={Validation.phone}
            name='phone'
            errors={errors}
          />
          {!errors?.phone && (
            <span className={styles.phoneExample}>
              +38 (XXX) XXX - XX - XX
            </span>
          )}
          {errors?.phone?.type === 'pattern' && (
            <span className={styles.error}>
              Please enter phone that matches the pattern
              +38 (XXX) XXX - XX - XX
            </span>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <RadioInput
            register={register}
            positions={positions}
            errors={errors}
          />
          {errors?.position?.type === 'required' && (
            <span className={styles.errorRadio}>
              This field is required
            </span>
          )}
        </div>
        <div className={styles.uploadFile}>
          <input
            className={styles.uploadInput}
            type='file'
            id='img'
            {...register('img', {
              required: true,
            })}
            accept='image/*'
          />
          <button
            type='button'
            className={`${styles.uploadBtn} ${
              errors?.img && styles.errorField
            }`}
          >
            Upload
          </button>
          <span
            className={`${styles.uploadMsg} ${
              errors?.img && styles.uploadTextError
            }`}
          >
            {uploadText}
          </span>
          {errors?.img?.type === 'required' && (
            <span className={styles.error}>
              This field is required
            </span>
          )}
        </div>
        <Button
          text='Sign Up'
          disabled={
            Object.keys(errors)?.length ? true : false
          }
        />
      </form>
    </div>
  );
};
