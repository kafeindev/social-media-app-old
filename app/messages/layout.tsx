import MessagesSideBar from "@/components/pages/messages/side-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MessagesSideBar />
      {children}
    </>
  );
}
