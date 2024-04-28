import { BiMessageAltDots } from "react-icons/bi";

import MessagesSideBar from "@/components/pages/messages/side-bar";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center text-center">
      <BiMessageAltDots className="h-64 w-64 text-accent" />
      <h1 className="text-xl font-semibold text-foreground">
        Lorem ipsum dolor sit amet.
      </h1>
      <h1 className="w-96 whitespace-normal text-sm text-foreground-alt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsum quia
        exercitationem corrupti amet dolorum dicta nobis inventore incidunt
        ullam.
      </h1>
    </div>
  );
}
