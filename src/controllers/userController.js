import { PrismaClient } from "../../generated/prisma/client.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password: userPass,
    phoneNumber,
    dob,
    gender,
  } = req.body;

  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser)
    return res
      .status(400)
      .json({ message: "Email already exist. Try to login" });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPass, salt);

    // Upload profile image

    const user = await prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        dob,
        gender,
      },
    });

    const { password, ...safeUser } = user;

    res.status(201).json({ message: "Account created successfully", safeUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const {
    firstName,
    lastName,
    dob,
    gender,
    maritalStatus,
    cityOrTown,
    phoneNumber,
    district,
    street,
    nationality,
    occupation,
    profileImg,
  } = req.body;

  const user = await prisma.users.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ message: "User not found" });
  try {
    const updatedUser = await prisma.users.update({
      where: { id: user.id },
      data: {
        firstName,
        lastName,
        dob,
        gender,
        maritalStatus,
        cityOrTown,
        phoneNumber,
        district,
        street,
        nationality,
        occupation,
        profileImg,
      },
    });

    res
      .status(201)
      .json({ message: "Account updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.users.delete({
      where: { id },
    });

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

export const getUser = async (req, res) => {
  const { code } = req.params;

  const otc = await prisma.oneTimeCode.findFirst({
    where: {
      code,
      expiresAt: {
        gte: new Date(),
      },
    },
  });

  if (!otc) return res.status(404).json({ message: "Invalid or expired OTC" });

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: otc.userId,
      },
    });

    await prisma.oneTimeCode.deleteMany({
      where: {
        userId: otc.userId,
      },
    });

    const { password, ...safeUser } = user;

    res.status(200).json({ message: "Patient found successfully", safeUser });
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient" });
  }
};
