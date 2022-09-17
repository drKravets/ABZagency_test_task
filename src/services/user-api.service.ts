import React from 'react';
import {
  PaginationRequestParamsDto,
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

export { getUsers };
