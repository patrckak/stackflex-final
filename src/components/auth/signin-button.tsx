import { signIn } from "../../../auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("credentials", { redirectTo: "/dashboard" });
      }}
    >
      <button type="submit">Sign in</button>
    </form>
  );
}
