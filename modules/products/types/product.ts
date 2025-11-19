import z from "zod";
import { productItemSchema } from "../schemas/products";

export type Product = z.infer<typeof productItemSchema>;