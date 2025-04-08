/* Generate JWT TOKEN */
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcscrypt from "bcrypt";
import { Request, Response } from "express";

/* Генерация JWT Токена */
export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: "7d" });
};

/* 
Регистрация пользователя
@POST api/auth/register
@ДОСТУП - PUBLIC
 */
const registerUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password, profileImage } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist)
      return res.status(400).json({ message: "User already exist" });
    const salt = await bcscrypt.genSalt(10);
    const hashPassword = await bcscrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      profileImage,
    });
    return res.status(201).json({
      message: "User created",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profileImage: newUser.profileImage,
        role: newUser.role,
        token: generateToken(newUser._id.toString()),
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
/* 
Вход пользователя
@POST api/auth/login
@ДОСТУП - PUBLIC
 */
const loginUser = (req: Request, res: Response) => {};
/* 
Получение профиля пользователя
@GET api/auth/profile
@ДОСТУП - PRIVATE
 */
const getUserProfile = (req: Request, res: Response) => {};
/* 
Обновление профиля пользователя
@PUT api/auth/profile
@ДОСТУП - PRIVATE
 */
const updateUserProfile = (req: Request, res: Response) => {};
export { registerUser, loginUser, getUserProfile, updateUserProfile };
