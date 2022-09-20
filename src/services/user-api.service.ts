import React from 'react';
import { DefaultUsersPageAndCount } from '../common/data/defaultUsersPageAndCount.enum';
import { toast } from 'react-toastify';

import {
  PositionsResponseDto,
  UsersResponseDto,
} from '../common/types/types';

const getUsers = async (
  users: UsersResponseDto,
  setFunction: React.Dispatch<
    React.SetStateAction<UsersResponseDto>
  >,
  defaultRequest: boolean
) => {
  const page = DefaultUsersPageAndCount.PAGE;
  const count = DefaultUsersPageAndCount.COUNT;

  if (users.users.length === 0 || defaultRequest) {
    fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count} `
    ).then((res) => {
      if (!(res.status == 200 || res.status === 201)) {
        res.json().then((data) => {
          const msg = data.message;
          toast.error(msg);
        });
      } else {
        return res.json().then((data) => {
          setFunction(data);
        });
      }
    });
  } else if (
    users.users.length !== 0 &&
    users.links.next_url !== null &&
    !defaultRequest
  ) {
    fetch(users.links.next_url).then((res) => {
      if (!(res.status == 200 || res.status === 201)) {
        res.json().then((data) => {
          const msg = data.message;
          toast.error(msg);
        });
      } else {
        return res.json().then((data) => {
          const usersData = [...users.users, ...data.users];
          const newData = { ...data };
          newData.users = usersData;
          setFunction(newData);
        });
      }
    });
  }
};

const getPositions = async (
  setFunction: React.Dispatch<
    React.SetStateAction<PositionsResponseDto>
  >
) => {
  fetch(
    'https://frontend-test-assignment-api.abz.agency/api/v1/positions'
  ).then((res) => {
    if (!(res.status == 200 || res.status === 201)) {
      res.json().then((data) => {
        const msg = data.message;
        toast.error(msg);
      });
    } else {
      return res.json().then((data) => setFunction(data));
    }
  });
};

const getToken = async (
  setFunction: React.Dispatch<React.SetStateAction<String>>
) => {
  fetch(
    'https://frontend-test-assignment-api.abz.agency/api/v1/token'
  ).then((res) => {
    if (!(res.status == 200 || res.status === 201)) {
      res.json().then((data) => {
        const msg = data.message;
        toast.error(msg);
      });
    } else {
      return res
        .json()
        .then((data) => setFunction(data.token));
    }
  });
};

const createUser = async (postObject: object) => {
  return fetch(
    'https://frontend-test-assignment-api.abz.agency/api/v1/users',
    postObject
  ).then((res) => {
    if (!(res.status == 200 || res.status === 201)) {
      res.json().then((data) => {
        const msg = data.message;
        toast.error(msg);
      });
    } else {
      return res;
    }
  });
};

export { getUsers, getPositions, getToken, createUser };
