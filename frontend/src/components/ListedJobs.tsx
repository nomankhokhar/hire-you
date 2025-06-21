import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { jobPost } from "@/app/jobs/page";
import { Button } from "./ui/button";

const ListedJobs = ({
  jobs,
  handleDelete,
  handleViewDetails,
}: {
  jobs: jobPost[];
  handleDelete: (id: string) => void;
  handleViewDetails: (id: string) => void;
}) => {
  return (
    <div className="space-y-4 pt-6">
      {jobs.length === 0 && (
        <div className="text-center text-gray-500">
          No jobs listed yet. Start by creating a new job post.
        </div>
      )}
      {jobs.map((job) => (
        <Card key={job._id} className="p-4 shadow-md">
          <CardHeader>
            <h2 className="text-xl font-semibol">{job.title}</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">
                  {job.company?.name} — {job.company?.locations?.join(", ")}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Salary: {job.salary.min.toLocaleString()} -{" "}
                  {job.salary.max.toLocaleString()} {job.salary.currency}
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
                <Button
                  variant="secondary"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </Button>
                <Button onClick={() => handleViewDetails(job._id)}>
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListedJobs;
