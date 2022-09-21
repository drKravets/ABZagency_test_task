import SuccessRegistration from '../../assets/images/success-registration.svg';
import styles from './styles.module.scss';

const SignUpSuccess = () => {
  return (
    <div className={styles.imageContainer}>
      <img
        src={SuccessRegistration}
        alt='successfully registered'
      />
    </div>
  );
};

export { SignUpSuccess };
