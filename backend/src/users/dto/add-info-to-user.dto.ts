import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, Length } from 'class-validator';
import { UserGender } from '../users.model';

export class AddInfoToUserDto {
  @ApiProperty({ example: 'Grig', description: 'User name' })
  @IsString({ message: 'Must be string' })
  readonly firstName: string;

  @ApiProperty({ example: 'Pol', description: 'User sername' })
  @IsString({ message: 'Must be string' })
  readonly lastName: string;

  @ApiProperty({ example: '+7 999 000 88 77', description: 'User phone' })
  @IsString({ message: 'Must be string' })
  @Length(10, 20, { message: 'Length must be between 10 and 20' })
  readonly phone: string;

  @ApiProperty({ example: 'Moscow', description: 'User location' })
  @IsString({ message: 'Must be string' })
  readonly location: string;

  @ApiProperty({ example: UserGender.MALE, description: 'User gender' })
  readonly gender: UserGender;

  @ApiProperty({ example: new Date(), description: 'User birthDate' })
  @IsDate({ message: 'Must be date' })
  readonly birthDate: Date;
}
