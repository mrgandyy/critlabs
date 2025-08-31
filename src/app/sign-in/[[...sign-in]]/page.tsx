import { SignIn } from "@clerk/nextjs";

export const metadata = { title: "Sign in — CRIT" };

export default function Page() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <SignIn appearance={{ elements: { card: "shadow-soft rounded-2xl" } }} />
    </div>
  );
}
