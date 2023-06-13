"use client"
import * as z from "zod"

export const SharingSchema = z.object({
  url: z.string().url("Please enter a valid url").min(1,"Please provide your url to continue"),
})
