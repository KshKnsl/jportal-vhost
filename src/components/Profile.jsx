import React, { useState, useEffect } from "react"
import { User, Mail, Phone, MapPin, GraduationCap } from 'lucide-react'

export default function Profile({ w, profileData, setProfileData }) {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('personal')

  useEffect(() => {
    const fetchProfileData = async () => {
      if (profileData) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const data = await w.get_personal_info()
        setProfileData(data)
      } catch (error) {
        console.error("Failed to fetch profile data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [w, profileData, setProfileData])

  if (loading) {
    return null
  }

  const info = profileData?.generalinformation || {}
  const qualifications = profileData?.qualification || []

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 space-y-8">
      <div className="bg-gray-800 dark:bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-24 h-24 bg-gray-600 dark:bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-white dark:text-black">
            {info.studentname?.charAt(0)}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white dark:text-black">{info.studentname}</h1>
            <p className="text-sm text-gray-300 dark:text-gray-700">
              {info.registrationno} | {info.programcode} - {info.branch}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 dark:bg-white shadow rounded-lg">
        <div className="flex border-b border-gray-700 dark:border-gray-200">
          {['personal', 'academic', 'contact', 'education'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 px-4 text-center font-medium ${
                activeTab === tab
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-300 hover:text-gray-100 dark:text-gray-700 dark:hover:text-gray-900'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 text-white dark:text-black">Personal Information</h2>
              <InfoRow icon={User} label="Date of Birth" value={info.dateofbirth} />
              <InfoRow icon={User} label="Gender" value={info.gender} />
              <InfoRow icon={User} label="Blood Group" value={info.bloodgroup} />
              <InfoRow icon={User} label="Nationality" value={info.nationality} />
              <InfoRow icon={User} label="Category" value={info.category} />
            </div>
          )}
          {activeTab === 'academic' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 text-white dark:text-black">Academic Information</h2>
              <InfoRow icon={GraduationCap} label="Program" value={info.programcode} />
              <InfoRow icon={GraduationCap} label="Branch" value={info.branch} />
              <InfoRow icon={GraduationCap} label="Section" value={info.sectioncode} />
              <InfoRow icon={GraduationCap} label="Batch" value={info.batch} />
              <InfoRow icon={GraduationCap} label="Semester" value={info.semester} />
              <InfoRow icon={GraduationCap} label="Institute" value={info.institutecode} />
              <InfoRow icon={GraduationCap} label="Academic Year" value={info.academicyear} />
              <InfoRow icon={GraduationCap} label="Admission Year" value={info.admissionyear} />
            </div>
          )}
          {activeTab === 'contact' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-white dark:text-black">Contact Information</h2>
                <div className="space-y-4">
                  <InfoRow icon={Mail} label="Student Email (College)" value={info.studentemailid} />
                  <InfoRow icon={Mail} label="Student Email (Personal)" value={info.studentpersonalemailid} />
                  <InfoRow icon={Phone} label="Mobile" value={info.studentcellno} />
                  <InfoRow icon={Phone} label="Telephone" value={info.studenttelephoneno || "N/A"} />
                  <InfoRow icon={User} label="Father's Name" value={info.fathersname} />
                  <InfoRow icon={User} label="Mother's Name" value={info.mothername} />
                  <InfoRow icon={Mail} label="Parent's Email" value={info.parentemailid} />
                  <InfoRow icon={Phone} label="Parent's Mobile" value={info.parentcellno} />
                  <InfoRow icon={Phone} label="Parent's Telephone" value={info.parenttelephoneno || "N/A"} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 text-white dark:text-black">Address Information</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2 text-white dark:text-black">Current Address</h3>
                    <InfoRow icon={MapPin} label="Address" value={[info.caddress1, info.caddress3].filter(Boolean).join(", ")} />
                    <InfoRow icon={MapPin} label="City" value={info.ccityname} />
                    <InfoRow icon={MapPin} label="District" value={info.cdistrict} />
                    <InfoRow icon={MapPin} label="State" value={info.cstatename} />
                    <InfoRow icon={MapPin} label="Postal Code" value={info.cpostalcode} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-white dark:text-black">Permanent Address</h3>
                    <InfoRow icon={MapPin} label="Address" value={[info.paddress1, info.paddress2, info.paddress3].filter(Boolean).join(", ")} />
                    <InfoRow icon={MapPin} label="City" value={info.pcityname} />
                    <InfoRow icon={MapPin} label="District" value={info.pdistrict} />
                    <InfoRow icon={MapPin} label="State" value={info.pstatename} />
                    <InfoRow icon={MapPin} label="Postal Code" value={info.ppostalcode} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'education' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white dark:text-black">Educational Qualifications</h2>
              {qualifications.map((qual, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="font-semibold mb-2 text-white dark:text-black">{qual.qualificationcode}</h3>
                  <div className="space-y-2">
                    <InfoRow icon={GraduationCap} label="Board" value={qual.boardname} />
                    <InfoRow icon={GraduationCap} label="Year of Passing" value={qual.yearofpassing} />
                    <InfoRow icon={GraduationCap} label="Marks Obtained" value={`${qual.obtainedmarks}/${qual.fullmarks}`} />
                    <InfoRow icon={GraduationCap} label="Percentage" value={`${qual.percentagemarks}%`} />
                    <InfoRow icon={GraduationCap} label="Division" value={qual.division} />
                    {qual.grade && <InfoRow icon={GraduationCap} label="Grade" value={qual.grade} />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-center p-4 text-sm text-gray-300 dark:text-gray-700">
        Made with Big 🍆 Energy by  <a href="https://github.com/codeblech" className="text-blue-500 dark:text-blue-400 hover:underline">Yash Malik</a>
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-gray-300 dark:text-gray-700" />
      <span className="font-medium text-white dark:text-black">{label}:</span>
      <span className="text-gray-300 dark:text-gray-700">{value || "N/A"}</span>
    </div>
  )
}