import { NavLink } from 'react-router-dom'
import { UserRound, GraduationCap, FileSpreadsheet, BookOpen, ClipboardList } from 'lucide-react'

const navItems = [
  { name: 'Attendance', path: '/attendance', icon: ClipboardList },
  { name: 'Grades', path: '/grades', icon: GraduationCap },
  { name: 'Exams', path: '/exams', icon: FileSpreadsheet },
  { name: 'Subjects', path: '/subjects', icon: BookOpen },
  { name: 'Profile', path: '/profile', icon: UserRound },
]

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#191C20] dark:bg-gray-100 py-2 px-4">
      <ul className="flex items-center justify-between max-w-screen-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.name} className="flex-1">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'text-blue-500 dark:text-blue-600'
                      : 'text-gray-400 hover:text-gray-200 dark:text-gray-500 dark:hover:text-gray-800'
                  }`
                }
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

