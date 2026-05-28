import { useAuth } from "../../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      Dashboard
      <p>{user ? `Welcome, ${user.name}!` : "Welcome!"}</p>
    </div>
  );
};

export default Dashboard;
