import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

export const addReport = async (req, res) => {
  const { id } = req.params;

  const { symptoms, descriptions, doctorId, userFeedback, status } = req.body;

  try {
    const report = await prisma.reports.create({
      data: {
        symptoms,
        descriptions,
        status,
        doctorId,
        userFeedback,
        userId: id,
      },
    });

    res.status(201).json({ message: "Report successfully added", report });
  } catch (error) {
    res.status(500).json({ message: "Error adding report" });
  }
};

export const getAllReport = async (req, res) => {
  const { id } = req.params;

  try {
    const reports = await prisma.reports.findMany({
      where: { userId: id },
    });

    const legnth = reports.length;
    res
      .status(500)
      .json({ message: "Reports fetched successfully", reports, legnth });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports" });
  }
};

export const getReport = async (req, res) => {
  const { reportId } = req.params;

  try {
    const report = await prisma.reports.findUnique({
      where: { id: reportId },
    });

    res.status(500).json({ report });
  } catch (error) {
    res.status(500).json({ message: "Error fetching report" });
  }
};

export const updateReport = async (req, res) => {
  const { id } = req.params;

  const { symptoms, descriptions, userFeedback, status } = req.body;

  try {
    const updatedReport = await prisma.reports.update({
      where: { id },
      data: {
        symptoms,
        descriptions,
        status,
        userFeedback,
      },
    });

    res
      .status(201)
      .json({ message: "Report successfully updated", updatedReport });
  } catch (error) {
    res.status(500).json({ message: "Error updating report" });
  }
};
