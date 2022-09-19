import { useEffect, useState } from 'react';
import {
  FC,
  PositionsResponseDto,
  SignUpFormDto,
} from '../../common/types/types';
import {
  getPositions,
  getToken,
  createUser,
} from '../../services/user-api.service';
import { Button } from '../button/button';
import { Heading } from '../heading/heading';
import { RadioInput } from './components/radio-input/radio-input';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';

const defaultPositions: PositionsResponseDto = {
  success: false,
  positions: [],
};

export const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const [positions, setPositions] =
    useState<PositionsResponseDto>(defaultPositions);
  const [token, setToken] = useState<String>('');

  const onSubmit = (values: any) => {
    const data: SignUpFormDto = values;
    const createUserFormData = new FormData();
    createUserFormData.append('name', data.name);
    createUserFormData.append('email', data.email);
    createUserFormData.append('phone', data.phone);
    createUserFormData.append('position_id', data.position);
    createUserFormData.append('photo', data.img[0]);

    const postObject = {
      method: 'POST',
      body: createUserFormData,
      headers: {
        Token: token,
      },
    };
    createUser(postObject);
    reset();
  };
  useEffect(() => {
    getPositions(setPositions);
    getToken(setToken);
  }, []);

  const text = 'Working with POST request';
  const uploadWatch = watch('img');

  const uploadText = uploadWatch?.length
    ? uploadWatch[0].name
    : 'Upload your photo';

  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  return (
    <div>
      <Heading text={text} margin={true} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            placeholder='Your name'
            className={`${styles.input} ${
              errors?.name && styles.errorField
            }`}
            {...register('name', {
              required: true,
              minLength: 2,
              maxLength: 60,
            })}
          />
          <label
            htmlFor='name'
            className={`${styles.inputLabel} ${
              errors?.name && styles.errorLabel
            }`}
          >
            Your name
          </label>
          {errors?.name?.type === 'required' && (
            <span className={styles.error}>
              This field is required
            </span>
          )}
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
          <input
            className={`${styles.input} ${
              errors?.email && styles.errorField
            }`}
            placeholder='Email'
            {...register('email', {
              required: true,
              minLength: 2,
              maxLength: 100,
              pattern: emailRegex,
            })}
          />
          <label
            htmlFor='email'
            className={`${styles.inputLabel} ${
              errors?.email && styles.errorLabel
            }`}
          >
            Email
          </label>
          {errors?.email?.type === 'required' && (
            <span className={styles.error}>
              This field is required
            </span>
          )}
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
          <input
            className={`${styles.input} ${
              errors?.phone && styles.errorField
            }`}
            type='phone'
            placeholder='Phone'
            {...register('phone', {
              required: true,
              pattern: /^[\+]{0,1}380([0-9]{9})$/g,
            })}
          />
          <label
            htmlFor='phone'
            className={`${styles.inputLabel} ${
              errors?.phone && styles.errorLabel
            }`}
          >
            Phone
          </label>
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
          {errors?.phone?.type === 'required' && (
            <span className={styles.error}>
              This field is required
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
