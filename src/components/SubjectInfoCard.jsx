import React, { useState } from 'react'
import { Book, Users, Beaker } from 'lucide-react'

function Badge({ children }) {
  return (
    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-700 text-gray-200 dark:bg-gray-200 dark:text-gray-800">
      {children}
    </span>
  )
}

export function SubjectInfoCard({ subject }) {
  const getComponentIconWithName = (type) => {
    switch (type) {
      case 'L': return <><Book className="w-4 h-4" /> Lecture</>
      case 'T': return <><Users className="w-4 h-4" /> Tutorial</>
      case 'P': return <><Beaker className="w-4 h-4" /> Practical</>
      default: return null
    }
  }

  const getComponentName = (type) => {
    switch (type) {
      case 'L': return 'Lecture'
      case 'T': return 'Tutorial'
      case 'P': return 'Practical'
      default: return ''
    }
  }

  return (
    <div className="bg-[#21252b] dark:bg-white rounded-lg shadow-md p-4 mb-4 transition-all hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-4">
          <h2 className="text-sm md:text-lg font-semibold text-gray-200 dark:text-gray-800 mb-1">{subject.name}</h2>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm max-[390px]:text-xs font-semibold text-gray-400 dark:text-gray-600">{subject.code}</span>
            {subject.isAudit && (
              <Badge>Audit</Badge>
            )}
          </div>
          <div className="space-y-1">
            {subject.components.map((component, idx) => (
                <div key={idx} className="flex items-center text-sm max-[390px]:text-xs font-semibold text-gray-300 dark:text-gray-700">
                  {getComponentIconWithName(component.type)}
                  <span className="ml-2">{component.teacher}</span>
                </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xl font-bold text-gray-200 dark:text-gray-800">
            {subject.credits.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-600">Credits</span>
        </div>
      </div>
    </div>
  )
}

export default SubjectInfoCard
