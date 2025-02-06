import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

const RightSidebar = () => {
  const hotQuestions = [
    { _id: "1", title: "Next js is the best" },
    { _id: "2", title: "Next js is the best" },
    { _id: "3", title: "Next js is the best" },
    { _id: "4", title: "Next js is the best" },
  ];

  const popularTags = [
    { _id: "1", name: "javascript", totalQuestions: 100 },
    { _id: "2", name: "typescript", totalQuestions: 200 },
    { _id: "3", name: "aws", totalQuestions: 50 },
    { _id: "4", name: "docker", totalQuestions: 150 },
    { _id: "5", name: "llms", totalQuestions: 200 },
  ];
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col  overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden w-[350px]">
      <div>
        <h3 className="h3-bold text-dark200_light900">
          Top Questions
          <div className="mt-7 flex w-full flex-col gap-[30px]">
            {hotQuestions.map((question) => (
              <Link
                href={`/question/${question._id}`}
                key={question._id}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">
                  {question.title}
                </p>

                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="Chevron Right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            ))}
          </div>
        </h3>
        <div className="mt-16">
          <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
          <div className="mt-7 flex flex-col gap-4">
            {popularTags.map((tag) => (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
