import { Request, Response } from "express";
import prisma from "../db";

export const createSupplyChainItemEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const { location, custodian, supplyChainItemId } = req.body;
    const supplyChainItem = await prisma.supplyChainItem.findUnique({
      where: { id: supplyChainItemId },
    });

    if (!supplyChainItem) {
      return res.status(404).json({ error: "Supply chain item not found" });
    }

    const supplyChainItemEvent = await prisma.supplyChainItemEvent.create({
      data: {
        location,
        custodian,
        supplyChainItem: { connect: { id: supplyChainItemId } },
      },
    });

    return res.json({ data: supplyChainItemEvent });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
export const getSupplyChainItemEvents = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;

    const userId = req.user?.id ?? req.user?.userId;
    const item = await prisma.supplyChainItem.findUnique({
      where: { id_belongsToId: { id: itemId, belongsToId: userId } },
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const events = await prisma.supplyChainItemEvent.findMany({
      where: { supplyChainItemId: itemId },
    });

    res.json({ data: events });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getLastSupplyChainItemEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;
    const userId = req.user?.id ?? req.user?.userId;
    const events = await prisma.supplyChainItemEvent.findMany({
      where: {
        supplyChainItemId: id,
        supplyChainItem: { belongsToId: userId },
      },
      orderBy: { createdAt: "desc" },
      take: 1,
    });
    res.json({ data: events[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
