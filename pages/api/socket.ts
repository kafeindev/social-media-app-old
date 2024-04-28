import type { NextApiRequest } from "next";
import { Server } from "socket.io";

const userMap = new Map();

export default async function GET(_req: NextApiRequest, res: any) {
  if (res.socket?.server?.io) {
    res.status(200).json({
      success: true,
      socket: `:3001`,
    });
    return;
  }

  console.log("Starting Socket.IO server on port:", 3001);

  const io = new Server({
    path: "/api/socket",
    addTrailingSlash: false,
    cors: { origin: "*" },
  }).listen(3001);

  io.on("connect", (socket) => {
    socket.on("disconnect", async () => {
      console.log("socket disconnect", socket.id);
    });

    socket.on("join", async (userId) => {
      console.log("join", userId);
      userMap.set(userId, socket.id);
      console.log(userMap);
    });
  });

  res.socket.server.io = io;
  res.status(201).json({ success: true, socket: `:${3001}` });
}
