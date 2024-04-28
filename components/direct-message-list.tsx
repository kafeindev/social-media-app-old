import { FaRegUser } from "react-icons/fa";

const DirectMessageListItem = () => {
  return (
    <div className="flex h-12 w-full items-center gap-2 rounded-md p-1 transition-colors duration-300 hover:cursor-pointer hover:bg-secondary-alt/70">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
        <FaRegUser size={20} />
      </div>
      <div className="flex w-40 flex-col">
        <h1 className="text-sm text-foreground">Guest</h1>
        <h2 className="text-xs text-foreground-alt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          corporis dolore nesciunt deserunt vel laboriosam nisi! Aspernatur
          numquam officiis velit.
        </h2>
      </div>
    </div>
  );
};

const DirectMessageListItemSkeleton = () => {
  return (
    <div className="flex h-12 w-full items-center gap-2 rounded-md p-1 transition-colors duration-300 hover:cursor-pointer hover:bg-secondary-alt/70">
      <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-md bg-muted"></div>
      <div className="flex w-40 flex-col">
        <h1 className="animate-pulse text-sm text-foreground"></h1>
        <h2 className="animate-pulse text-xs text-foreground-alt-2"></h2>
      </div>
    </div>
  );
};
