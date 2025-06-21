'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type CreateJob = {
  title: string;
  summary: string;
  description: string;
  requirements: string;
  responsibilities: string;
  requiredSkills: string;
  niceToHaveSkills: string;
  experienceYears: number;
  isRemote: boolean;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  benefits: string;
  tags: string;
    companyName: string;
    companyDescription: string;
    companyLocations: string;
    companyWebsite: string;
    deadline: string;
};
type JobPost = {
  _id: string;
  title: string;
  summary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  requiredSkills: string[];
  niceToHaveSkills: string[];
  experienceYears: number;
  isRemote: boolean;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  benefits: string[];
  tags: string[];
  company: {
    name: string;
    description: string;
    locations: string[];
    website: string;
  };
  deadline: string;    // ISO date string
  createdAt: string;   // ISO date string
  updatedAt: string;   // ISO date string
};


export default function JobBoard() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [form, setForm] = useState<CreateJob>({
    title: "Senior Python Developer",
    summary: "We are looking for a highly experienced Senior Backend Engineer with deep expertise in Python, Django, and DRF.",
    description: "This role offers the opportunity to work on a modern, modular backend stack featuring Celery, Docker, CI/CD pipelines, and cloud-native infrastructure.",
    requirements: "4+ years of experience with Python, Django, and DRF\nExperience with Celery and PostgreSQL\nKnowledge of CI/CD, Docker, and AWS",
    responsibilities: "Design and maintain backend services using Django\nBuild scalable RESTful APIs\nImplement background tasks with Celery\nCollaborate with frontend and DevOps teams",
    requiredSkills: "Python,Django,Django REST Framework,PostgreSQL,Celery,Docker,AWS,Git,CI/CD,TDD",
    niceToHaveSkills: "React,ETL pipelines,Nginx,Microservices",
    experienceYears: 4,
    isRemote: true,
    salaryMin: 150000,
    salaryMax: 200000,
    currency: "PKR",
    benefits: "Health Insurance\nProvident Fund\nAnnual Paid Leaves\nCertifications & Training\nCar & Bike Finance\nChild Education Program\nTwo Annual Trips\nStars of the Month\nReferral Bonuses\nBirthday & Eid Gifts",
    tags: "Senior,Backend,Python,Remote,Django,Celery",
    companyName: "PureLogics",
    companyDescription: "A full-service technology company with 18+ years of experience and offices in the USA, UAE, and Pakistan.",
    companyLocations: "USA,UAE,Lahore",
    companyWebsite: "https://purelogics.net",
    deadline: "2025-07-21"
  });


  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:8000/job-posts");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      title: form.title,
      summary: form.summary,
      description: form.description,
      requirements: form.requirements.split("\n"),
      responsibilities: form.responsibilities.split("\n"),
      requiredSkills: form.requiredSkills.split(","),
      niceToHaveSkills: form.niceToHaveSkills.split(","),
      experienceYears: form.experienceYears,
      isRemote: form.isRemote,
      salary: {
        min: form.salaryMin,
        max: form.salaryMax,
        currency: form.currency,
      },
      benefits: form.benefits.split("\n"),
      tags: form.tags.split(","),
      company: {
        name: form.companyName,
        description: form.companyDescription,
        locations: form.companyLocations.split(","),
        website: form.companyWebsite,
      },
      deadline: form.deadline,
    };

    await axios.post("http://localhost:8000/upload-job-post", payload);
    await fetchJobs();
  };

  const handleDelete = async (id : string) => {
    await axios.delete(`http://localhost:8000/delete-job/${id}`);
    await fetchJobs();
  };

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="pb-2">Title</Label>
          <Input name="title" value={form.title} onChange={handleChange} />
        </div>
        <div>
          <Label className="pb-2">Summary</Label>
          <Input name="summary" value={form.summary} onChange={handleChange} />
        </div>
        <div>
          <Label className="pb-2">Deadline</Label>
          <Input name="deadline" type="date" value={form.deadline} onChange={handleChange} />
        </div>
        <div className="md:col-span-3">
          <Label className="pb-2">Description</Label>
          <Textarea name="description" value={form.description} onChange={handleChange} />
        </div>
        <div className="md:col-span-3">
          <Label className="pb-2">Requirements (1 per line)</Label>
          <Textarea name="requirements" value={form.requirements} onChange={handleChange} />
        </div>
        <div className="md:col-span-3">
          <Label className="pb-2">Responsibilities (1 per line)</Label>
          <Textarea name="responsibilities" value={form.responsibilities} onChange={handleChange} />
        </div>
        <div>
          <Label className="pb-2">Required Skills (comma separated)</Label>
          <Input name="requiredSkills" value={form.requiredSkills} onChange={handleChange} />
        </div>
        <div>
          <Label className="pb-2">Nice to Have Skills (comma separated)</Label>
          <Input name="niceToHaveSkills" value={form.niceToHaveSkills} onChange={handleChange} />
        </div>
        <div>
          <Label className="pb-2">Experience Years</Label>
          <Input type="number" name="experienceYears" value={form.experienceYears} onChange={handleChange} />
        </div>
        <div>
          <Label className="pb-2">Is Remote?</Label>
          <Input type="checkbox" name="isRemote" checked={form.isRemote} onChange={handleChange} />
        </div>
        <div>
          <Label className="pb-2">Salary Min</Label>
          <Input type="number" name="salaryMin" value={form.salaryMin} onChange={handleChange} />
        </div>
        <div>
          <Label className="pb-2">Salary Max</Label>
          <Input type="number" name="salaryMax" value={form.salaryMax} onChange={handleChange} />
        </div>
        <div>
          <Label className="pb-2">Currency</Label>
          <Input name="currency" value={form.currency} onChange={handleChange} />
        </div>
        <div className="md:col-span-3">
          <Label className="pb-2">Benefits (1 per line)</Label>
          <Textarea name="benefits" value={form.benefits} onChange={handleChange} />
        </div>
        <div>
          <Label className="pb-2">Tags (comma separated)</Label>
          <Input name="tags" value={form.tags} onChange={handleChange} />
        </div>
        <div>
          <Label className="pb-2">Company Name</Label>
          <Input name="companyName" value={form.companyName} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <Label className="pb-2">Company Description</Label>
          <Textarea name="companyDescription" value={form.companyDescription} onChange={handleChange} />
        </div>
        <div>
          <Label className="pb-2">Company Locations (comma separated)</Label>
          <Input name="companyLocations" value={form.companyLocations} onChange={handleChange} />
        </div>
        <div>
          <Label className="pb-2">Company Website</Label>
          <Input name="companyWebsite" value={form.companyWebsite} onChange={handleChange} />
        </div>
      </div>
      <Button onClick={handleSubmit}>Submit Job</Button>

      <div className="space-y-4 pt-6">
     {jobs.map((job) => (
  <Card key={job._id} className="bg-green-100 p-4 rounded-xl shadow-md">
    <CardContent className="flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">{job.title}</h2>
          <p className="text-sm text-gray-600">
            {job.company?.name} — {job.company?.locations?.join(", ")}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Salary: {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
          </p>
          <p className="text-xs text-gray-500">
            Deadline: {new Date(job.deadline).toLocaleDateString()}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {job.tags.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="bg-blue-200 text-xs text-blue-800 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Button variant="secondary" onClick={() => handleDelete(job._id)}>
            Delete
          </Button>
          {/* Future View Details button */}
          {/* <Button variant="outline">View Details</Button> */}
        </div>
      </div>
    </CardContent>
  </Card>
))}

      </div>
    </div>
  );
}
