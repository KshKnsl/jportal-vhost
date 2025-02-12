import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginError } from "https://cdn.jsdelivr.net/npm/jsjiit@0.0.20/dist/jsjiit.esm.js";

// Define the form schema
const formSchema = z.object({
  enrollmentNumber: z.string({
    required_error: "Enrollment number is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
})

export default function Login({ onLoginSuccess, w }) {
  const [loginStatus, setLoginStatus] = useState({
    isLoading: false,
    error: null,
    credentials: null
  });

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enrollmentNumber: "",
      password: "",
    },
  })

  // Handle side effects in useEffect
  useEffect(() => {
    if (!loginStatus.credentials) return;

    const performLogin = async () => {
      try {
        await w.student_login(
          loginStatus.credentials.enrollmentNumber,
          loginStatus.credentials.password
        );

        // Store credentials in localStorage
        localStorage.setItem("username", loginStatus.credentials.enrollmentNumber);
        localStorage.setItem("password", loginStatus.credentials.password);

        console.log("Login successful");
        setLoginStatus(prev => ({
          ...prev,
          isLoading: false,
          credentials: null,
        }));
        onLoginSuccess();
      } catch (error) {
        if (error instanceof LoginError && error.message.includes("JIIT Web Portal server is temporarily unavailable")) {
          console.error("JIIT Web Portal server is temporarily unavailable")
          setLoginStatus(prev => ({
            ...prev,
            isLoading: false,
            error: "JIIT Web Portal server is temporarily unavailable. Please try again later.",
            credentials: null,
          }));
        } else if (error instanceof LoginError && error.message.includes("Failed to fetch")) {
          setLoginStatus(prev => ({
            ...prev,
            isLoading: false,
            error: "Please check your internet connection. If connected, JIIT Web Portal server is unavailable.",
            credentials: null,
          }));
        } else {
          console.error("Login failed:", error);
          setLoginStatus(prev => ({
            ...prev,
            isLoading: false,
            error: "Login failed. Please check your credentials.",
            credentials: null,
          }));
        }
      }
    };

    setLoginStatus(prev => ({ ...prev, isLoading: true }));
    performLogin();
  }, [loginStatus.credentials, onLoginSuccess, w]);

  // Clean form submission
  function onSubmit(values) {
    setLoginStatus(prev => ({
      ...prev,
      credentials: values,
      error: null
    }));
  }
  return (
    <div className="min-h-screen bg-black text-white dark:bg-gray-100 dark:text-gray-900">
      {/* Header */}
      <header className="bg-blue-900 dark:bg-blue-600 text-white py-2">
        <div className="container mx-auto text-center flex flex-col md:flex-row gap-2 md:gap-6 px-4">
          <h1 className="text-3xl font-bold">JIIT Portal</h1>
          <p className="mt-2 md:mt-0">A modern interface for the JIIT web portal</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {/* Login Form Section */}
          <div className="bg-black dark:bg-white rounded-lg shadow-lg p-8 border-[1px]">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-6">Login</h2>
            {loginStatus.error && (
              <div className="bg-red-900/50 dark:bg-red-100 border border-red-600 dark:border-red-400 text-red-200 dark:text-red-700 px-4 py-3 rounded mb-4">
                {loginStatus.error}
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="enrollmentNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white dark:text-gray-900">Enrollment Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter enrollment number" 
                          className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-300"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white dark:text-gray-900">Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter password"
                          className="bg-gray-700 dark:bg-white border-gray-600 dark:border-gray-300"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  disabled={loginStatus.isLoading}
                >
                  {loginStatus.isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Features Section */}
          <div className="bg-black dark:bg-white rounded-lg shadow-lg p-8  border-[1px]">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-6">Features</h2>
            <div className="space-y-6">
              <div>
                <ul className="list-disc list-inside space-y-2">
                  <li>🔐 Passwordless login without captcha</li>
                  <li>📊 Real-time attendance tracking</li>
                  <li>📝 Exam schedule viewer</li>
                  <li>📈 Grade management</li>
                  <li>👀 SGPA/CGPA calculator</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Installation Guide</h3>
                <div className="space-y-2">
                  <p className="font-medium">Android:</p>
                  <p>Press menu → Add to home screen</p>
                  <p className="font-medium">iOS:</p>
                  <p>Share → Add to home screen</p>
                  <p className="font-medium">Windows:</p>
                  <p>Click install icon in URL bar</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-400 dark:text-gray-600">
          <p>Created with ❤️ for JIIT students only</p>
          <p className="text-sm mt-2">Not liable for attendance-related emotional damage 😅</p>
        </footer>
      </div>
    </div>
  );
}