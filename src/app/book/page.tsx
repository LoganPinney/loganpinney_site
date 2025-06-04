// src/app/book/page.tsx

export default function BookPage() {
    return (
      <section className="max-w-4xl mx-auto py-16 px-4 space-y-10">
        <h1 className="text-4xl font-bold text-center">My Book: Unreal Engine for Beginners</h1>

        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          A complete, practical guide to building immersive worlds in Unreal Engine 5.
          Launching soon. Reserve your spot now and get early updates, bonus materials, and launch discounts!
        </p>

        <div className="bg-gray-100 rounded-lg p-8 shadow-md mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">Join the Waitlist</h2>

          {/* Replace this form action URL with your real ConvertKit / MailerLite / Tally form */}
          <form
            action="https://tally.so/r/mB6q5R"
            method="POST"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full sm:w-2/3 p-3 rounded border focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition text-sm"
            >
              Join Now
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-4 text-center">
            No spam. Just real updates and early access.
          </p>
        </div>
      </section>
    )
  }
