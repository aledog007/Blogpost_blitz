import { z } from "zod"

export const CreatePostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Der Titel braucht mindestens 3 Zeichen")
    .max(120, "Der Titel darf höchstens 120 Zeichen lang sein"),
  content: z.string().trim().min(10, "Der Inhalt braucht mindestens 10 Zeichen"),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdatePostSchema = CreatePostSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeletePostSchema = z.object({
  id: z.number(),
})
