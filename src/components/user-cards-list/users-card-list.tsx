import { forwardRef, Ref } from 'react';
import {
  FC,
  UserResponseDto,
} from '../../common/types/types';
import { Button } from '../button/button';
import { Heading } from '../heading/heading';
import { UserCard } from './components/user-card/user-card';
import styles from './styles.module.scss';

type Props = { users: UserResponseDto[] };

export const UsersCardList = forwardRef<
  HTMLDivElement,
  Props
>(({ users }, ref) => {
  const headerText = 'Working with GET request';
  return (
    <div className={styles.cardsBlock} ref={ref}>
      <Heading text={headerText} margin={true} />
      <div ref={ref} className={styles.cardsContainer}>
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
});
