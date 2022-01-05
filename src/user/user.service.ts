import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async create(user: CreateUserDto): Promise<User> {
    // generate salt
    const salt = await bcrypt.genSalt(10);
    user.salt = salt;
    user.password = await bcrypt.hash(user.password, salt);

    // Generate OTP
    user.otp = Math.random() * 100000;

    const newUser = new this.userModel(user);
    const newUserSaved = await newUser.save();
    console.log(newUserSaved, ' new user');

    return {
      data: {
        firstName: newUserSaved.firstName,
        lastName: newUserSaved.lastName,
        email: newUserSaved.email,
        image: newUserSaved.image,
        password: newUserSaved.password,
        otp: newUserSaved.otp,
        salt: newUserSaved.salt,
      },
      success: true,
      statusCode: 200,
    };
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async update(id: string, user: CreateUserDto): Promise<User> {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
