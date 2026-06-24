import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useValidator from "../../../hooks/useValidator";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import { LucideIcon } from "../../lib/LucideIcons";
import { Eye, EyeOff, Loader, LogInIcon } from "lucide-react";
import { Input } from "../../ui/Input";
import { useApiMutation } from "../../../hooks/useApiMutation";
import API_PATHS from "../../../services/api.paths";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [comparePassword, setComparePassword] = useState("");
  const [loading, setLoading] = useState(false);
  console.log("RESET TOKEN=>", resetToken);

  const formData = { password, confirmPassword };

  const validationRules = {
    password: {
      required: { message: "Password is required" },
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?#&^]).{6,}$/,
        message:
          "Password must include uppercase, lowercase, number, and special character",
      },
    },
    confirmPassword: {
      required: { message: "Confirm password is required" },
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?#&^]).{6,}$/,
        message:
          "Confirm password must include uppercase, lowercase, number, and special character",
      },
    },
  };
  const { errors, validate } = useValidator(validationRules, formData);

  /*** ------> Forgot password mutation API Hook ------> */
  const resetPassMutation = useApiMutation({
    method: "create",
    path: `${API_PATHS.RESET_PASSWORD.ENDPOINT}/reset-password/${resetToken}`,
    key: API_PATHS.RESET_PASSWORD.KEY, // used by useQuery

    onSuccess: (data) => {
      setPassword("");
      console.log("Reset password/update response:", data);

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

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const resetLoading = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    if (!validate()) {
      resetLoading();
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      toast.error("🔴Passwords do not match!");
      return;
    }

    try {
      const payload = {
        data: {
          password: password,
        },
      };

      resetPassMutation.mutate(payload);

      toast.success("Password reset is successful!");
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="lg:min-w-xs min-w-full mx-auto bg-base-300 lg:p-8 p-4 rounded-xl shadow-md hover:shadow-xl space-y-2 border border-base-content/15">
        <form onSubmit={handleReset} className="space-y-4 max-w-sm mx-auto">
          <h2 className="lg:text-xl font-extrabold flex items-center gap-2 border-b border-base-content/15 pb-1">
            <span>
              <LucideIcon.RotateCcwKeyIcon size={25} />
            </span>
            <span>Reset Password</span>
          </h2>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              name="password"
              icon={LucideIcon.Lock}
              placeholder="New password"
              onChange={(e) => setPassword(e.target.value)}
              className={`${
                errors.password ? "input-error bg-yellow-100" : ""
              } input input-sm input-bordered w-full`}
            />
            <span
              className="absolute right-2 top-1.5 cursor-pointer z-50"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="text-gray-300" size={20} />
              ) : (
                <Eye className="text-gray-300" size={20} />
              )}
            </span>
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="relative">
            <Input
              type={comparePassword ? "text" : "password"}
              value={confirmPassword}
              name="confirmPassword"
              icon={LucideIcon.Lock}
              placeholder="Confirm new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${
                errors.confirmPassword ? "input-error bg-yellow-100" : ""
              } input input-sm input-bordered w-full`}
            />
            <span
              className="absolute right-2 top-1.5 cursor-pointer z-50"
              onClick={() => setComparePassword(!comparePassword)}
            >
              {comparePassword ? (
                <EyeOff className="text-gray-300" size={20} />
              ) : (
                <Eye className="text-gray-300" size={20} />
              )}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-600 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div
            className={`${
              loading
                ? "cursor-not-allowed flex items-center justify-between"
                : "cursor-progress space-x-2 flex items-center justify-between"
            }`}
          >
            <Button
              type="submit"
              size="xs"
              disabled={resetPassMutation?.isPending}
              variant="primary"
              className={`${
                !resetPassMutation?.isPending
                  ? "cursor-progress"
                  : "cursor-not-allowed"
              } lg:w-40 disabled:cursor-not-allowed cursor-pointer disabled:opacity-100 btn`}
            >
              {resetPassMutation?.isPending ? (
                <Loader className="animate-spin text-slate-500" />
              ) : (
                <LucideIcon.RotateCcwKeyIcon size={18} />
              )}
              {resetPassMutation?.isPending ? "Resetting..." : "Reset Password"}
            </Button>

            <Button
              href="/auth/login"
              variant="outline"
              size="xs"
              className="text-primary"
            >
              <LogInIcon size={18} /> Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
