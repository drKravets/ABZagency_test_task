import { useEffect, useRef, useState } from 'react';
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

  const handleLoadMore = () => {
    getUsers(users, setUsers, false);
  };

  const usersSection = useRef<HTMLDivElement>(null);
  const signUpSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUsers(users, setUsers, true);
    getToken(setToken);
  }, []);

  const [token, setToken] = useState<String>('');

  const [userRegistered, setUserRegistered] =
    useState<boolean>(false);

  const signUpOnClick = () => {
    signUpSection.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };
  const usersOnClick = () => {
    usersSection.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

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
      getUsers(users, setUsers, true);
      setUserRegistered(true);
    }
  };

  return (
    <div>
      <Header
        signUpOnClick={signUpOnClick}
        usersOnClick={usersOnClick}
      />
      <Intro signUpOnClick={signUpOnClick} />
      <main className={styles.main}>
        <UsersCardList
          users={users}
          ref={usersSection}
          handleLoadMore={handleLoadMore}
        />
        <SignUp
          onSubmit={onSubmit}
          userRegistered={userRegistered}
          ref={signUpSection}
        />
      </main>
    </div>
  );
};
