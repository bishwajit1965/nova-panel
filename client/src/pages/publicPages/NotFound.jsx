import { LucideIcon } from "../../components/lib/LucideIcons";
import Button from "../../components/ui/Button";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center">
      <div className="max-w-lg border p-8 bg-base-300 border-base-content/15 rounded-lg shadow-lg hover:shadow-xl space-y-3 text-center">
        <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex mx-auto items-center shadow justify-center">
          <LucideIcon.Antenna />
        </div>

        <h1 className="lg:text-3xl text-xl flex items-center justify-center gap-2 font-extrabold text-red-500">
          <LucideIcon.AlertTriangleIcon size={35} /> 404 Error
        </h1>

        <h2 className="lg:text-3xl text-xl font-extrabold flex justify-center">
          The Page is Not Found.
        </h2>

        <p>
          The page you are looking for does not exist. Perhaps the address is
          wrong. Please try later.
        </p>

        <div className="divider w-3/4 mx-auto"> 🚀 </div>

        <div className="">
          <Button href="/" icon={LucideIcon.Home} size="md">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
