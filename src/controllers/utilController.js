import { PrismaClient } from "../../generated/prisma/client.js";
import crypto from "crypto";

const prisma = new PrismaClient();

export const getOtc = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.oneTimeCode.findMany({
      where: { userId: id },
    });

    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const otc = await prisma.oneTimeCode.create({
      data: {
        userId: id,
        code,
        expiresAt,
      },
    });

    res.status(201).json({ otc });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching OTC" });
  }
};
