// ============================================================
// BRAND & SITE CONSTANTS
// ============================================================

export const SITE = {
  name: "Eunich John Sese",
  role: "Frontend & Backend Developer",
  location: "Manila, Philippines",
  email: "eunichjohns@gmail.com",
  github: "https://github.com/gamothalaman090-jpg",
  linkedin: "https://www.linkedin.com/in/eunich-john-sese-161685389/",
  tagline: "I build clean web apps,\nfront to back,\nthat actually ship.",
} as const;

// ============================================================
// NAVIGATION
// ============================================================
export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

// ============================================================
// PROJECTS / CASE STUDIES
// ============================================================
export const PROJECTS = [
  {
    title: "Nini",
    category: "HR LEAVE & ATTENDANCE MANAGEMENT",
    image: "/projects/nini.png",
    span: "lg:col-span-3 lg:row-span-2",
    cursorText: "View Platform",
    description: "A beautiful, fast, and intuitive HR platform that simplifies leave requests, attendance tracking, and team management for modern businesses.",
    github: "https://github.com/gamothalaman090-jpg/hr-attendance-leave-management",
    live: "https://hr-attendance-leave-management.vercel.app/",
    tech: ["React", "JavaScript", "Tailwind CSS", "Vite", "Node.js", "Express.js", "MongoDB"],
    role: "Full Stack Developer"
  }
] as const;

// ============================================================
// SKILLS / STACK
// ============================================================
export const SKILL_GROUPS = [
  {
    label: "Frontend",
    skills: ["JavaScript", "TypeScript", "React", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Three.js", "Flutter"],
  },
  {
    label: "Backend",
    skills: ["Python", "Java", "Express.js", "MySQL", "MongoDB"],
  },
  {
    label: "Tools",
    skills: ["Git", "GitHub", "Android Studio", "Vercel", "Dart"],
  },
] as const;

// ============================================================
// HERO STATS — honest student metrics
// ============================================================
export const STATS = [
  { value: "3rd", label: "Year IT Student" },
  { value: PROJECTS.length.toString(), label: "Live Projects" },
  { value: "NU", label: "Manila Campus" },
  { value: "Open", label: "To Opportunities" },
];

