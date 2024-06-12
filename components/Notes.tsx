"use client";

import { useEffect, useState } from "react";
import { getAllNotes, createNote } from "../server/serverActions";
import { Note } from "@prisma/client";

export default function Notes({ username }: { username: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setNotes(await getAllNotes());
    })();
  }, []);

  const onSubmit = async () => {
    setError(null);
    try {
      await createNote(username, content);
      alert("Note created");
      setContent("");
      setNotes(await getAllNotes());
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md w-full max-w-xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Notes</h1>
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-black w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onSubmit}
          className="w-full px-4 py-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Create note
        </button>
        {error && <div className="mt-4 text-red-500">{error}</div>}
        <ul className="w-full mt-6 space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="p-4 border rounded bg-gray-500">
              <p className="font-bold">Author: {note.authorName}</p>
              <p>Content: {note.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
