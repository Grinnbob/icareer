import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const role = await this.roleService.getRoleByValue(dto.role);
    if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    const user = await this.userRepository.create({
      email: dto.email,
      password: dto.password,
      roleId: role.id,
    });
    user.role = role;
    delete user.password;

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
      raw: true,
      nest: true,
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    // const userRoles = await this.userRoleRepository.findAndCountAll({
    //   where: { roleId: dto.value, userId: dto.userId },
    // });
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id); // TODO: check if it add if already relation exists
      return dto;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }
}
