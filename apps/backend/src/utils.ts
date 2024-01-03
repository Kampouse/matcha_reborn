import { zu } from "zod_utilz";
import z from "zod";
import type { H3Event } from "h3";
import { readBody } from "h3";
export const readZodBody = async <T extends z.ZodType>(
  event: H3Event,
  schema: T,
): Promise<{ success: boolean; data: z.infer<T> }> => {
  try {
    const jsonparser = zu.stringToJSON();
    const body = await readBody(event);
    const parsed = jsonparser.parse(body);
    const validated = schema.safeParse(parsed);
    if (validated.success) {
      return { success: validated.success, data: validated.data };
    }

  } catch (error) {
    return { success: false, data: error };
  }
   const error = z.object({ error: z.string() }).safeParse({ error: "invalid request" });
  return { success: false, data: error };
};
