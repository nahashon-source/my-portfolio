// src/data/skills.js

const skillCategories = [
  {
    title: "Frontend",
    icon: "Palette",
    description: "Interfaces & experiences",
    color: "#818cf8",
    skills: [
      { name: "React",       level: 90, years: 2 },
      { name: "TypeScript",  level: 82, years: 2 },
      { name: "Tailwind CSS",level: 88, years: 2 },
      { name: "Framer Motion",level: 75, years: 1 },
      { name: "Next.js",     level: 70, years: 1 },
    ],
  },
  {
    title: "Backend",
    icon: "Terminal",
    description: "APIs & server logic",
    color: "#34d399",
    skills: [
      { name: "FastAPI",  level: 85, years: 2 },
      { name: "Laravel",  level: 80, years: 2 },
      { name: "Python",   level: 85, years: 2 },
      { name: "PHP",      level: 75, years: 2 },
      { name: "Node.js",  level: 65, years: 1 },
    ],
  },
  {
    title: "Database",
    icon: "Database",
    description: "Data & storage",
    color: "#67e8f9",
    skills: [
      { name: "PostgreSQL", level: 82, years: 2 },
      { name: "MySQL",      level: 85, years: 2 },
      { name: "SQL Server", level: 75, years: 1 },
      { name: "Redis",      level: 60, years: 1 },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: "Settings",
    description: "Deploy & infrastructure",
    color: "#fbbf24",
    skills: [
      { name: "Docker",     level: 72, years: 1 },
      { name: "Azure Blob", level: 78, years: 1 },
      { name: "Vercel",     level: 85, years: 2 },
      { name: "Render",     level: 80, years: 1 },
    ],
  },
  {
    title: "Tools & Workflow",
    icon: "Code2",
    description: "Dev environment",
    color: "#a78bfa",
    skills: [
      { name: "Git",     level: 88, years: 2 },
      { name: "VS Code", level: 95, years: 2 },
      { name: "Postman", level: 85, years: 2 },
      { name: "Vite",    level: 80, years: 1 },
    ],
  },
  {
    title: "Currently Learning",
    icon: "Globe",
    description: "Expanding the stack",
    color: "#f472b6",
    skills: [
      { name: "Kubernetes", level: 35, years: 0 },
      { name: "GraphQL",    level: 45, years: 0 },
      { name: "Rust",       level: 20, years: 0 },
      { name: "AWS",        level: 40, years: 0 },
    ],
  },
];

export default skillCategories;