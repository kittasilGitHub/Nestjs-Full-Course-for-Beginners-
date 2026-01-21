/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;


    @IsEnum(['INTERN', 'EMPLOYEE', 'ADMIN'],{
        message: 'role must be either INTERN, EMPLOYEE, or ADMIN',
    })
    // three possible roles
    role: 'INTERN' | 'EMPLOYEE' | 'ADMIN';  
}