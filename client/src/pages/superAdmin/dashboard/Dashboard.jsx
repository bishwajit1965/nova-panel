import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  const [data, setData] = useState([]);
  const handlePush = () => {
    const nextData = [];
    for (let index = 0; index <= 20; index++) {
      const element = index;
      nextData.push(element);
    }
    setData(nextData);
  };

  const handleClear = () => {
    setData([]);
  };

  return (
    <div>
      <h1 className="lg:text-3xl text-xl font-bold">
        Super Admin Dashboard • {user?.name} {user?.email}
      </h1>

      <div className="">{data.join(", ")}</div>

      <div className="">
        {data.map((d, index) => (
          <p key={index}>{index + 1 + ". "} Hello Bangladesh, How are you?</p>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button onClick={handlePush}>Push</button>
        {data.length > 0 ? <button onClick={handleClear}>Clear</button> : ""}
      </div>
    </div>
  );
};

export default Dashboard;
