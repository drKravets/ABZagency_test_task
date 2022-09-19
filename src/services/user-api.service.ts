import React from 'react';

import {
  PaginationRequestParamsDto,
  PositionsResponseDto,
  UsersResponseDto,
} from '../common/types/types';

const getUsers = async (
  setFunction: React.Dispatch<
    React.SetStateAction<UsersResponseDto>
  >,
  { page, count }: PaginationRequestParamsDto
) => {
  fetch(
    `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count} `
  )
    .then((res) => res.json())
    .then((data) => setFunction(data));
};

const getPositions = async (
  setFunction: React.Dispatch<
    React.SetStateAction<PositionsResponseDto>
  >
) => {
  fetch(
    'https://frontend-test-assignment-api.abz.agency/api/v1/positions'
  )
    .then((res) => res.json())
    .then((data) => setFunction(data));
};

const getToken = async (
  setFunction: React.Dispatch<React.SetStateAction<String>>
) => {
  fetch(
    'https://frontend-test-assignment-api.abz.agency/api/v1/token'
  )
    .then((res) => res.json())
    .then((data) => setFunction(data.token));
};

const createUser = async (postObject: object) => {
  fetch(
    'https://frontend-test-assignment-api.abz.agency/api/v1/users',
    postObject
  )
    .then((res) => res.json())
    .then((data) => {
      console.log('createUser response: ', data);
    });
};

export { getUsers, getPositions, getToken, createUser };
