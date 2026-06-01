import { useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { LucideEye, LucideEyeClosed, LucideLogIn } from "lucide-react";
import useValidator from "../../../hooks/useValidator";
import { useAuth } from "../../../hooks/useAuth";
import { validationRules } from "../../../../../server/src/modules/auth/auth.validation";
import BrandLogo from "../brandLogo/BrandLogo";
import Button from "../../ui/Button";
import BtnLoader from "../../ui/BtnLoader";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [readPassword, setReadPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { login, setUser } = useAuth();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const toggleReadPassword = () => {
    setReadPassword(!readPassword);
  };

  /*** -----> Validator integration -----> */
  const { errors, validate } = useValidator(validationRules, {
    email: form.email,
    password: form.password,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const res = await login(form);
      // Important !!! to use setUser(res) to update the latest data
      setUser(res);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successful.",
        showConfirmButton: false,
        timer: 1500,
      });

      // REDIRECT GATE TO LAND USER ON ROLE-WISE PAGE
      const userRoles = (res?.roles || []).map((r) =>
        (typeof r === "string" ? r : r.name).toLowerCase(),
      );

      console.log("USERS ROLES", userRoles);

      const from = location.state?.from?.pathname;

      const getDefaultRoute = (roles) => {
        if (roles.includes("superadmin")) return "/superAdmin/dashboard";
        if (roles.includes("admin")) return "/admin/dashboard";
        if (roles.includes("moderator")) return "/moderator/dashboard";
        if (roles.includes("user")) return "/users";
        return "/";
      };

      const isValidFrom = (from, roles) => {
        if (!from) return false;
        if (roles.includes("superadmin")) {
          return from.startsWith("/superAdmin") || from === "/";
        }
        if (roles.includes("admin")) {
          return from.startsWith("/admin") || from === "/";
        }
        if (roles.includes("moderator")) {
          return from.startsWith("/moderator") || from === "/";
        }
        if (roles.includes("user")) {
          return from.startsWith("/users") || from === "/";
        }
        return false;
      };

      const redirectTo = isValidFrom(from, userRoles)
        ? from
        : getDefaultRoute(userRoles);

      navigate(redirectTo, { replace: true });
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Login failed.",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="lg:max-w-sm min-w-full lg:p-6 p-2 lg:space-y-4 space-y-2 items-center justify-center border border-base-content/10 bg-base-200 rounded-lg shadow hover:shadow-xl"
      >
        <div className="border-b border-base-content/10 pb-2 mb-4">
          <Link to="/auth/register">
            <h1 className="lg:text-xl text-lg font-extrabold flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                {" "}
                <LucideLogIn size={20} /> Login
              </span>{" "}
              <span className="">
                <BrandLogo />
              </span>
            </h1>
          </Link>
        </div>

        <div className="relative">
          <input
            name="email"
            placeholder="Email • example@gmail.com"
            className={`w-full border input input-sm input-rounded ${errors.email ? "border-red-500 bg-yellow-100" : ""}`}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-600 absolute bottom-1 right-8">
              <span className="text-xs">{errors.email}</span>
            </p>
          )}
        </div>
        <div className="relative">
          <input
            name="password"
            type={readPassword ? "text" : "password"}
            placeholder="Password • A.#123232.#Some"
            className={`w-full border input input-sm input-rounded ${errors.password ? "border-red-500 bg-yellow-100" : ""}`}
            onChange={handleChange}
          />

          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={toggleReadPassword}
          >
            {readPassword ? (
              <LucideEyeClosed size={16} />
            ) : (
              <LucideEye size={16} />
            )}
          </button>
          {errors.password && (
            <p className="text-red-600 absolute bottom-1 right-8">
              <span className="text-xs">{errors.password}</span>
            </p>
          )}
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <NavLink
            to="/auth/reset-password"
            className="text-xs text-base-content/60 hover:underline hover:text-blue-500"
          >
            Forgot password ? Reset
          </NavLink>
          •
          <NavLink
            to="/auth/register"
            className="text-xs text-base-content/60 hover:underline hover:text-blue-500 float-right"
          >
            New user ? <span className="font-bold">Register</span>
          </NavLink>
        </div>

        <Button
          variant="primary"
          disabled={loading}
          size="sm"
          className="w-full"
        >
          {loading ? <BtnLoader /> : <LucideLogIn />}
          {loading ? "to login..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
