import { Router } from "express";
import { zodValidationMiddleware } from "../utils";
import {
  addSupplyChainItemEventSchema,
  createSupplyChainItemSchema,
  updateSupplyChainItemSchema,
} from "../schemas";
import {
  createSupplyChainItem,
  getAllSupplyChainItems,
  updateSupplyChainItem,
} from "../handlers/suppyChainItem";
import {
  createSupplyChainItemEvent,
  getLastSupplyChainItemEvent,
  getSupplyChainItemEvents,
} from "../handlers/supplyChainItemEvent";

const router = Router();

router.post(
  "/items",
  zodValidationMiddleware(createSupplyChainItemSchema),
  createSupplyChainItem
);
router.get("/items", getAllSupplyChainItems);
router.put(
  "/items/:id",
  zodValidationMiddleware(updateSupplyChainItemSchema),
  updateSupplyChainItem
);
router.post(
  "/items/:id/events",
  zodValidationMiddleware(addSupplyChainItemEventSchema),
  createSupplyChainItemEvent
);
router.get("/items/:id/events", getSupplyChainItemEvents);
router.get("/items/:id/last-event", getLastSupplyChainItemEvent);

export default router;
