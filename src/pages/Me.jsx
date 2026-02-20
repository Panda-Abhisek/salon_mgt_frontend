import { useAuth } from "../auth/useAuth";

const Me = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>My Profile</h2>

      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <p>
        <strong>Roles:</strong>{" "}
        {user.roles?.join(", ")}
      </p>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Me;
