import { Request, Response } from "express";
import prisma from "../db";

export const getAllSupplyChainItems = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id ?? req.user.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        items: {
          include: {
            events: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    res.json({ data: user.items });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createSupplyChainItem = async (req: Request, res: Response) => {
  const userId = req.user?.id ?? req.user?.userId;
  try {
    const item = await prisma.supplyChainItem.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        belongsToId: userId,
      },
    });
    res.json({ data: item });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSupplyChainItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id ?? req.user?.userId;
  const { name, description, color, price } = req.body;

  try {
    const item = await prisma.supplyChainItem.update({
      where: {
        id_belongsToId: {
          id: String(id),
          belongsToId: userId,
        },
      },
      data: { name, description, color, price },
    });

    if (item) {
      res.json({ data: item });
    } else {
      res.status(404).json({ error: "Item not found." });
    }
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Item not found." });
    } else {
      res
        .status(500)
        .json({ error: "An error occurred while updating the item." });
    }
  }
};
