import { SignUp } from "@clerk/nextjs";

export const metadata = { title: "Create account — CRIT" };

export default function Page() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <SignUp appearance={{ elements: { card: "shadow-soft rounded-2xl" } }} />
    </div>
  );
}
