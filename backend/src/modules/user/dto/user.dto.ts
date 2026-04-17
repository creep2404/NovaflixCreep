export interface UserResponseDto {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
}

export interface UserAuthDto  {
  id: string;
  refreshtoken: string;
  refreshtokenexpires: Date;
}