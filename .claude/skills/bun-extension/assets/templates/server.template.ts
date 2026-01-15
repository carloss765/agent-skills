/**
 * Bun HTTP Server Template
 * Using Bun's built-in high-performance HTTP server
 */

// Simple HTTP Server
const server = Bun.serve({
  port: process.env.PORT || 3000,
  hostname: "0.0.0.0",

  // Request handler
  fetch(request: Request): Response | Promise<Response> {
    const url = new URL(request.url);

    // Route handling
    if (url.pathname === "/") {
      return new Response("Hello from Bun!", {
        headers: { "Content-Type": "text/plain" },
      });
    }

    if (url.pathname === "/api/health") {
      return Response.json({ status: "ok", timestamp: new Date().toISOString() });
    }

    if (url.pathname === "/api/data" && request.method === "GET") {
      return Response.json({ data: [1, 2, 3] });
    }

    if (url.pathname === "/api/data" && request.method === "POST") {
      return handlePostData(request);
    }

    // 404 for unknown routes
    return new Response("Not Found", { status: 404 });
  },

  // Error handler
  error(error: Error): Response {
    console.error("Server error:", error);
    return new Response(`Internal Server Error: ${error.message}`, {
      status: 500,
    });
  },
});

// POST handler example
async function handlePostData(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    console.log("Received:", body);

    return Response.json({
      success: true,
      received: body,
    });
  } catch (error) {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

console.log(`🚀 Server running at http://localhost:${server.port}`);

// ============================================
// FILE OPERATIONS EXAMPLE
// ============================================

// Read file
async function readFileExample() {
  const file = Bun.file("./data.json");
  const contents = await file.text();
  return JSON.parse(contents);
}

// Write file
async function writeFileExample(data: unknown) {
  await Bun.write("./output.json", JSON.stringify(data, null, 2));
}

// ============================================
// WEBSOCKET SERVER EXAMPLE
// ============================================

// const wsServer = Bun.serve({
//   port: 3001,
//   fetch(req, server) {
//     // Upgrade to WebSocket
//     if (server.upgrade(req)) {
//       return; // Upgrade successful
//     }
//     return new Response("Upgrade failed", { status: 500 });
//   },
//   websocket: {
//     message(ws, message) {
//       console.log("Received:", message);
//       ws.send(`Echo: ${message}`);
//     },
//     open(ws) {
//       console.log("Client connected");
//     },
//     close(ws, code, reason) {
//       console.log("Client disconnected");
//     },
//   },
// });

export { server };
