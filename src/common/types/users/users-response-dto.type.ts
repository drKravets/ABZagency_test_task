import { type UserResponseDto } from './user-response-dto.type';

type UsersResponseDto = {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: {
    next_url: string | null;
    prev_url: string | null;
  };
  users: UserResponseDto[];
};

export { type UsersResponseDto };
