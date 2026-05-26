

# ✅ 1. Set up Node.js project with TypeScript

### Step 1: Initialize project

```bash
npm init -y
```

### Step 2: Install TypeScript

```bash
npm install typescript @types/node --save-dev
```

### Step 3: Create tsconfig.json

```bash
npx tsc --init
```

### Replace with simple config:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

### Project structure:

```
project/
 ├── src/
 ├── dist/
 ├── tsconfig.json
 └── package.json
```

---

# ✅ 2. Define interfaces

📄 `src/models.ts`

```ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Project {
  id: number;
  title: string;
  ownerId: number;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  projectId: number;
}
```

👉 Explanation:

* Interfaces define **shape of data**
* Helps TypeScript check errors early

---

# ✅ 3. Async function to read JSON

📄 `src/readUsers.ts`

```ts
import { promises as fs } from "fs";

async function readUsers() {
  try {
    const data = await fs.readFile("./src/mock-users.json", "utf-8");
    const users = JSON.parse(data);
    console.log(users);
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

readUsers();
```

📄 `src/mock-users.json`

```json
[
  { "id": 1, "name": "Abel", "email": "abel@test.com" },
  { "id": 2, "name": "Sara", "email": "sara@test.com" }
]
```

👉 Run:

```bash
npx tsc
node dist/readUsers.js
```

---

# ✅ 4. Simple HTTP server

📄 `src/server.ts`

```ts
import http from "http";

const projects = [
  { id: 1, title: "Project A" },
  { id: 2, title: "Project B" }
];

const server = http.createServer((req, res) => {
  if (req.url === "/projects") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(projects));
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

👉 Test:
Open browser →
`http://localhost:3000/projects`

---

# ✅ 5. Add error handling (routes)

Update server:

```ts
const server = http.createServer((req, res) => {
  if (req.url === "/projects") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(projects));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});
```

👉 Now:

* `/projects` → works
* anything else → 404 error

---

# ✅ 6. Serve JSON file using fs

Update server again:

```ts
import http from "http";
import { promises as fs } from "fs";

const server = http.createServer(async (req, res) => {
  if (req.url === "/users") {
    try {
      const data = await fs.readFile("./src/mock-users.json", "utf-8");

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    } catch (error) {
      res.writeHead(500);
      res.end("Error reading file");
    }
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

👉 Test:

```
http://localhost:3000/users
```

---

# 🚀 How to run everything (simple)

1. Compile TypeScript

```bash
npx tsc
```

2. Run server

```bash
node dist/server.js
```

---

# 💡 Final understanding (very simple)

* **TypeScript** → helps catch errors early
* **Interfaces** → describe data structure
* **fs** → read files
* **http module** → create server
* **status codes**

  * 200 → success
  * 404 → not found
  * 500 → server error

---


Nice, this is a good continuation 👍 — now you’re moving from **basic Node → networking tools → real backend (NestJS)**. I’ll keep it simple and practical like before.

---

# ✅ 1. Use `nslookup` or `dig` for DNS

### ✔ Using `nslookup`

```bash
nslookup github.com
```

👉 Example output (simplified):

```bash
Server:  your-dns-server
Address:  192.168.1.1

Name:    github.com
Address: 140.82.121.4
```

### ✔ Using `dig` (more detailed)

```bash
dig github.com
```

👉 What it shows:

* IP address of github.com
* DNS server used
* Query time

👉 Simple idea:

* DNS = converts **domain → IP address**
* So `github.com` → something like `140.x.x.x`

---

# ✅ 2. Trace route to google.com

### ✔ Linux / Mac:

```bash
traceroute google.com
```

### ✔ Windows:

```bash
tracert google.com
```

👉 Output shows:

* Each “hop” (router) your request passes through
* Time taken per hop

👉 Example:

```bash
1 192.168.1.1
2 10.0.0.1
3 ...
```

👉 Simple idea:

* It shows **path from your computer → Google server**

---

# ✅ 3. Use `curl` to test your HTTP server

Make sure your server is running:

```bash
node dist/server.js
```

### ✔ GET request

```bash
curl http://localhost:3000/users
```

👉 Response:

```json
[{"id":1,"name":"Abel","email":"abel@test.com"}]
```

---

### ✔ If you had POST (optional example)

If your server supports POST:

```bash
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"name":"John"}'
```

---

# ✅ 4. Inspect headers and status codes

### ✔ Show headers only:

```bash
curl -I http://localhost:3000/users
```

👉 Example:

```bash
HTTP/1.1 200 OK
Content-Type: application/json
```

---

### ✔ Full request + headers:

```bash
curl -v http://localhost:3000/users
```

👉 You will see:

* Request details
* Response headers
* Status code

---

# ✅ 6. Install NestJS CLI

```bash
npm install -g @nestjs/cli
```

👉 Check:

```bash
nest --version
```

---

# ✅ 7. Create NestJS project

Inside your folder:

```bash
nest new taskflow-backend
```

👉 Choose:

```bash
npm
```

👉 Structure created:

```bash
taskflow-backend/
 ├── src/
 ├── app.module.ts
 ├── main.ts
```

---

### ▶ Run it:

```bash
cd taskflow-backend
npm run start
```

Open:

```bash
http://localhost:3000
```

---

# ✅ 8. Generate Projects Module, Controller, Service

Inside project:

```bash
nest generate module projects
nest generate controller projects
nest generate service projects
```

👉 Short version:

```bash
nest g mo projects
nest g co projects
nest g s projects
```

---

## 📄 projects.module.ts

Automatically created — no need to change now.

---

## 📄 projects.service.ts

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  private projects = [
    { id: 1, title: 'Project A' },
    { id: 2, title: 'Project B' },
  ];

  findAll() {
    return this.projects;
  }
}
```

---



```ts
import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.findAll();
  }
}
```

---



Run:

```bash
npm run start
```

Open:

```bash
http://localhost:3000/projects
```



```json
[
  { "id": 1, "title": "Project A" },
  { "id": 2, "title": "Project B" }
]
```

---



* `nslookup / dig` → find IP of a domain
* `traceroute` → shows path to server
* `curl` → test APIs from terminal
* NestJS:

  * **Module** → group features
  * **Controller** → handles request
  * **Service** → business logic

---

