// src/app/contact/page.tsx

export default function ContactPage() {
    return (
      <section className="max-w-4xl mx-auto py-16 px-4 space-y-10">
        <h1 className="text-4xl font-bold text-center">Get In Touch</h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Want to work together, collaborate, or ask a question? Fill out the form below or use the link to schedule a meeting.
        </p>

        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          {/* TODO: Replace with your real email handling form (Tally, Formspree, Resend, etc.) */}
          <form
            action="https://tally.so/r/mR21aj"
            method="POST"
            className="space-y-6"
          >
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition text-sm"
            >
              Send Message
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Your message will be sent securely. You’ll get a reply within 24–48 hours.
          </p>
        </div>

        <div className="text-center mt-10 text-sm text-gray-500">
          <p>Prefer to book a call?</p>
          <a
            href="https://calendly.com/loganpinney-info/30min" // Replace with your Calendly
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Schedule via Calendly
          </a>
        </div>
      </section>
    )
  }
