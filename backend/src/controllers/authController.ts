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
const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = bcscrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    return res.status(200).json({
      message: "User logged in",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        token: generateToken(user._id.toString()),
      },
    });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};
/* 
Получение профиля пользователя
@GET api/auth/profile
@ДОСТУП - PRIVATE.select("-password")
 */
const getUserProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.user!.id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {}
};
/* 
Обновление профиля пользователя
@PUT api/auth/profile
@ДОСТУП - PRIVATE
 */
const updateUserProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.user!.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    //TODO: Насчёт картинки не знаю, возможно сделаю
    if (req.body.password) {
      const salt = await bcscrypt.genSalt(10);
      const newPassword = await bcscrypt.hash(req.body.password, salt);
      user.password = newPassword;
    }
    const updatedUser = await user.save();

    return res.status(200).json({
      message: "User updated",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage,
        role: updatedUser.role,
        token: generateToken(updatedUser._id.toString()),
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
export { registerUser, loginUser, getUserProfile, updateUserProfile };
