// src/app/page.tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="max-w-5xl mx-auto text-center py-16">
      <h1 className="text-4xl sm:text-6xl font-extrabold mb-6">
        Logan Pinney
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Mentor. Developer. World Builder. <br />
        Helping people bring worlds to life in Unreal Engine and beyond.
      </p>

      <div className="flex justify-center gap-4 flex-wrap mb-12">
        <Link
          href="/services"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          Work With Me
        </Link>
        <Link
          href="/courses"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-sm hover:bg-blue-50 transition"
        >
          View Courses
        </Link>
        <Link
          href="/book"
          className="text-sm underline text-gray-500 hover:text-black"
        >
          Preorder My Book
        </Link>
      </div>

      <div className="text-sm text-gray-400 max-w-xl mx-auto">
        <p>
          With a background in game development, education, and technical
          artistry, I offer 1:1 mentorship, project consulting, and world-class
          curriculum design in Unreal Engine and real-time media.
        </p>
      </div>
    </section>
  )
}
