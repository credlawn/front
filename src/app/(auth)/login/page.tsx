import { checkCurrentUser } from "@/auth/login";
import LoginForm from "./loginForm";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { isLoggedin } = await checkCurrentUser();

  if (isLoggedin) {
    redirect("/dashboard");
  }

  return <LoginForm />;
};

export default LoginPage;