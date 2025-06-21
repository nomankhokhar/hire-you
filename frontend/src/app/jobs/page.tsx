"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateJob from "@/components/CreateJob";
import ListedJobs from "@/components/ListedJobs";
import toast from "react-hot-toast";
import { JobFormType } from "@/zod/jobSchema";


export type createJob = {
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
export type jobPost = {
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
  deadline: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export default function JobBoard() {
  const [jobs, setJobs] = useState<jobPost[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<createJob>({
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
  });

  const [viewDatils, setViewDetails] = useState<jobPost | null>(null);
  const handleViewDetails = (id: string) => {
    const job = jobs.find((job) => job._id === id);
    if (job) {
      setViewDetails(job);
      setOpen(true);
    }
  };

  const fetchJobs = async () => {
    const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL +"/job-posts");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);
 const handleCreateJob = async (data: JobFormType) => {
  const payload = {
    ...data,
    requirements: data.requirements.split("\n"),
    responsibilities: data.responsibilities.split("\n"),
    requiredSkills: data.requiredSkills.split(","),
    niceToHaveSkills: (data.niceToHaveSkills ?? "").split(","),
    benefits: data.benefits.split("\n"),
    tags: data.tags.split(","),
    company: {
      name: data.companyName,
      description: data.companyDescription,
      locations: data.companyLocations.split(","),
      website: data.companyWebsite,
    },
    salary: {
      min: data.salaryMin,
      max: data.salaryMax,
      currency: data.currency,
    },
  };

  const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/upload-job-post", payload);

  if (res.status !== 200) {
    toast.error("Failed to create job");
    return;
  }
  fetchJobs();
  toast.success("Job created successfully");
};


  const handleDelete = async (id: string) => {
    const res = await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL + `/delete-job/${id}`);
    if (res.status !== 200) {
      toast.error("Failed to delete job");
      return;
    }
    await fetchJobs();
    toast.success("Job deleted successfully");
  };

  return (
    <div className="p-6 space-y-8">
      <Tabs defaultValue="create-job">
        <TabsList>
          <TabsTrigger value="create-job">Create Job</TabsTrigger>
          <TabsTrigger value="listed-job">Listed Job</TabsTrigger>
        </TabsList>
        <TabsContent value="create-job">
        <CreateJob onSubmit={handleCreateJob} />

        </TabsContent>
        <TabsContent value="listed-job">
          <ListedJobs
            jobs={jobs}
            handleDelete={handleDelete}
            handleViewDetails={handleViewDetails}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] h-[calc(100vh-200px)] overflow-auto">
          <DialogHeader>
            <DialogTitle>Job Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm text-gray-700">
            <h2 className="text-xl font-semibold text-primary">
              {viewDatils?.title}
            </h2>
            <p>{viewDatils?.summary}</p>

            <h3 className="text-lg font-semibold mt-4">
              Advanced Features & Technologies
            </h3>
            <ul className="list-disc pl-5">
              {viewDatils?.description
                .split("\n")
                .map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>

            <h3 className="text-lg font-semibold mt-4">Responsibilities</h3>
            <ul className="list-disc pl-5">
              {viewDatils?.responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mt-4">Requirements</h3>
            <ul className="list-disc pl-5">
              {viewDatils?.requirements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            {(viewDatils?.niceToHaveSkills ?? []).length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-4">Nice to Have</h3>
                <ul className="list-disc pl-5">
                  {(viewDatils?.niceToHaveSkills ?? []).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            <h3 className="text-lg font-semibold mt-4">Required Skills</h3>
            <ul className="list-disc pl-5">
              {viewDatils?.requiredSkills.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mt-4">Experience</h3>
            <p>Min {viewDatils?.experienceYears} years</p>

            <h3 className="text-lg font-semibold mt-4">About Us</h3>
            <p>{viewDatils?.company.description}</p>

            <h3 className="text-lg font-semibold mt-4">
              What are we offering?
            </h3>
            <ul className="list-disc pl-5">
              {viewDatils?.benefits.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <div className="mt-6 text-xs text-gray-500">
              <p>
                Location: {viewDatils?.company.locations.join(", ")} | Deadline:{" "}
                {new Date(viewDatils?.deadline ?? "").toLocaleDateString()}
              </p>
              <p>
                Website:{" "}
                <a
                  href={viewDatils?.company.website}
                  className="text-blue-600 underline"
                  target="_blank"
                >
                  {viewDatils?.company.website}
                </a>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
