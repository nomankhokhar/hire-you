import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { jobSchema } from "@/zod/jobSchema";

type JobForm = z.infer<typeof jobSchema>;

const CreateJob = ({ onSubmit }: { onSubmit: (data: JobForm) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobForm>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "Senior Python Developer",
      summary:
        "We are looking for a highly experienced Senior Backend Engineer with deep expertise in Python, Django, and DRF.",
      description:
        "This role offers the opportunity to work on a modern, modular backend stack featuring Celery, Docker, CI/CD pipelines, and cloud-native infrastructure.",
      requirements:
        "4+ years of experience with Python, Django, and DRF\nExperience with Celery and PostgreSQL\nKnowledge of CI/CD, Docker, and AWS",
      responsibilities:
        "Design and maintain backend services using Django\nBuild scalable RESTful APIs\nImplement background tasks with Celery\nCollaborate with frontend and DevOps teams",
      requiredSkills:
        "Python,Django,Django REST Framework,PostgreSQL,Celery,Docker,AWS,Git,CI/CD,TDD",
      niceToHaveSkills: "React,ETL pipelines,Nginx,Microservices",
      experienceYears: 4,
      isRemote: true,
      salaryMin: 150000,
      salaryMax: 200000,
      currency: "PKR",
      benefits:
        "Health Insurance\nProvident Fund\nAnnual Paid Leaves\nCertifications & Training\nCar & Bike Finance\nChild Education Program\nTwo Annual Trips\nStars of the Month\nReferral Bonuses\nBirthday & Eid Gifts",
      tags: "Senior,Backend,Python,Remote,Django,Celery",
      companyName: "PureLogics",
      companyDescription:
        "A full-service technology company with 18+ years of experience and offices in the USA, UAE, and Pakistan.",
      companyLocations: "USA,UAE,Lahore",
      companyWebsite: "https://purelogics.net",
      deadline: "2025-07-21",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="mb-2">Title</Label>
          <Input placeholder="Add job title" {...register("title")} />
        </div>
        <div>
          <Label className="mb-2">Summary</Label>
          <Input placeholder="Add job summery" {...register("summary")} />
        </div>
        <div>
          <Label className="mb-2">Deadline</Label>
          <Input  type="date" {...register("deadline")} />
        </div>
        <div className="md:col-span-3">
          <Label className="mb-2">Description</Label>
          <Textarea placeholder="Add job description" {...register("description")} />
        </div>
        <div className="md:col-span-3">
          <Label className="mb-2">Requirements (1 per line)</Label>
          <Textarea placeholder="Add job requirements" {...register("requirements")} />
        </div>
        <div className="md:col-span-3">
          <Label className="mb-2">Responsibilities (1 per line)</Label>
          <Textarea placeholder="Add job responsibilities" {...register("responsibilities")} />
        </div>
        <div>
          <Label className="mb-2">Required Skills (comma separated)</Label>
          <Input placeholder="Add required skills" {...register("requiredSkills")} />
        </div>
        <div>
          <Label className="mb-2">Nice to Have Skills (comma separated)</Label>
          <Input placeholder="Add nice to have skills" {...register("niceToHaveSkills")} />
        </div>
        <div>
          <Label className="mb-2">Experience Years</Label>
          <Input placeholder="Add experience years" type="number" {...register("experienceYears")} />
        </div>
        <div className="flex items-center justify-between mt-4">
          <Label className="mb-2">This is the Remote Postion?</Label>
          <Input
            type="checkbox"
            {...register("isRemote")}
            className="w-4 h-4 accent-blue-600 rounded"

          />
        </div>
        <div>
          <Label className="mb-2">Salary Min</Label>
          <Input placeholder="Add salary min" type="number" {...register("salaryMin")} />
        </div>
        <div>
          <Label className="mb-2">Salary Max</Label>
          <Input placeholder="Add salary max" type="number" {...register("salaryMax")} />
        </div>
        <div>
          <Label className="mb-2">Currency</Label>
          <Input placeholder="Add currency" {...register("currency")} />
        </div>
        <div className="md:col-span-3">
          <Label className="mb-2">Benefits (1 per line)</Label>
          <Textarea placeholder="Add benefits" {...register("benefits")} />
        </div>
        <div>
          <Label className="mb-2">Tags (comma separated)</Label>
          <Input placeholder="Add tags" {...register("tags")} />
        </div>
        <div>
          <Label className="mb-2">Company Name</Label>
          <Input placeholder="Add company name" {...register("companyName")} />
        </div>
        <div className="md:col-span-2">
          <Label className="mb-2">Company Description</Label>
          <Textarea placeholder="Add company description" {...register("companyDescription")} />
        </div>
        <div>
          <Label className="mb-2">Company Locations (comma separated)</Label>
          <Input placeholder="Add company locations" {...register("companyLocations")} />
        </div>
        <div>
          <Label className="mb-2">Company Website</Label>
          <Input placeholder="Add company website" {...register("companyWebsite")} />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button type="submit">Submit Job</Button>
      </div>
    </form>
  );
};

export default CreateJob;
