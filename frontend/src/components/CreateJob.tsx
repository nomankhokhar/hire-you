import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { jobSchema } from '@/zod/jobSchema';

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
      deadline: "2025-07-21"
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Title</Label>
          <Input {...register("title")} />
        </div>
        <div>
          <Label>Summary</Label>
          <Input {...register("summary")} />
        </div>
        <div>
          <Label>Deadline</Label>
          <Input type="date" {...register("deadline")} />
        </div>
        <div className="md:col-span-3">
          <Label>Description</Label>
          <Textarea {...register("description")} />
        </div>
        <div className="md:col-span-3">
          <Label>Requirements (1 per line)</Label>
          <Textarea {...register("requirements")} />
        </div>
        <div className="md:col-span-3">
          <Label>Responsibilities (1 per line)</Label>
          <Textarea {...register("responsibilities")} />
        </div>
        <div>
          <Label>Required Skills (comma separated)</Label>
          <Input {...register("requiredSkills")} />
        </div>
        <div>
          <Label>Nice to Have Skills (comma separated)</Label>
          <Input {...register("niceToHaveSkills")} />
        </div>
        <div>
          <Label>Experience Years</Label>
          <Input type="number" {...register("experienceYears")} />
        </div>
        <div>
          <Label>Is Remote?</Label>
          <Input type="checkbox" {...register("isRemote")} />
        </div>
        <div>
          <Label>Salary Min</Label>
          <Input type="number" {...register("salaryMin")} />
        </div>
        <div>
          <Label>Salary Max</Label>
          <Input type="number" {...register("salaryMax")} />
        </div>
        <div>
          <Label>Currency</Label>
          <Input {...register("currency")} />
        </div>
        <div className="md:col-span-3">
          <Label>Benefits (1 per line)</Label>
          <Textarea {...register("benefits")} />
        </div>
        <div>
          <Label>Tags (comma separated)</Label>
          <Input {...register("tags")} />
        </div>
        <div>
          <Label>Company Name</Label>
          <Input {...register("companyName")} />
        </div>
        <div className="md:col-span-2">
          <Label>Company Description</Label>
          <Textarea {...register("companyDescription")} />
        </div>
        <div>
          <Label>Company Locations (comma separated)</Label>
          <Input {...register("companyLocations")} />
        </div>
        <div>
          <Label>Company Website</Label>
          <Input {...register("companyWebsite")} />
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button type="submit">Submit Job</Button>
      </div>
    </form>
  );
};

export default CreateJob;
