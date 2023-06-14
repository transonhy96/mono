"use client";
import * as z from "zod";

export const SharingSchema = z.object({
  url: z
    .string()
    .regex(
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
      "Please enter youtube url"
    )
    .url("Please enter a valid url")
    .min(1, "Please provide your url to continue"),
});
