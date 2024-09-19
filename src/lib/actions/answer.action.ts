"use server";

import Question from "@/models/question.model";
import { connectToDatabase } from "../db/mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Answer from "@/models/answer.model";

export async function createAnswer(params: CreateAnswerParams) {
  // eslint-disable-next-line no-empty
  try {
    connectToDatabase();

    const { author, question, content, path } = params;

    // Create new answer
    const newAnswer = await Answer.create({ content, author, question });

    // Add the answer to the question's answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO: Add interaction...

    revalidatePath(path);
  } catch (error) {}
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
