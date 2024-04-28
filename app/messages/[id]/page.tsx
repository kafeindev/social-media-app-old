"use client";

import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { useUserContext } from "@/contexts/user-context";
import { BiSolidSend } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Page({ params }: { params: { id: string } }) {
  const [isEmpty, setIsEmpty] = useState(true);
  const { user } = useUserContext();

  useEffect(() => {
    scrollToBottom();

    document.addEventListener("keydown", (event) => {
      const chatInput = document.getElementById("chat-input");
      if (chatInput) {
        chatInput.focus();
      }
    });
  }, []);

  function handleChange(event: FormEvent<Element>) {
    const target = event.target as HTMLInputElement;
    const { innerText } = target;

    if (innerText && innerText !== "\n") {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }

  function handleKeyDown(event: KeyboardEvent<Element>) {
    if (event.key === "Enter" && !event.shiftKey) {
      console.log("sent");
      event.preventDefault();
    }
  }

  function scrollToBottom() {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  return (
    <div className="flex h-screen w-full flex-col justify-center">
      <div className="m-auto flex h-[99%] w-[65rem] flex-col items-center justify-between overflow-hidden rounded-md border border-border-alt bg-accent pt-2">
        <div
          id="chat-container"
          className="overflow-anchor-none chat-scroll mr-1 flex flex-col gap-6 overflow-y-scroll pb-4"
        >
          <MessageField
            userName="Guest"
            text="Lorem ipsum dolor sit, amet consectetur adipisicing elit."
            date="Today at 08:00 PM"
          />
          <MessageField
            userName="Guest"
            text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum delectus libero nam? Porro"
            date="Today at 08:00 PM"
          />
          <MessageField
            userName="Guest"
            text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum delectus libero nam? Porro, aliquam ab voluptates fugit ut"
            date="Today at 08:00 PM"
          />
          <MessageField
            userName="Guest"
            text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum delectus libero nam? Porro, aliquam ab voluptates fugit ut corrupti hic!"
            date="Today at 08:00 PM"
          />
          <MessageField
            userName="Guest"
            text={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum delectus libero nam? Porro, aliquam ab voluptates fugit ut corrupti hic!".repeat(
              2
            )}
            date="Today at 08:00 PM"
          />
          <MessageField
            userName="Guest"
            text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum delectus libero nam? Porro, aliquam ab voluptates fugit ut corrupti hic!"
            date="Today at 08:00 PM"
          />
          <MessageField
            userName="Guest"
            text={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum delectus libero nam? Porro, aliquam ab voluptates fugit ut corrupti hic!".repeat(
              3
            )}
            date="Today at 08:00 PM"
          />
          <MessageField
            userName="Guest"
            text={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum delectus libero nam? Porro, aliquam ab voluptates fugit ut corrupti hic!".repeat(
              5
            )}
            date="Today at 08:00 PM"
          />
          <MessageField
            userName="Guest"
            text={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum delectus libero nam? Porro, aliquam ab voluptates fugit ut corrupti hic!".repeat(
              10
            )}
            date="Today at 08:00 PM"
          />
        </div>
        <div className="mb-2 max-h-48 min-h-16 w-full bg-transparent p-5 py-2">
          <div className="flex h-full rounded-md bg-input-alt">
            <Button
              variant="foregroundText"
              size="icon"
              className="mx-3 my-1.5"
            >
              <FaCirclePlus size={24} />
            </Button>
            <div className="relative ml-1 flex h-full w-full items-center overflow-y-auto">
              <h1
                id="chat-input"
                className="w-full select-text break-words outline-none"
                contentEditable="plaintext-only"
                suppressContentEditableWarning
                onInput={(event) => handleChange(event)}
                onKeyDownCapture={(event) => handleKeyDown(event)}
              />
              <h1
                className={cn(
                  "pointer-events-none absolute text-foreground-alt-2",
                  {
                    hidden: !isEmpty,
                  }
                )}
              >
                Message @Guest
              </h1>
            </div>
            <hr className="my-1 h-10 w-px border-none bg-secondary-alt" />
            <Button
              variant="primaryText"
              size="icon"
              className={cn(
                "mx-3 my-1.5 text-primary transition-all duration-300 hover:text-primary/70",
                {
                  "pointer-events-none text-secondary": isEmpty,
                }
              )}
            >
              <BiSolidSend size={24} />
            </Button>
          </div>
        </div>
      </div>
      <div className="fixed right-4 h-[50rem] w-[19rem] rounded-md border border-border-alt bg-popover p-2 align-middle">
        <div className="mb-8 flex h-32 items-center rounded-md bg-secondary">
          <div className="relative -mb-[7rem] ml-4 mr-2 flex w-full items-end gap-3">
            <div className="rounded bg-primary-alt p-4 text-foreground ring-[6px] ring-popover">
              <FaRegUser size={24} />
            </div>
            <hr className="h-px flex-1 border border-border-alt" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap items-center justify-between gap-x-5 gap-y-4 rounded-md p-2">
            <div className="flex flex-col">
              <h1 className="text-xs font-semibold text-foreground-alt-2">
                UserName
              </h1>
              <h1 className="text-sm text-foreground">{user?.userName}</h1>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xs font-semibold text-foreground-alt-2">
                DisplayName
              </h1>
              <h1 className="text-sm text-foreground">{user?.displayName}</h1>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xs font-semibold text-foreground-alt-2">
                About Me
              </h1>
              <h1 className="text-sm text-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Delectus vero cupiditate, pariatur sapiente ipsum rerum autem
                nulla quae obcaecati sunt?
              </h1>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xs font-semibold text-foreground-alt-2">
                Friendship Date
              </h1>
              <h1 className="text-sm text-foreground">
                {new Date().toDateString()}
              </h1>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xs font-semibold text-foreground-alt-2">
                Mutual Friends
              </h1>
              <h1 className="text-sm text-foreground">5</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MessageField = ({
  userName,
  text,
  date,
}: {
  userName: string;
  text: string;
  date: string;
}) => (
  <div className="flex h-fit gap-4 px-4">
    <div className="flex h-fit rounded-md bg-muted p-3.5">
      <FaRegUser size={20} />
    </div>
    <div className="flex flex-col text-wrap break-words">
      <div className="flex items-baseline gap-2">
        <h1 className="text-foreground">{userName}</h1>
        <p className="text-xs text-foreground-alt-2">{date}</p>
      </div>
      <p className="text-base text-foreground-alt">{text}</p>
    </div>
  </div>
);
