
import React from "react";

const comments = [
  {
    id: 1,
    author: "John Doe",
    content: "This is the first comment.",
    createdAt: "2024-07-27T10:00:00Z",
  },
  {
    id: 2,
    author: "Jane Smith",
    content: "This is a reply to the first comment.",
    createdAt: "2024-07-27T10:05:00Z",
  },
  {
    id: 3,
    author: "Peter Jones",
    content: "This is another comment.",
    createdAt: "2024-07-27T10:10:00Z",
  },
];

export default function Comments() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <p className="font-bold">{comment.author}</p>
              <span className="text-gray-500 text-sm ml-2">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Leave a comment</h2>
        <form>
          <textarea
            className="w-full p-2 border rounded-lg"
            rows="4"
            placeholder="Write your comment here..."
          ></textarea>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
