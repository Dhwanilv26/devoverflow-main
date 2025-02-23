/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";
import Interaction from "@/database/interaction.model";
import mongoose from "mongoose";

export async function GetTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found.");
      throw new Error("User not found");
    }

    const userInteractions = await Interaction.find({ user: user._id })
      .populate({ path: "tags", model: "Tag" })
      .lean() // Ensures plain JSON objects
      .exec();

    const userTags: ITag[] = userInteractions.reduce(
      (tags: ITag[], interaction) => {
        const interactionTags = Array.isArray(interaction.tags)
          ? interaction.tags
          : interaction.tags
            ? [interaction.tags]
            : [];
        return tags.concat(interactionTags);
      },
      []
    );

    const tagCountMap = userTags.reduce(
      (countMap: Map<string, number>, tag: ITag) => {
        const tagId = tag._id.toString(); // 🔹 Convert `_id` to string
        countMap.set(tagId, (countMap.get(tagId) || 0) + 1);
        return countMap;
      },
      new Map<string, number>()
    );

    const sortedTags = Array.from(tagCountMap.entries()).sort(
      (a, b) => b[1] - a[1]
    );

    // Convert to expected format
    const top3Tags = sortedTags
      .slice(0, 3)
      .map(([id]) => {
        const tag = userTags.find((t) => t._id.toString() === id);
        return tag ? { _id: id, name: tag.name } : null;
      })
      .filter(Boolean);

    return top3Tags;
  } catch (error) {
    console.error("Error in GetTopInteractedTags:", error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 5 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;

      case "old":
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }
    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalTags = await Tag.countDocuments(query);

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 5, searchQuery } = params;

    const skipAmount = (page - 1) * pageSize;

    const isValidObjectId = mongoose.isValidObjectId(tagId);

    if (!isValidObjectId) {
      throw new Error("Invalid tagId");
    }

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    if (!tag) {
      throw new Error("Tag not found");
    }
    const questions = tag.questions;

    const isNext = tag.questions.length > pageSize;

    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
