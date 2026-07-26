import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../../schema/signup.schema.js";
import { useSignup } from "../../hooks/useSignup.hook.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import loginBackground from "../../assets/login-background.jpg";

export default function Signup() {
  const { mutate, isLoading, isError, isSuccess } = useSignup();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  function onSubmit(values) {
    setServerError("");
    setSuccessMessage("");
    mutate(values);
    form.reset();
  }

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage("Account created successfully! You can now login.");
      
      // optional auto redirect after 2 sec
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setServerError("User may already exist or something went wrong.");
    }
  }, [isError]);

  return (
    <section
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(8, 35, 18, 0.45), rgba(8, 35, 18, 0.65)), url(${loginBackground})`,
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-white/40 bg-white/25 backdrop-blur-lg shadow-2xl p-8">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-white">Signup</h1>
          <p className="text-white/80 text-sm">
            Create a new account to start creating tasks
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 rounded-lg bg-green-100 text-green-700 px-4 py-2 text-sm">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {serverError && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-2 text-sm">
            {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* First Name */}
          <div>
            <input
              type="text"
              placeholder="First Name"
              {...form.register("firstname")}
              className="w-full rounded-lg border border-white/40 bg-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.formState.errors.firstname && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.firstname.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              placeholder="Last Name"
              {...form.register("lastname")}
              className="w-full rounded-lg border border-white/40 bg-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.formState.errors.lastname && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.lastname.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...form.register("email")}
              className="w-full rounded-lg border border-white/40 bg-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...form.register("password")}
              className="w-full rounded-lg border border-white/40 bg-white/80 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm">
            <p className="text-white/90">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
