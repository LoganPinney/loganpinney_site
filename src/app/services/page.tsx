// src/app/services/page.tsx

export default function ServicesPage() {
    return (
      <section className="max-w-4xl mx-auto py-16 px-4 space-y-10">
        <h1 className="text-4xl font-bold text-center">Services</h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          I offer personalized support for creative and technical projects. Whether you&apos;re building in Unreal, designing curriculum, or looking for
          consulting on world-building, I can help.
        </p>
  
        <div className="space-y-8">
          <div className="border rounded-lg p-6 shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold">🎓 1:1 Mentorship</h2>
            <p className="text-gray-700 mt-2">
              Custom-tailored guidance for students, creators, or professionals learning Unreal Engine, world building, or technical development. Flexible scheduling and project-based mentorship.
            </p>
          </div>
  
          <div className="border rounded-lg p-6 shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold">🧩 Curriculum Development</h2>
            <p className="text-gray-700 mt-2">
              I build and license curriculum for educational platforms, private institutions, and online learning environments. If you want white-label courses or custom learning paths — I can help you scale.
            </p>
          </div>
  
          <div className="border rounded-lg p-6 shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold">🛠️ Contract Development</h2>
            <p className="text-gray-700 mt-2">
              Available for 3–6 month contract work in Unreal Engine, game development, 3D animation, or motion design integration. Includes high-end prototyping, design, optimization, and support.
            </p>
          </div>
        </div>
  
        <div className="text-center mt-10">
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-sm hover:bg-blue-700 transition"
          >
            Let&apos;s Work Together
          </a>
        </div>
      </section>
    )
  }
  