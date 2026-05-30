import { useAuth } from "../../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <p>Admin Dashboard → {user ? `Welcome, ${user.name}!` : "Welcome!"}</p>
    </div>
  );
};

export default Dashboard;
