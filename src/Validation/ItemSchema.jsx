import { z } from "zod";

export const itemSchema = z.object({
  code: z.string().min(1, "كود المادة مطلوب"),

  name: z.string().min(2, "اسم المادة لازم يكون حرفين على الأقل"),

  category_id: z.number().min(1, "يجب اختيار الفئة"),

  unit_name: z.string().min(1, "اسم الوحدة مطلوب"),

  quantity_in: z.number({ invalid_type_error: "الكمية يجب أن تكون رقم" }).min(0, "الكمية لا يمكن أن تكون سالبة"),

  quantity_low: z.number({ invalid_type_error: "الحد الأدنى يجب أن يكون رقم" }).min(0, "الحد الأدنى لا يمكن أن يكون سالب"),

  sell_price: z.number({ invalid_type_error: "سعر المبيع يجب أن يكون رقم" }).positive("سعر المبيع يجب أن يكون أكبر من صفر"),

  cost_price: z.number({ invalid_type_error: "سعر الشراء يجب أن يكون رقم" }).positive("سعر الشراء يجب أن يكون أكبر من صفر"),
});
