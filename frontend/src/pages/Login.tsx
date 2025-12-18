import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Facebook, Apple, Chrome } from "lucide-react";
import toast from "react-hot-toast";

const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginType = z.infer<typeof LoginSchema>;

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate, isPending, isError, error } = useLogin();

  const submit = (data: LoginType) => {
    const toastId = toast.loading("Logging in...");
    mutate(data, {
      onSuccess: () => {
        toast.success("Welcome back 👋", { id: toastId });
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Invalid email or password",
          { id: toastId }
        );
        setShake(true);
        setTimeout(() => setShake(false), 400);
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex min-h-screen w-full items-center justify-center bg-violet-50 p-4"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-lg md:grid-cols-2"
      >
        {/* Left Side */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="flex flex-col justify-between bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-10 text-black"
        >
          <div className="font-nata-sans-bd text-2xl">
            <span className="text-[#5a2ea6]">List</span>
            <span className="bg-gradient-to-r from-[#5a2ea6] to-[#db2777] bg-clip-text text-transparent">
              EMO
            </span>
          </div>

          <div className="mt-20">
            <h1 className="mb-4 font-nata-sans-bd text-3xl">Welcome back</h1>
            <p className="font-nata-sans-md text-lg opacity-80">
              Access your events, tasks, and schedules easily.
            </p>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="flex flex-col justify-center p-10"
        >
          <h2 className="mb-2 font-nata-sans-bd text-3xl">Login</h2>
          <p className="mb-6 font-nata-sans-md text-gray-600">
            Enter your credentials to access your dashboard.
          </p>

          <motion.div
            animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <form
              onSubmit={handleSubmit(submit)}
              className="space-y-5 font-nata-sans-rg"
            >
              {/* Email */}
              <div>
                <label className="mb-1 flex items-center gap-2 font-medium">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-violet-500 focus:ring-1"
                  placeholder="example@mail.com"
                  disabled={isPending}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-1 flex items-center gap-2 font-medium">
                  <Lock className="h-4 w-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-violet-500 focus:ring-1"
                    placeholder="********"
                    disabled={isPending}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                    disabled={isPending}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="font-nata-sans-rg text-sm text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Server error */}
              {isError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-nata-sans-rg text-sm text-red-700">
                  {(error as any)?.response?.data?.message ||
                    (error as any)?.response?.data?.error ||
                    "Login failed. Try again."}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-lg bg-black py-3 font-nata-sans-md font-semibold text-white shadow-lg transition hover:opacity-90"
              >
                {isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* OR */}
          <div className="my-6 flex items-center font-nata-sans-rg">
            <div className="h-px flex-1 bg-gray-300"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          {/* Socials */}
          <div className="flex gap-4 font-nata-sans-md">
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border py-2 transition hover:bg-gray-100"
            >
              <Chrome className="h-5 w-5" />
              Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border py-2 transition hover:bg-gray-100"
            >
              <Facebook className="h-5 w-5" />
              Facebook
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border py-2 transition hover:bg-gray-100"
            >
              <Apple className="h-5 w-5" />
              Apple
            </motion.button>
          </div>

          <p className="mt-6 text-center font-nata-sans-rg text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup/client"
              className="font-medium text-black hover:underline"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
