import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    descriptions: string;

    @IsString()
    @IsOptional()
    upload_avatar: string;
}
export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    descriptions?: string;

    @IsOptional()
    @IsString()
    upload_avatar?: string;
}