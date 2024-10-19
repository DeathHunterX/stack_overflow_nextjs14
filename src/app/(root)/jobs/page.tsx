"use client";

import JobCard from "@/components/shared/cards/JobCard";
import ComboboxFilter from "@/components/shared/filter/ComboboxFilter";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CountryFilters } from "@/constants/filters";
import { SearchParamsProps } from "@/types";

import React, { useEffect, useState } from "react";

const JobsPage = ({ searchParams }: SearchParamsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([{}]);

  const [urlQuery, setUrlQuery] = useState({
    q: searchParams.q || "",
    country: searchParams.country || "",
    pages: searchParams.page ? searchParams.page : 1,
  });

  const getJobs = async () => {
    try {
      setIsLoading(true);
      const country =
        searchParams.country ||
        (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ip-api`)
          .then((res) => res.json())
          .then((data) => data.resData.countryCode)) ||
        "US";

      setUrlQuery((prev) => ({ ...prev, country }));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jsearch?page=${urlQuery.pages}&q=${urlQuery.q}&country=${country}`
      );
      const responseData = await response.json();

      setData(responseData.data);
      setIsLoading(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.page]);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/jobs"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job Title, Company, or Keywords"
          otherClasses="flex-1"
        />

        <ComboboxFilter
          filters={CountryFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px] flex-1"
          imgSrc="/assets/icons/location.svg"
          paramsKey="country"
        />

        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          onClick={() => getJobs()}
        >
          Find Job
        </Button>
      </div>

      {isLoading ? (
        <section className="mt-10 flex flex-col gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <Skeleton key={item} className="h-48 w-full rounded-xl" />
          ))}
        </section>
      ) : (
        <>
          <section className="mt-10 flex w-full flex-col gap-6">
            {data?.length > 0 ? (
              data?.map((job: any, index: number) => (
                <JobCard
                  key={index}
                  id={job.job_id}
                  employer_name={job.employer_name}
                  employer_logo={job.employer_logo}
                  employer_website={job.employer_website}
                  job_employment_type={job.job_employment_type}
                  job_title={job.job_title}
                  job_description={job.job_description}
                  job_apply_link={job.job_apply_link}
                  job_city={job.job_city}
                  job_state={job.job_state}
                  job_country={job.job_country}
                  job_salary_currency={job.job_salary_currency}
                  job_min_salary={job.job_min_salary}
                  job_max_salary={job.job_max_salary}
                  job_posted_at_datetime_utc={job.job_posted_at_datetime_utc}
                  employer_company_type={job.employer_company_type}
                />
              ))
            ) : (
              <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
                <p>No current jobs yet</p>
              </div>
            )}
          </section>

          {data?.length > 0 &&
            Number(searchParams.page ? +searchParams.page : 1) >= 1 && (
              <div className="mt-10">
                <Pagination
                  pageNumber={searchParams?.page ? +searchParams.page : 1}
                  isNext={data.length !== 0}
                />
              </div>
            )}
        </>
      )}
    </>
  );
};

export default JobsPage;
