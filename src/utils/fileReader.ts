import fs from "fs/promises";

export async function readFileDemo(path: string) {
  try {
    const data = await fs.readFile(path, "utf-8");

    return JSON.parse(data);
  } catch (error) {
    throw new Error("Failed to read file");
  }
}
