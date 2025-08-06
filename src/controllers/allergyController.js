import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

export const addAllergy = async (req, res) => {
  const { id } = req.params;

  const { name, severity, reaction } = req.body;

  try {
    const allergy = await prisma.allergies.create({
      data: {
        name,
        reaction,
        severity,
        userId: id,
      },
    });

    res.status(201).json({ message: "Allergy successfully added", allergy });
  } catch (error) {
    res.status(500).json({ message: "Error adding allergy" });
  }
};

export const getAllergy = async (req, res) => {
  const { id } = req.params;

  try {
    const allergy = await prisma.allergies.findUnique({
      where: {
        userId: id,
      },
    });

    res.status(500).json({ allergy });
  } catch (error) {
    res.status(500).json({ message: "Error fetching allergy" });
  }
};

export const updateAllergy = async (req, res) => {
  const { id } = req.params;

  const { name, severity, reaction } = req.body;

  try {
    const updatedAllergy = await prisma.allergies.update({
      where: { id },
      data: {
        name,
        severity,
        reaction,
      },
    });

    res
      .status(500)
      .json({ message: "Allergy successfully updated", updatedAllergy });
  } catch (error) {
    res.status(500).json({ message: "Error updating allergy" });
  }
};

export const deleteAllergy = async (req, res) => {
  const { id } = req.params;

  try {
    const allergy = await prisma.allergies.delete({
      where: { id },
    });

    res.status(200).json({ message: "Allergy successfull deleted", allergy });
  } catch (error) {
    res.status(500).json({ message: "Error deleting allergy" });
  }
};
