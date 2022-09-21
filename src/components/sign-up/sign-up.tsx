import { forwardRef, useEffect, useState } from 'react';
import { PositionsResponseDto } from '../../common/types/types';
import { getPositions } from '../../services/user-api.service';
import { Button } from '../button/button';
import { Heading } from '../heading/heading';
import { RadioInput } from './components/radio-input/radio-input';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { Input } from './components/input/input';
import { Validation } from '../../common/data/validation';
import { SignUpSuccess } from '../sign-up-success/sign-up-success';
import { getFileWidthAndHeigh } from '../../helpers/helper';

const defaultPositions: PositionsResponseDto = {
  success: false,
  positions: [],
};

type Props = {
  onSubmit: (values: any) => Promise<void>;
  userRegistered: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SignUp = forwardRef<HTMLDivElement, Props>(
  ({ onSubmit, userRegistered, setLoading }, ref) => {
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

    const headingText = userRegistered
      ? 'User successfully registered'
      : 'Working with POST request';

    const form = (
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
              validate: {
                lessThan10MB: (files) =>
                  files[0]?.size < 5000000,
                minDimensions: async (files) => {
                  const dimensions =
                    await getFileWidthAndHeigh(files[0]);
                  const heighMatchCRiteria =
                    dimensions.height >= 70;
                  const widthMatchCRiteria =
                    dimensions.width >= 70;
                  return (
                    heighMatchCRiteria && widthMatchCRiteria
                  );
                },
              },
            })}
            accept='.jpeg,  .jpg'
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
          {errors?.img?.type === 'lessThan10MB' && (
            <span className={styles.errorRadio}>
              Max file size is 5MB
            </span>
          )}
          {errors?.img?.type === 'minDimensions' && (
            <span className={styles.errorRadio}>
              File should be at least 70X70
            </span>
          )}
        </div>
        <Button
          text='Sign Up'
          disabled={
            Object.keys(errors)?.length ? true : false
          }
          onClick={() => {
            setLoading(true);
          }}
          setLoading={setLoading}
        />
      </form>
    );

    return (
      <div ref={ref}>
        <Heading text={headingText} margin={true} />
        {userRegistered ? <SignUpSuccess /> : form}
      </div>
    );
  }
);
