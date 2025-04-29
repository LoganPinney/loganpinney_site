// src/app/courses/page.tsx

import Link from 'next/link'

export default function CoursesPage() {
  return (
    <section className="max-w-5xl mx-auto py-16 px-4 space-y-10">
      <h1 className="text-4xl font-bold text-center">Courses</h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto">
        Learn Unreal Engine, world-building, and real-time production from the ground up. I offer beginner to intermediate courses across multiple platforms.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 mt-10">
        {/* Course 1 */}
        <div className="border rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Unreal Engine Fundamentals</h2>
          <p className="text-gray-700 flex-1">
            A complete beginner’s guide to Unreal Engine — navigation, materials, world building, lighting, audio, and publishing.
          </p>
          <Link
            href="https://www.coursera.org/learn/unreal-engine-fundamentals" // Update this to your real link
            target="_blank"
            className="mt-4 inline-block text-blue-600 hover:underline text-sm"
          >
            View Course
          </Link>
        </div>

        {/* Course 2 */}
        <div className="border rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">UEFN: Fortnite Creator Series</h2>
          <p className="text-gray-700 flex-1">
            Learn how to build fully playable experiences using Unreal Editor for Fortnite. Focused on level design, scripting, and publishing.
          </p>
          <Link
            href="https://your-uefn-course-link.com" // Placeholder — update later
            target="_blank"
            className="mt-4 inline-block text-blue-600 hover:underline text-sm"
          >
            Coming Soon
          </Link>
        </div>

        {/* Add More Courses As Needed */}
      </div>

      <div className="text-center mt-12">
        <Link
          href="https://www.youtube.com/@loganpinney" // Replace with your YouTube
          target="_blank"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-sm hover:bg-blue-700 transition"
        >
          Subscribe on YouTube
        </Link>
      </div>
    </section>
  )
}
