import { type PositionResponseDto } from './position-response-dto.type';

type PositionsResponseDto = {
  success: boolean;
  positions: PositionResponseDto[];
};

export { type PositionsResponseDto };
