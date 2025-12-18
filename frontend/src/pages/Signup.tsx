import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSignup } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";
import toast from "react-hot-toast";

const signupSchema = z.object({
  fullName: z.string().min(3, "Full name is too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(8, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupType = z.infer<typeof signupSchema>;

interface SignupProps {
  role?: "client" | "provider" | "organizer";
}

export const Signup: React.FC<SignupProps> = ({ role = "client" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate, isPending, isError, error } = useSignup();

  const submit = (data: SignupType) => {
    const toastId = toast.loading("Logging in...");
    mutate(
      {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role,
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully 🎉", { id: toastId });
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              error?.response?.data?.error ||
              "Signup failed",
            { id: toastId }
          );
          setShake(true);
          setTimeout(() => setShake(false), 400);
        },
      }
    );
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
          className={`flex flex-col justify-between p-10 text-black ${
            role === "client"
              ? "bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300"
              : role === "provider"
              ? "bg-gradient-to-br from-green-300 via-emerald-200 to-teal-100"
              : "bg-gradient-to-br from-yellow-300 via-orange-200 to-orange-100"
          }`}
        >
          <div className="font-nata-sans-bd text-2xl">
            <span className="text-[#5a2ea6]">List</span>
            <span className="bg-gradient-to-r from-[#5a2ea6] to-[#db2777] bg-clip-text text-transparent">
              EMO
            </span>
          </div>

          <div className="mt-20">
            <h1 className="mb-4 font-nata-sans-bd text-3xl md:whitespace-nowrap">
              {role === "client"
                ? "Create your account"
                : role === "provider"
                ? "Register as a Venue Provider"
                : "Register as an Event Organizer"}
            </h1>
            <p className="font-nata-sans-md text-lg opacity-80">
              {role === "client"
                ? "Join the platform and start managing your events seamlessly."
                : role === "provider"
                ? "List your venues and manage bookings effortlessly."
                : "Organize events and manage participants easily."}
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
          <h2 className="mb-2 font-nata-sans-bd text-3xl">
            {role === "client"
              ? "Sign Up"
              : role === "provider"
              ? "Venue Provider Sign Up"
              : "Event Organizer Sign Up"}
          </h2>
          <p className="mb-6 font-nata-sans-md text-gray-600">
            Fill in your details to register your account.
          </p>

          <motion.div
            animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <form
              onSubmit={handleSubmit(submit)}
              className="space-y-5 font-nata-sans-rg"
            >
              {/* FULL NAME */}
              <div>
                <label className="mb-1 flex items-center gap-2 font-medium">
                  <User className="h-4 w-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("fullName")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-violet-500 focus:ring-1"
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fullName?.message}
                  </p>
                )}
              </div>

              {/* EMAIL */}
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
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-1 flex items-center gap-2 font-medium">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </label>
                <input
                  type="text"
                  {...register("phone")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-violet-500 focus:ring-1"
                  placeholder="+1 234 567 890"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone?.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
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
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
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
                    {errors.password?.message}
                  </p>
                )}
              </div>

              {/* Server error */}
              {isError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {(error as any)?.response?.data?.message ||
                    (error as any)?.response?.data?.error ||
                    "Signup failed. Try again."}
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
                    Creating account...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </form>
          </motion.div>

          <p className="mt-6 text-center font-nata-sans-rg text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
