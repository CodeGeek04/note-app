"use server";

import { db } from "./db";

export const createUser = async (userName: string, password: string) => {
  return db.user.create({
    data: {
      userName,
      password,
    },
  });
};

export const checkPassword = async (userName: string, password: string) => {
  const user = await db.user.findUnique({
    where: {
      userName,
    },
  });
  if (!user) {
    return false;
  }
  return user.password === password;
};

export const getAllNotes = async () => {
  return db.note.findMany();
};

export const createNote = async (username: string, content: string) => {
  const author = await db.user.findUnique({
    where: {
      userName: username,
    },
  });
  if (!author) {
    throw new Error("User not found");
  }
  const note = await db.note.create({
    data: {
      authorId: author.id,
      authorName: author.userName,
      content,
    },
  });
  return note;
};
