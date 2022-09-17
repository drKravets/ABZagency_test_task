import {
  FC,
  UserResponseDto,
} from '../../common/types/types';
import { Button } from '../button/button';
import { Heading } from '../heading/heading';
import { UserCard } from './components/user-card/user-card';
import styles from './styles.module.scss';

type Props = { users: UserResponseDto[] };

export const UsersCardList: FC<Props> = ({ users }) => {
  const headerText = 'Working with GET request';
  return (
    <div className={styles.cardsBlock}>
      <Heading text={headerText} margin={true} />
      <div className={styles.cardsContainer}>
        {users.map((user) => (
          <UserCard
            name={user.name}
            email={user.email}
            position={user.position}
            photoUrl={user.photo}
            phone={user.phone}
            key={user.id}
          />
        ))}
      </div>
      <Button text='Show more' onClick={() => {}} />
    </div>
  );
};
