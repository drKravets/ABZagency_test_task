import { useEffect, useState } from 'react';
import {
  FC,
  SignUpFormDto,
  UsersResponseDto,
} from '../../common/types/types';
import {
  createUser,
  getUsers,
  getToken,
} from '../../services/user-api.service';
import { Header } from '../header/header';
import { Intro } from '../intro/intro';
import { UsersCardList } from '../user-cards-list/users-card-list';
import { SignUp } from '../sign-up/sign-up';
import styles from './styles.module.scss';
import { SignUpSuccess } from '../sign-up-success/sign-up-success';

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

export const App: FC = () => {
  const [users, setUsers] =
    useState<UsersResponseDto>(defaultUsers);

  useEffect(() => {
    getUsers(setUsers, { page: 1, count: 5 });
    getToken(setToken);
  }, []);

  const [token, setToken] = useState<String>('');

  const [userRegistered, setUserRegistered] =
    useState<Boolean>(false);

  const onSubmit = async (values: any) => {
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
    const response = await createUser(postObject);
    if (response.status === 201) {
      getUsers(setUsers, { page: 1, count: 6 });
      setUserRegistered(true);
    }
  };

  return (
    <div>
      <Header />
      <Intro />
      <main className={styles.main}>
        <UsersCardList users={users.users} />
        {userRegistered ? (
          <SignUpSuccess />
        ) : (
          <SignUp setUsers={setUsers} onSubmit={onSubmit} />
        )}
      </main>
    </div>
  );
};
