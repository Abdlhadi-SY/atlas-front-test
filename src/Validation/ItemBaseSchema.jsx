import { z } from "zod";

export const itemBaseSchema = z.object({
  code: z.string().min(1, "كود المادة مطلوب"),
  name: z.string().min(1, "اسم المادة مطلوب"),
});
