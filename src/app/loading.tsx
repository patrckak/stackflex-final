import { Spinner } from "@/components/ui/spinner";
import ThemedSection from "@/components/ui/themedSection";

export default function Loading() {
  return (
    <ThemedSection>
      <span className="min-h-screen flex flex-col gap-5 items-center justify-center">
        {/* <img src="https://i.imgur.com/vQxxDbM.png" alt="logo" /> */}
        <Spinner className="text-purple-500" size={60} variant="circle" />
      </span>
    </ThemedSection>
  );
}
