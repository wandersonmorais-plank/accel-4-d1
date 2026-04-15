// ContactForm route — POST /api/contact-form
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import {
  ContactFormRequestSchema,
  type ContactFormResponse,
  type ApiError,
} from "@/lib/api/contact-form.types"

export const POST = async (
  req: NextRequest,
): Promise<NextResponse<ContactFormResponse | ApiError>> => {
  try {
    const body: unknown = await req.json()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const parsed = ContactFormRequestSchema.parse(body)

    // TODO: implement handler logic using `parsed` — remove the eslint-disable above once used
    const response: ContactFormResponse = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
    }

    return NextResponse.json(response, { status: 201 })
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid request body", details: err.flatten().fieldErrors },
        { status: 422 },
      )
    }

    console.error("[POST /api/contact-form]", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
