import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import SignUpPage from "@/template/SignUpPage";

async function SignUp() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <div>
      <SignUpPage />
    </div>
  );
}

export default SignUp;
