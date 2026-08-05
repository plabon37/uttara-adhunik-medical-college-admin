import LoginBanner from "@/components/dashboard/login/LoginBanner";
import LoginForm from "@/components/dashboard/login/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <LoginBanner />

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}