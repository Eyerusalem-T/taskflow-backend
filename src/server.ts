import http from "http";
import dotenv from "dotenv";
import { readFileDemo } from "../src/utils/fileReader";
import { Task } from "../src/interfaces/task.interface";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/tasks" && req.method === "GET") {
      const tasks: Task[] = await readFileDemo("./src/data/tasks.json");

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
