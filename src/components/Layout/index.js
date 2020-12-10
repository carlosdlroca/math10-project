import React from "react"

export default function Layout({ children }) {
  return (
    <div className="relative h-screen">
      <div className="px-4 md:px-12 2xl:px-64 py-5">{children}</div>
    </div>
  )
}
