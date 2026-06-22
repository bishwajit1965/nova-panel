import { LucideCircleAlert } from "lucide-react";
import Button from "../../../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();
  return (
    <div className="text-base-content/70 rounded-2xl min-h-[calc(100vh-200px)] flex items-center justify-center max-w-2xl mx-auto ">
      <div className="bg-base-300 flex items-center justify-center lg:p-8 p-4 max-w-xls shadow-md hover:shadow-xl rounded-2xl">
        <div className="flex justify-center">
          <div className="space-y-2 text-center">
            <div className="flex justify-center">
              <LucideCircleAlert className="h-10 w-10 text-red-500" />
            </div>
            <h1 className="lg:text-3xl text-xl font-extrabold">
              Your Access is Denied Here.
            </h1>
            <p>You do not have the required permission.</p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
