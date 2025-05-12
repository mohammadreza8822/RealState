import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import SignInPage from "@/template/SignInPage";
import { redirect } from "next/navigation";

async function SignIn() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <div>
      <SignInPage />
    </div>
  );
}

export default SignIn;
