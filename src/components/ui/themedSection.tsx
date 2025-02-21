export default function ThemedSection({ children }) {
  return (
    <section className="flex flex-col gap-2 h-max min-h-screen w-full justify-center items-center dark:bg-gray-700 bg-zinc-200">
      {children}
    </section>
  );
}
