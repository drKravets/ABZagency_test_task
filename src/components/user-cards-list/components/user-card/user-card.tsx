import { FC } from '../../../../common/types/types';
import styles from './styles.module.scss';

type Props = {
  name: string;
  email: string;
  position: string;
  photoUrl: string;
  phone: string;
};

export const UserCard: FC<Props> = ({
  name,
  email,
  position,
  photoUrl,
  phone,
}) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.userAvatar}
        src={photoUrl}
        alt='user photo'
      />
      <p className={`${styles.userName} ${styles.text}`}>
        {name}
      </p>
      <p className={styles.text}>{position}</p>
      <p className={styles.text}>{email}</p>
      <p className={styles.text}>{phone}</p>
    </div>
  );
};