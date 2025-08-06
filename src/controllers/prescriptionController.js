import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

export const addPrescription = async (req, res) => {
  const { id } = req.params;

  const { medicineName, dosage, quantity, duration, instructions } = req.boy;

  try {
    const prescription = await prisma.prescriptions.create({
      data: {
        reportId: id,
        medicineName,
        dosage,
        quantity,
        instructions,
        duration,
      },
    });

    res
      .status(201)
      .json({ message: "Prescription successfully added", prescription });
  } catch (error) {
    res.status(500).json({ message: "Error adding prescription" });
  }
};

export const getAllPrescriptions = async (req, res) => {
  const { id } = req.params;

  try {
    const prescriptions = await prisma.prescriptions.findMany({
      where: { reportId: id },
    });

    res.status(200).json({ prescriptions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching prescriptions" });
  }
};

export const getPrescription = async (req, res) => {
  const { id } = req.params;

  try {
    const prescription = await prisma.prescriptions.findUnique({
      where: { id },
    });

    res.status(200).json({ prescription });
  } catch (error) {
    res.status(500).json({ message: "Error fetching prescription" });
  }
};

export const updatePrescription = async (req, res) => {
  const { id } = req.params;

  const { medicineName, dosage, quantity, duration, instructions } = req.boy;

  try {
    const updatedPrscription = await prisma.prescriptions.update({
      where: { id },
      data: {
        medicineName,
        dosage,
        duration,
        quantity,
        instructions,
      },
    });

    res.status(200).json({
      message: "Prescription successfully created",
      updatedPrscription,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating prescription" });
  }
};

export const deletePrescription = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPrescription = await prisma.prescriptions.delete({
      where: { id },
    });

    res
      .status(200)
      .json({
        message: "Prescription deleted successfully",
        deletedPrescription,
      });
  } catch (error) {
    res.status(500).json({ message: "Error deleting prescription" });
  }
};
