import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
    async resetAutoIncrement(): Promise<void> {
        await this.userRepository.query(`
        WITH updated_users AS (
          SELECT id, row_number() OVER (ORDER BY id) AS new_id
          FROM users
        )
        UPDATE users
        SET id = updated_users.new_id
        FROM updated_users
        WHERE users.id = updated_users.id;
      `);
        await this.userRepository.query(`
        SELECT setval(pg_get_serial_sequence('users', 'id'), 
        1, false);
      `);
    }

}
