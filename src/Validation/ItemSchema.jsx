import { z } from "zod";
import { itemBaseSchema } from "./ItemBaseSchema";
export const itemSchema = itemBaseSchema.extend({
 
  category_id: z.number().min(1, "يجب اختيار الفئة"),

  unit_name: z.string().min(1, "اسم الوحدة مطلوب"),

  quantity_low: z.number( "الحد الأدنى يجب أن يكون رقم" ).min(1, " الحد الأدنى يجب ان يكون اكبر من صفر"),

  sell_price: z.number( "سعر المبيع يجب أن يكون رقم" ).positive("سعر المبيع يجب أن يكون أكبر من صفر"),

  cost_price: z.number( "سعر الشراء يجب أن يكون رقم" ).positive("سعر الشراء يجب أن يكون أكبر من صفر"),
});
