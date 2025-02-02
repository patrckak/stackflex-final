import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function HeaderPublic() {
  const n = useRouter();
  return (
    <header
      className="
    flex gap-3 dark:bg-gray-800 bg-zinc-300
    shadow-sm w-full h-[60px] p-3 justify-evenly items-center
    fixed top-0 z-50
    "
    >
      <span>
        <span
          className="
        flex gap-3 items-center"
        >
          {/* <Button
            className="text-md font-medium"
            variant="link"
            onClick={() => n.push("#modulos")}
          >
            Funcionalidades
          </Button> */}

          <Button variant="link" onClick={() => n.replace("/")}>
            <img
              className="w-[40px] h-[40px]"
              src="https://i.imgur.com/vQxxDbM.png"
              alt="logo"
              title="Stack Flex"
            />
          </Button>
          {/* <Button
            className="text-md font-medium"
            variant="link"
            onClick={() => n.push("#valores")}
          >
            Valores
          </Button> */}
        </span>
      </span>
    </header>
  );
}
