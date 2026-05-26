import http from "http";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Async file read demo
async function readTasks() {
  try {
    const data = await fs.readFile("./src/data/tasks.json", "utf-8");

    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
}

// HTTP server
const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/tasks" && req.method === "GET") {
      const tasks = await readTasks();

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(tasks));
    } else {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          message: "Route not found",
        }),
      );
    }
  } catch (error) {
    res.writeHead(500, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Internal server error",
      }),
    );
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
