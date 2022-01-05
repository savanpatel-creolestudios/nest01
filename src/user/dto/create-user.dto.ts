export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  password: string;
  salt: string;
  otp: number;
}
