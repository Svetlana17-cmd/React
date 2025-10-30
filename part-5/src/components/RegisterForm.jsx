import { useState } from "react";

const RegisterForm = ({ registerUser }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser({ username, name, password });
    setUsername("");
    setName("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
      <input
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        placeholder="Username"
      />
      <input
        value={name}
        onChange={({ target }) => setName(target.value)}
        placeholder="Name"
      />
      <input
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
