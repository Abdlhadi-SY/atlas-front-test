import { z } from "zod";
import { itemBaseSchema } from "./ItemBaseSchema";

export const accountSchema = itemBaseSchema.extend({
  type: z.number().min(1, "يجب اختيار نوع الحساب"),
});
