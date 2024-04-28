import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import { MainSideBar } from "@/components/pages/main/side-bar";
import { TooltipProvider } from "@/components/ui/tooltip";

import "@/styles/globals.css";

import { FriendsProvider } from "@/contexts/friends-context";
import { PreviousURLProvider } from "@/contexts/previous-url-context";
import { SocketProvider } from "@/contexts/socket-context";
import { UserProvider } from "@/contexts/user-context";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <UserProvider>
          <FriendsProvider>
            <SocketProvider>
              <PreviousURLProvider>
                <TooltipProvider
                  delayDuration={50}
                  skipDelayDuration={0}
                  disableHoverableContent
                >
                  <main className="flex">
                    <MainSideBar />
                    {children}
                  </main>
                </TooltipProvider>
              </PreviousURLProvider>
            </SocketProvider>
          </FriendsProvider>
        </UserProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Social Media",
  description: "Social Media App",
  icons: {
    icon: "/logo.svg",
  },
};
