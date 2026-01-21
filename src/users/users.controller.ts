/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ParseIntPipe} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users') // localhost:3000/users
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    /*
       GET/ users
       GET/ users/:id
       POST/ users
       PUT/ users/:id
       DELETE/ users/:id
    */

    @Get() // localhost:3000/users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'EMPLOYEE' | 'ADMIN') {
        // "?:" makes the role parameter optional
        return this.usersService.findAll(role); 
    }
    
    // @Get('interns') //localhost:3000/users/interns
    // findAllInterns() {
    //     return [];
    // }   

    @Get(':id') // localhost:3000/users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        // ParseIntPipe to convert string to number 
        return this.usersService.findOne(id); 
        // +id to convert string to number
    }

    @Post() // localhost:3000/users
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        // call create method of usersService
        return this.usersService.create(createUserDto);
    }

    @Put(':id') // localhost:3000/users/:id
    update(@Param('id', ParseIntPipe) id: number, 
    @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        // call update method of usersService
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id') // localhost:3000/users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        // call delete method of usersService
        return this.usersService.delete(id);
    }   
}
