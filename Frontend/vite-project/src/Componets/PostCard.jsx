import React from "react";
import { MessageCircle, ThumbsUp, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function PostCard({ post }) {
  const navigate = useNavigate();
  if (!post) return null;
  return (
    <div className="rounded-2xl shadow-lg hover:shadow-xl transition bg-white overflow-hidden">
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
          {post.content}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags &&
            post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-200 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span>✍️ {post.author}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <button
            className="flex items-center gap-1 text-sm px-2 py-1 rounded hover:bg-gray-100"
            title="Like"
            aria-label="Like"
            type="button"
          >
            <ThumbsUp size={16} className="text-blue-500" />
            <span>{post.likes}</span>
          </button>
          <div className="flex items-center gap-1 text-gray-500">
            <Eye size={16} />
            <span>{post.views}</span>
          </div>
          <button
            onClick={() => navigate("/comments")}
            className="flex items-center gap-1 text-gray-500"
          >
            <MessageCircle size={16} />
            <span>{post.commentCount || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
