import { z } from "zod"

export const CreatePostSchema = z.object({
  title: z.string(),
  content: z.string(),
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
