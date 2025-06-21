import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(3),
  summary: z.string().min(10),
  description: z.string().min(20),
  requirements: z.string().min(10),
  responsibilities: z.string().min(10),
  requiredSkills: z.string().min(3),
  niceToHaveSkills: z.string().optional(),
  experienceYears: z.coerce.number().min(0),
  isRemote: z.boolean(),
  salaryMin: z.coerce.number().min(0),
  salaryMax: z.coerce.number().min(0),
  currency: z.string().length(3),
  benefits: z.string().min(5),
  tags: z.string(),
  companyName: z.string(),
  companyDescription: z.string().min(10),
  companyLocations: z.string().min(3),
  companyWebsite: z.string().url(),
  deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
});

export type JobFormType = z.infer<typeof jobSchema>;
