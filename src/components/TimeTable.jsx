import React from 'react'

const TimeTable = () => {
  return (
    <div className="top-0 fixed z-50">
      <iframe 
        src="https://planner.jpoop.in/" 
        style={{ width: '100vw', height: '100vh', border: 'none' }} 
        title="Google"
      />
    </div>
  )
}

export default TimeTable