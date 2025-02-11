
import React from "react"
import { motion } from "framer-motion"

export default function MarksCard({ course }) {
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 60) return "bg-yellow-500"
    if (percentage >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="bg-[black] dark:bg-white rounded-lg p-3 sm:p-4 border border-gray-700 dark:border-gray-300"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.2 }}
        className="space-y-1 mb-3 sm:mb-4"
      >
        <h3 className="font-bold text-sm sm:text-base dark:text-black">{course.name}</h3>
        <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-600">{course.code}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="space-y-2 sm:space-y-3"
      >
        {Object.entries(course.exams).map(([examName, marks], index) => {
          const percentage = (marks.OM / marks.FM) * 100
          return (
            <motion.div
              key={examName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex-1">
                  <ProgressBar percentage={percentage} color={getProgressColor(percentage)} />
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                  className="text-xs sm:text-sm text-gray-400 dark:text-gray-600 min-w-[50px] sm:min-w-[60px] text-right"
                >
                  {marks.OM}/{marks.FM}
                </motion.span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

function ProgressBar({ percentage, color }) {
  return (
    <div className="relative h-1.5 sm:h-2 bg-gray-700 dark:bg-gray-300 rounded-full overflow-hidden">
      <motion.div
        className={`absolute top-0 left-0 h-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  )
}

