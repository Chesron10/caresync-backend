import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

export const addTest = async (req, res) => {
  const { id } = req.params;

  const { userId, name, description, files, result, conductedBy } = req.body;

  try {
    const test = await prisma.tests.create({
      data: {
        reportId: id,
        userId,
        name,
        description,
        conductedBy,
        files,
        result,
      },
    });

    res, status(500).json({ message: "Test successfully added", test });
  } catch (error) {
    res.status(500).json({ message: "Error adding test" });
  }
};

export const getAllTests = async (req, res) => {
  const { userId } = req.params;

  try {
    const tests = await prisma.tests.findMany({
      where: { userId },
    });

    res.status(500).json({ tests });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tests" });
  }
};

export const getTest = async (req, res) => {
  const { id } = req.params;

  try {
    const tests = await prisma.tests.findMany({
      where: { reportId: id },
    });

    res.status(500).json({ tests });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tests" });
  }
};

export const updateTest = async (req, res) => {
  const { id } = req.params;

  const { name, description, result, files, conductedBy } = req.body;

  try {
    const updatedTest = await prisma.tests.update({
      where: { id },
      data: {
        name,
        description,
        result,
        files,
        conductedBy,
      },
    });

    res
      .status(500)
      .json({ message: "Tests successfully updated", updatedTest });
  } catch (error) {
    res.status(500).json({ message: "Error updating tests" });
  }
};
