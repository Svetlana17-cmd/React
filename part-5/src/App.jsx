import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import RegisterForm from "./components/RegisterForm";
import userService from "./services/users";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    };
    fetchBlogs();
  }, []);

  const notify = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      notify("Login successful");
    } catch (error) {
      console.error("Wrong credentials or user not registered");
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  };
  const toggleForm = () => {
    setShowRegister(!showRegister);
  };
  const handleRegister = async (newUser) => {
    try {
      await userService.create(newUser);
      notify("Registration successful! You can now log in.");
      setShowRegister(false);
    } catch (error) {
      notify("Registration failed. Try a different username.");
    }
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      notify(`Blog ${blogObject.title} added`);
    } catch (error) {
      console.error("Blog creation failed. Please check all fields.");
    }
  };

  const handleLike = async (blog) => {
    try {
      const updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: (blog.likes || 0) + 1,
        user: typeof blog.user === "object" ? blog.user.id : blog.user,
      };
      console.log("📤 Sending updated blog to server:", updatedBlog);
      
      const returnedBlog = await blogService.update(blog._id, updatedBlog);
      returnedBlog.user = blog.user;
      console.log("✅ Server returned updated blog:", returnedBlog);
      returnedBlog.likes = updatedBlog.likes;
      setBlogs(blogs.map((b) => (b._id === blog._id ? returnedBlog : b)));
      notify(`You liked "${blog.title}"`);
    } catch (error) {
      console.error("AxiosError:", error.response?.data || error.message);
      notify("Failed to like the blog");
    }
  };
  
  const handleRemove = async (blog) => {
  const confirm = window.confirm(`Delete "${blog.title}" by ${blog.author}?`);
  if (!confirm) return;

  try {
    await blogService.remove(blog._id);
    setBlogs(blogs.filter((b) => b._id !== blog._id));
    notify(`Deleted "${blog.title}"`);
  } catch (error) {
    console.error("Delete failed:", error.response?.data || error.message);
    notify("Failed to delete blog");
  }
};


  if (user === null) {
    return (
      <div>
        <Notification message={notification} />
        {showRegister ? (
          <>
            <RegisterForm registerUser={handleRegister} />
            <p>
              Already have an account?{" "}
              <button onClick={toggleForm}>Login</button>
            </p>
          </>
        ) : (
          <>
            <LoginForm
              username={username}
              password={password}
              handleLogin={handleLogin}
              setUsername={setUsername}
              setPassword={setPassword}
            />
            <p>
              Don't have an account?{" "}
              <button onClick={toggleForm}>Register</button>
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog">
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>

      <div>
        {blogs.map((blog) => (
          <Blog 
          key={blog._id} 
          blog={blog} 
          handleLike={handleLike} 
          handleRemove={handleRemove}
          currentUser={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
