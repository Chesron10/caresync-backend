import { PrismaClient } from "../../generated/prisma/client.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createAccount = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password: userPass,
    phoneNumber,
    gender,
    specialisation,
    hospitalAffiliation,
  } = req.body;

  const existingUser = await prisma.doctors.findUnique({
    where: { email },
  });

  if (existingUser)
    return res
      .status(400)
      .json({ message: "Email already exists. Try login." });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPass, salt);

    //upload doctor profile image

    const user = await prisma.doctors.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        gender,
        specialisation,
        hospitalAffiliation,
      },
    });

    const { password, ...safeUser } = user;

    res.status(201).json({ message: "Account successfully created", safeUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating account" });
  }
};

export const getAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.doctors.findUnique({
      where: { id },
    });

    if (!user) return res.status(400).json({ message: "Account not found" });

    const { password, ...safeUser } = user;

    res.status(200).json({ safeUser });
  } catch (error) {
    res.status(500).json({ message: "Error fetching account" });
  }
};

export const updateAccount = async (req, res) => {
  const { id } = req.params;

  const {
    firstName,
    lastName,
    phoneNumber,
    gender,
    specialisation,
    hospitalAffiliation,
  } = req.body;

  try {
    const user = await prisma.doctors.findUnique({
      where: { id },
    });

    if (!user) return res.status(400).json({ message: "Account not found" });

    const updatedAccount = await prisma.doctors.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        gender,
        specialisation,
        hospitalAffiliation,
      },
    });

    res
      .status(201)
      .json({ message: "Account successfully updated", updatedAccount });
  } catch (error) {
    res.status(500).json({ message: "Error updating account" });
  }
};

export const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAccount = await prisma.doctors.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ message: "User deleted successfully", deletedAccount });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};
