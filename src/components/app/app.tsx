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
import { Loader } from '../loader/loader';

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

  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    getUsers(users, setUsers, false, setLoading);
  };

  const usersSection = useRef<HTMLDivElement>(null);
  const signUpSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUsers(users, setUsers, true, setLoading);
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
    setLoading(true);
    const data: SignUpFormDto = values;
    const createUserFormData = new FormData();
    createUserFormData.append('name', data.name.trim());
    createUserFormData.append('email', data.email.trim());
    createUserFormData.append('phone', data.phone.trim());
    createUserFormData.append('position_id', data.position);
    createUserFormData.append('photo', data.img[0]);

    const postObject = {
      method: 'POST',
      body: createUserFormData,
      headers: {
        Token: token,
      },
    };
    const response = await createUser(
      postObject,
      setLoading
    );
    if (response?.status === 201) {
      getUsers(users, setUsers, true, setLoading);
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
          setLoading={setLoading}
          onSubmit={onSubmit}
          userRegistered={userRegistered}
          ref={signUpSection}
        />
      </main>
      {loading && <Loader />}
    </div>
  );
};
