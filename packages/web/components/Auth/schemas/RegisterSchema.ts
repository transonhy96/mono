"use client"
import * as z from "zod"

export const RegisterSchema = z.object({
    email: z.string().email("Please enter a valid email").min(1,"Please provide your email to continue"),
    password:z.string().min(1,"Password is missing"),
    reenter:z.string().min(1,"Missing reenter password")
}).refine((data) => data.password === data.reenter, {
    message: "Passwords do not match",
    path: ["reenter"],
});
