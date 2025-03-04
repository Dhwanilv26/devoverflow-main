import React from "react";

import type { Metadata } from "next";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";

import JobCard from "@/components/cards/JobCard";
import JobFilters from "@/components/shared/JobFilters";
import Pagination from "@/components/shared/Pagination";

import { Job } from "@/types";

import {
  fetchCountries,
  fetchJobs,
} from "@/lib/actions/job.action";

export const metadata: Metadata = {
  title: "Jobs | Devoverflow",
  description: "Find your dream job",
};

interface Props {
  searchParams: {
    q: string;
    location: string;
    page: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  // const userLocation = await fetchLocation();

  const jobs = await fetchJobs({
    query: `${searchParams.q}, ${searchParams.location}`,
    page: (searchParams.page ?? 1).toString(),
  });

  const countries = await fetchCountries();

  const page = parseInt(searchParams.page ?? '1');

  return (
    <>
      <div>
        <h1 className="h1-bold text-dark100_light900 text-center">Find Your Dream Job</h1>

        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchbar
            route="/jobs"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Job title, Company, or Keywords"
            otherClasses="flex-1"
          />
          <JobFilters countriesList={countries} />
        </div>
      </div>

      <section className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
        {jobs.length > 0 ? (
          jobs.map((job: Job) => {
            if (job.job_title && job.job_title.toLowerCase() !== "undefined")
              return <JobCard key={job.id} job={job} />;

            return null;
          })
        ) : (
          <p className="paragraph-regular text-dark200_light800 w-full text-center">
            Oops! We couldn&apos;t find any jobs at the moment. Please try again
            later
          </p>
        )}
      </section>

      {jobs.length > 0 && (
        <Pagination pageNumber={page} isNext={jobs.length === 10} />
      )}
    </>
  );
};

export default Page;
