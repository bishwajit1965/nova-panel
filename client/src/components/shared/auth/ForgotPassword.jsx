import {
  Loader2Icon,
  LucideHome,
  LucideLogIn,
  RefreshCw,
  RotateCcwKey,
} from "lucide-react";
import { useState } from "react";
import API_PATHS from "../../../services/api.paths";
import Swal from "sweetalert2";
import Button from "../../../components/ui/Button";
import useValidator from "../../../hooks/useValidator";
import { Input } from "../../../components/ui/Input";
import { useApiMutation } from "../../../hooks/useApiMutation";
import { LucideIcon } from "../../lib/LucideIcons";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Validation rule for password reset email
  const validationRules = {
    email: {
      required: { message: "Email is required" },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
      custom: (value) => {
        if (value && value !== value.toLowerCase()) {
          return "Email should be in lowercase (recommended)";
        }
        return null;
      },
    },
  };

  /*** -----> Validator integration -----> */
  const { errors, validate } = useValidator(validationRules, {
    email: form.email,
  });

  /*** ------> Forgot password mutation API Hook ------> */
  const forgotPassMutation = useApiMutation({
    method: "create",
    path: `${API_PATHS.RESET_PASSWORD.ENDPOINT}/forgot-password`,
    key: API_PATHS.RESET_PASSWORD.KEY, // used by useQuery

    onSuccess: (data) => {
      setForm({
        email: "",
      });
      console.log("Reset password/update response:", data);
      setForm({
        email: "",
      });
      console.log("Reset password/update response:", data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const payload = {
        data: {
          email: form?.email,
        },
      };
      console.log("Payload", payload);
      forgotPassMutation.mutate(payload);
    } catch (error) {
      console.error("Error in setting password.", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center">
      <div className="lg:min-w-xs min-w-full mx-auto border bg-base-300 border-base-content/15 rounded-lg shadow hover:shadow-xl lg:p-8 p-4">
        <form onSubmit={handleSubmit} className="lg:space-y-4 space-y-2">
          <h1 className="lg:text-xl font-extrabold flex items-center gap-2 border-b border-base-content/15 pb-1">
            <RefreshCw size={25} /> Forgot Password
          </h1>

          <div className="">
            <Input
              type="email"
              name="email"
              id="email"
              icon={LucideIcon.Mail}
              label="Email address"
              value={form?.email}
              onChange={handleChange}
              placeholder="Email address..."
              error={errors?.email}
              className={`${
                errors.email ? "input-error bg-yellow-100" : ""
              } input input-sm input-bordered w-full`}
            />
          </div>

          <div className="lg:flex grid gap-2 items-center justify-between">
            <Button
              type="submit"
              size="xs"
              disabled={forgotPassMutation?.isPending}
            >
              {forgotPassMutation?.isPending ? (
                <Loader2Icon size={20} className="animate-spin" />
              ) : (
                <RotateCcwKey size={18} />
              )}{" "}
              {forgotPassMutation?.isPending ? "Processing..." : "Send Email"}
            </Button>
            <span className="flex items-center gap-2">
              <Button
                href="/"
                size="xs"
                variant="outline"
                className="text-primary"
              >
                <LucideHome size={16} /> Home
              </Button>{" "}
              <Button
                href="/auth/login"
                size="xs"
                variant="outline"
                className="text-primary"
              >
                <LucideLogIn size={16} /> Login
              </Button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
