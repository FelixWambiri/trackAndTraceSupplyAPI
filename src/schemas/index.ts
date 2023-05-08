import z from "zod";

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

// Define the schema for creating a new supply chain item
const createSupplyChainItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  color: z.string(),
  price: z.number(),
});

// Define the schema for updating supply chain item reference data
const updateSupplyChainItemSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  price: z.number().optional(),
});

// Define the schema for adding a new event associated with an item
const addSupplyChainItemEventSchema = z.object({
  supplyChainItemId: z.string(),
  location: z.string(),
  custodian: z.string(),
});

export {
  userSchema,
  createSupplyChainItemSchema,
  updateSupplyChainItemSchema,
  addSupplyChainItemEventSchema,
};
