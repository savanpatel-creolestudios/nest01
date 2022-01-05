export interface User {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    password: string;
    salt: string;
    otp: number;
  };
  success: boolean;
  statusCode: number;
}
