{/* <a
  href="/Nahashon_Mwendwa_CV.pdf"  // This will link to the PDF file in the public folder
  className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
>
  <Download size={20} className="mr-2" />
  View Resume
</a> */}

// data/resume.js
// import { Briefcase, GraduationCap, Award } from 'lucide-react';

// // Timeline data using icon *components* (not JSX)
// export const timelineItems = [
//   {
//     icon: GraduationCap, // ✅ just pass the component
//     date: '2025',
//     title: 'Software Engineer',
//     company: 'Moringa School',
//     description: 'Focused on software engineering, and Database Management.'
//   },
//   {
//     icon: Briefcase,
//     date: 'May 2025 - Aug 2025',
//     title: 'Software Development Intern',
//     company: 'Freight In Time',
//     description: 'Worked on frontend and backend tasks using , php and Laravel.'
//   },
//   {
//     icon: Award,
//     date: 'Dec 2023',
//     title: 'Best Developer Award',
//     company: 'Moringa School',
//     description: 'Recognized for building an end-to-end full-stack application during my period there.'
//   }
// ];




// src/data/resume.js
import { Briefcase, GraduationCap, Award } from 'lucide-react';

// Timeline data (education, experience, achievements)
export const timelineItems = [
  {
    icon: GraduationCap,
    date: '2025',
    title: 'Software Engineer Training',
    company: 'Moringa School',
    description: 'Focused on software engineering fundamentals, database management, and full-stack development.'
  },
  {
    icon: Briefcase,
    date: 'May 2025 - Aug 2025',
    title: 'Software Development Intern',
    company: 'Freight In Time',
    description: 'Worked on frontend and backend development tasks using PHP and Laravel, and supported system integration.'
  },
  {
    icon: Award,
    date: 'Dec 2023',
    title: 'Best Developer Award',
    company: 'Moringa School',
    description: 'Recognized for building an end-to-end full-stack application during the training program.'
  }
];
