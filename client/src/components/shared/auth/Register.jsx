import { LucideEye, LucideEyeClosed, LucideUsers } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../brandLogo/BrandLogo";
import { useState } from "react";
import useValidator from "../../../hooks/useValidator";
import { registerValidationRules } from "../../../../../server/src/modules/auth/auth.validation";
import { useAuth } from "../../../hooks/useAuth";
import { registerUser } from "../../../services/auth.service";
import Swal from "sweetalert2";
import Button from "../../ui/Button";
import BtnLoader from "../../ui/BtnLoader";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [readPassword, setReadPassword] = useState(false);
  const [readVerifyPassword, setReadVerifyPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    verifyPassword: "",
    avatarUrl: "",
    acceptTerms: "",
  });

  // VALIDATION ERRORS
  const { errors, validate } = useValidator(registerValidationRules, {
    name: form.name,
    email: form.email,
    password: form.password,
    verifyPassword: form.verifyPassword,
    avatarUrl: form.avatarUrl,
    acceptTerms: form.acceptTerms,
  });

  //   const handleChange = (e) => {
  //     setForm({
  //       ...form,
  //       [e.target.name]: e.target.value,
  //     });
  //     };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const toggleReadPassword = () => {
    setReadPassword((prev) => !prev);
  };
  const toggleReadVerifyPassword = () => {
    setReadVerifyPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const res = await registerUser(form);
      console.log(res.data);
      if (res.success) {
        // Set user in Auth Context
        const user = res.data.user;
        setUser(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration successful.",
          showConfirmButton: false,
          timer: 1500,
        });
        // Optionally, you can redirect to login page or dashboard
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Registration failed.",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Error in registering user", error);
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
          <Link to="/auth/login">
            <h1 className="lg:text-xl text-lg font-extrabold flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                {" "}
                <LucideUsers size={20} /> Register
              </span>{" "}
              <span className="">
                <BrandLogo />
              </span>
            </h1>
          </Link>
        </div>
        <div className="w-full">
          <input
            type="text"
            name="name"
            placeholder="Name → Emily Jones"
            id="name"
            className={`w-full input input-sm ${errors.name ? "border-red-500 bg-yellow-100" : ""}`}
            onChange={handleChange}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>
        <div className="w-full">
          <input
            type="text"
            name="email"
            placeholder="Email → example@gmail.com"
            id="email"
            className={`w-full input input-sm ${errors.email ? "border-red-500 bg-yellow-100" : ""}`}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="w-full relative">
          <input
            type={readPassword ? "text" : "password"}
            name="password"
            placeholder="Password → A.#122132.#Some"
            id="password"
            className={`w-full input input-sm ${errors.password ? "border-red-500 bg-yellow-100" : ""}`}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={toggleReadPassword}
          >
            {readPassword ? (
              <LucideEyeClosed size={16} />
            ) : (
              <LucideEye size={16} />
            )}
          </button>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password}</p>
          )}
        </div>
        <div className="w-full relative">
          <input
            type={readVerifyPassword ? "text" : "password"}
            name="verifyPassword"
            placeholder="Verify Password → A.#122132.#Some"
            id="verifyPassword"
            className={`w-full input input-sm ${errors.verifyPassword ? "border-red-500 bg-yellow-100" : ""}`}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={toggleReadVerifyPassword}
          >
            {readVerifyPassword ? (
              <LucideEyeClosed size={16} />
            ) : (
              <LucideEye size={16} />
            )}
          </button>
          {errors.verifyPassword && (
            <p className="text-xs text-red-500">{errors.verifyPassword}</p>
          )}
        </div>
        <div className="w-full">
          <input
            type="text"
            name="avatarUrl"
            placeholder="Photo Url → https://somelink.png"
            id="avatar"
            className={`w-full input input-sm ${errors.avatarUrl ? "border-red-500 bg-yellow-100" : ""}`}
            onChange={handleChange}
          />
          {errors.avatarUrl && (
            <p className="text-xs text-red-500">{errors.avatarUrl}</p>
          )}
        </div>
        <div className="">
          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="acceptTerms"
                className="checkbox checkbox-xs checkbox-primary"
                onChange={handleChange}
              />
              <span className="text-xs hover:text-blue-500">Accept Terms</span>
            </label>
            •
            <Link
              to="/terms"
              className="text-xs hover:link hover:text-blue-500 m-0 p-0"
            >
              Terms
            </Link>
            •
            <Link
              to="/auth/login"
              className="text-xs hover:link hover:text-blue-500 m-0 p-0"
            >
              A Member ? <span className="font-bold">Login</span>{" "}
            </Link>
          </div>
          <span>
            {errors.acceptTerms && (
              <p className="text-xs text-red-500">{errors.acceptTerms}</p>
            )}
          </span>
        </div>

        <Button
          variant="primary"
          disabled={loading}
          size="sm"
          className="w-full"
        >
          {loading ? <BtnLoader /> : <LucideUsers />}
          {loading ? "to register..." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
