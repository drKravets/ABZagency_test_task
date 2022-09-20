import { forwardRef, Ref } from 'react';
import { UsersResponseDto } from '../../common/types/types';
import { Button } from '../button/button';
import { Heading } from '../heading/heading';
import { UserCard } from './components/user-card/user-card';
import styles from './styles.module.scss';

type Props = {
  users: UsersResponseDto;
  handleLoadMore: () => void;
};

export const UsersCardList = forwardRef<
  HTMLDivElement,
  Props
>(({ users, handleLoadMore }, ref) => {
  const headerText = 'Working with GET request';
  const orderedUsers = users.users.sort((userA, userB) => {
    return (
      userB.registration_timestamp -
      userA.registration_timestamp
    );
  });

  return (
    <div className={styles.cardsBlock} ref={ref}>
      <Heading text={headerText} margin={true} />
      <div ref={ref} className={styles.cardsContainer}>
        {users.users.map((user) => (
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
      {users.links.next_url !== null && (
        <Button text='Show more' onClick={handleLoadMore} />
      )}
    </div>
  );
});
