import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

export const addProfile = async (req, res) => {
  const { id } = req.params;

  const {
    height,
    weight,
    BMI,
    bloodPressure,
    glucoseLevel,
    age,
    bloodGroup,
    inheritedDiseases,
  } = req.body;

  try {
    const profile = await prisma.profiles.create({
      data: {
        userId: id,
        height,
        weight,
        BMI,
        bloodGroup,
        bloodPressure,
        glucoseLevel,
        age,
        inheritedDiseases,
      },
    });

    res.status(201).json({ message: "Profile created successfully", profile });
  } catch (error) {
    res.status(500).json({ message: "Error adding profile" });
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await prisma.profiles.findUnique({
      where: {
        userId: id,
      },
    });

    res.status(500).json({ profile });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;

  const {
    height,
    weight,
    BMI,
    bloodPressure,
    glucoseLevel,
    age,
    bloodGroup,
    inheritedDiseases,
  } = req.body;

  try {
    const updatedProfile = await prisma.profiles.update({
      where: { userId: id },
      data: {
        height,
        weight,
        BMI,
        bloodPressure,
        glucoseLevel,
        age,
        bloodGroup,
        inheritedDiseases,
      },
    });

    res
      .status(201)
      .json({ message: "Profile updated successfully", updatedProfile });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};
