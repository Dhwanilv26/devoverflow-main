import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const questions = [
  {
    _id: "65a1b2c3d4e5f6a7b8c9d0e1",
    title: "How does JavaScript handle asynchronous operations?",
    tags: [
      { _id: "101", name: "JavaScript" },
      { _id: "102", name: "Async" },
      { _id: "103", name: "Promises" },
    ],
    author: {
      _id: "501",
      name: "John Doe",
      picture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    upvotes: 120,
    views: 1500,
    answers: [{}],
    createdAt: new Date("2025-01-10T10:30:00Z"),
  },
  {
    _id: "65a2b3c4d5e6f7a8b9c0d1e2",
    title: "What is the difference between let, var, and const in JavaScript?",
    tags: [
      { _id: "101", name: "JavaScript" },
      { _id: "104", name: "Variables" },
    ],
    author: {
      _id: "502",
      name: "Jane Smith",
      picture: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    upvotes: 200,
    views: 2300,
    answers: [{}],
    createdAt: new Date("2025-01-20T12:15:00Z"),
  },
  {
    _id: "65a3b4c5d6e7f8a9b0c1d2e3",
    title: "How do you optimize MongoDB queries for large datasets?",
    tags: [
      { _id: "105", name: "MongoDB" },
      { _id: "106", name: "Database Optimization" },
    ],
    author: {
      _id: "503",
      name: "Alice Brown",
      picture: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    upvotes: 90,
    views: 800,
    answers: [{}],
    createdAt: new Date("2025-01-28T08:45:00Z"),
  },
  {
    _id: "65a4b5c6d7e8f9a0b1c2d3e4",
    title: "What are React hooks, and how do they work?",
    tags: [
      { _id: "107", name: "React" },
      { _id: "108", name: "Hooks" },
    ],
    author: {
      _id: "504",
      name: "Robert Johnson",
      picture: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    upvotes: 175,
    views: 2200,
    answers: [{}],
    createdAt: new Date("2025-02-02T14:20:00Z"),
  },
  {
    _id: "65a5b6c7d8e9f0a1b2c3d4e5",
    title: "How to handle authentication in Next.js?",
    tags: [
      { _id: "107", name: "Next.js" },
      { _id: "109", name: "Authentication" },
    ],
    author: {
      _id: "505",
      name: "Michael Lee",
      picture: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    upvotes: 250,
    views: 3000,
    answers: [{}],
    createdAt: new Date("2025-02-05T16:10:00Z"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
