// ContactForm API — request and response shape definitions
import { z } from "zod"

export const ContactFormRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormRequest = z.infer<typeof ContactFormRequestSchema>

export type ContactFormResponse = {
  id: string
  submittedAt: string
}

export type ApiError = {
  error: string
  details?: unknown
}
