// src/data/resume.js
import { Briefcase, GraduationCap } from "lucide-react";

// Timeline data (education, experience, achievements)
export const timelineItems = [
  {
    icon: GraduationCap,
    date: "2025",
    title: "Software Engineer Training",
    company: "Moringa School",
    description:
      "Focused on software engineering fundamentals, database management, and full-stack development.",
  },
  {
    icon: Briefcase,
    date: "May 2025 – Present",
    title: "Software Developer (Intern → Full-time)",
    company: "Freight In Time",
    description:
      "Over 1 year at Freight In Time — started as an intern and transitioned to a full-time developer role, building and maintaining internal systems across the logistics platform.",
    highlights: [
      "Revenue integration and quotation system built with PHP, Laravel, SQL Server, and stored procedures.",
      "Azure user management system: create users for multiple applications at once, assign roles/functions/offices, sync users from Odoo, and disable accounts.",
      "Automated email system for customers.",
      "Login tracker to monitor user activity across systems.",
      "Additional internal tools to optimize workflows and system monitoring.",
    ],
  },
];
