import loaderImg from '../../assets/images/loader.svg';
import styles from './styles.module.scss';

const Loader = () => {
  return (
    <>
      <div className={styles.loaderContainer}>
        <img
          className={styles.loader}
          src={loaderImg}
          alt='loader'
        />
      </div>
    </>
  );
};

export { Loader };
