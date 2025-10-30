import { useState } from "react";

const Blog = ({ blog, handleLike, handleRemove, currentUser }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!visible);

  // Adding owner verification
  const isOwner =
    currentUser &&
    blog.user &&
    (typeof blog.user === "object"
      ? blog.user.id === currentUser.id
      : blog.user === currentUser.id);

  return (
    <div style={{ border: "1px solid", padding: "10px", marginBottom: "5px" }}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}{" "}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {isOwner && (
            <button onClick={() => handleRemove(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
