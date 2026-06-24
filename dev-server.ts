import { createServer as createViteServer } from "vite";
import { createServer as createHttpServer } from "http";
import { initSocketServer } from "./server/socket-server";

async function startDevServer() {
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
  });

  const httpServer = createHttpServer();

  // Use Vite's middleware
  httpServer.on("request", async (req, res) => {
    vite.middlewares(req, res);
  });

  // Initialize Socket.IO
  initSocketServer(httpServer);

  const PORT = 5173;
  httpServer.listen(PORT, () => {
    console.log(`\n🚀 Dev server running at http://localhost:${PORT}`);
    console.log(`📡 Socket.IO server initialized\n`);
  });
}

startDevServer().catch((err) => {
  console.error("Failed to start dev server:", err);
  process.exit(1);
});
