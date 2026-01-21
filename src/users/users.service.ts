/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        { 
            id: 1, name: 'Alice', email: 'Alice@example.com',role: 'ADMIN'
        },
        { 
            id: 2, name: 'Bob', email: 'Bob@example.com', role: 'INTERN'
        },
        { 
            id: 3, name: 'Charlie', email: 'Charlie@example.com',role: 'INTERN'
        },
        {
            id: 4, name: 'David', email: 'David@example.com', role: 'EMPLOYEE'      
        },
        {
            id: 5, name: 'Eve', email: 'Eve@example.com',role: 'ADMIN'
        }
    ];

    findAll(role?: 'INTERN' | 'EMPLOYEE' | 'ADMIN') {
        if(role) {
            // return users with specific role
            const roleArray= this.users.filter(user => user.role === role);
            if(roleArray.length === 0) {
                throw new NotFoundException(`No users with role ${role} found`);
            }
            return roleArray;
        }  
        return this.users; // return all users
    }

    findOne(id: number) {
        // find user by id
        const user = this.users.find(user => user.id === id);
        if(!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    create(createUserDto: CreateUserDto) {
        // create new user
        const newUser = {
            id: this.users.length + 1,
            ...createUserDto
        };
        // add new user to users array
        this.users.push(newUser);
        return newUser;     
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        // "?:" property is optional 
        const userIndex = this.users.findIndex(user => user.id === id); // find index of user to be updated
        // update user details  
        this.users[userIndex] = {
            ...this.users[userIndex],
            ...updateUserDto
        };
        // return updated user
        return this.users[userIndex];
    }    

    delete(id: number) {
        // find index of user to be deleted
        const userIndex = this.users.findIndex(user => user.id === id);
        // remove user from users array
        const deletedUser = this.users.splice(userIndex, 1);
        // return deleted user
        return deletedUser[0];
    }   
}