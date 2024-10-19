/* eslint-disable camelcase */

import Link from "next/link";
import Metric from "../Metric";
import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import { Job } from "@/types";
import { Badge } from "@/components/ui/badge";

const JobCard = ({
  id,
  employer_name,
  employer_logo,
  employer_website,
  job_employment_type,
  job_title,
  job_description,
  job_apply_link,
  job_city,
  job_state,
  job_country,
  job_salary_currency,
  job_min_salary,
  job_max_salary,
  job_posted_at_datetime_utc,
  employer_company_type,
}: Job) => {
  return (
    <div className="card-wrapper flex flex-row rounded-[10px] p-9 sm:px-11">
      <div>
        <div className="background-light700_dark300 flex items-start justify-start rounded-[10px] p-3">
          <Image
            src={employer_logo || "/assets/images/site-logo.svg"}
            alt="company picture"
            width={83}
            height={83}
            className="rounded-[10px]"
          />
        </div>
      </div>

      <div className="w-full pl-6">
        <div className="flex flex-col-reverse items-start justify-start gap-5 sm:flex-row">
          <Link href={`/jobs/${id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {job_title}
            </h3>
          </Link>
          {employer_company_type && (
            <div className="hidden justify-between gap-2 lg:flex">
              <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
                {employer_company_type}
              </Badge>
            </div>
          )}

          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(new Date(job_posted_at_datetime_utc || ""))}
          </span>
        </div>

        <div className="flex w-5/6 flex-col-reverse items-start justify-between gap-5 sm:flex-row">
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden"></span>
          <p className="body-regular text-dark400_light500 mt-1 line-clamp-2">
            {job_description}
          </p>
        </div>

        <div className="flex-between mt-6 w-full flex-wrap gap-3">
          <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
            <Metric
              imgUrl="/assets/icons/clock.svg"
              alt="employment_type"
              value={job_employment_type || ""}
              title=""
              textStyles="small-medium text-dark400_light800 capitalize"
            />

            <Metric
              imgUrl="/assets/icons/currency-dollar-circle.svg"
              alt="message"
              value={
                (job_salary_currency !== null
                  ? job_salary_currency
                  : "Not Disclosed") || ""
              }
              title=""
              textStyles="small-medium text-dark400_light800"
            />

            <div className="hidden md:block">
              <Metric
                imgUrl="/assets/icons/calendar.svg"
                alt="posted-date"
                value={
                  getTimestamp(new Date(job_posted_at_datetime_utc || "")) || ""
                }
                title=""
                textStyles="small-medium text-dark400_light800 "
              />
            </div>
          </div>

          <Link href={job_apply_link || ""} className="flex flex-row">
            <span className="primary-text-gradient pr-1 font-bold">
              View job
            </span>

            <Image
              src="assets/icons/arrow-up-right.svg"
              width={22}
              height={22}
              alt="redirect icon"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
