"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";

const SearchableTypes = ["question", "answer", "user", "tag"];

export async function globalSearch(params: SearchParams) {
  try {
    await connectToDatabase();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    const results = [];

    const modelsAndTypes = [
      { model: Question, searchFields: ["title", "content"], type: "question" },
      { model: User, searchFields: ["name", "username"], type: "user" },
      { model: Answer, searchFields: ["content"], type: "answer" },
      { model: Tag, searchFields: ["name"], type: "tag" },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // SEARCH ACROSS EVERYTHING

      // we cant use for each and map with async ,await .. use for of loop only

      for (const { model, searchFields, type } of modelsAndTypes) {
        for (const searchField of searchFields) {
          const queryResults = await model
            .find({ [searchField]: regexQuery })
            .limit(2);

          results.push(
            ...queryResults.map((item) => ({
              title:
                type === "answer"
                  ? `Answers containing ${query}`
                  : item[searchField],
              type,
              id:
                type === "user"
                  ? item.clerkId
                  : type === "answer"
                    ? item.question
                    : item._id,
            }))
          );
        }
      }
    } else {
      // SEARCH IN THE SPECIFIED MODEL TYPE
      const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);

      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      for (const searchField of modelInfo.searchFields) {
        const queryResults = await modelInfo.model
          .find({ [searchField]: regexQuery })
          .limit(8);

        results.push(
          ...queryResults.map((item) => ({
            title:
              typeLower === "answer"
                ? `Answers containing ${query}`
                : item[searchField],
            type: typeLower,
            id:
              typeLower === "user"
                ? item.clerkId
                : typeLower === "answer"
                  ? item.question
                  : item._id,
          }))
        );
      }
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(`Error fetching global results, ${error}`);
    throw error;
  }
}
