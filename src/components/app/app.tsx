import { useEffect, useState } from 'react';
import {
  FC,
  UsersResponseDto,
} from '../../common/types/types';
import { getUsers } from '../../services/user-api.service';
import { Header } from '../header/header';
import { Intro } from '../intro/intro';
import { UsersCardList } from '../user-cards-list/users-card-list';
import styles from './styles.module.scss';

export const App: FC = () => {
  const defaultUsers = {
    success: true,
    page: 1,
    total_pages: 1,
    total_users: 1,
    count: 1,
    links: {
      next_url: null,
      prev_url: null,
    },
    users: [],
  };

  const [users, setUsers] =
    useState<UsersResponseDto>(defaultUsers);

  useEffect(() => {
    getUsers(setUsers, { page: 1, count: 5 });
  }, []);

  return (
    <div>
      <Header />
      <Intro />
      <main className={styles.main}>
        <UsersCardList users={users.users} />
      </main>
    </div>
  );
};
