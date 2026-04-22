import { Link } from "@tanstack/react-router";

const popularCourses = [
  {
    name: "Basic Computer Course",
    duration: "3 Months",
    fee: "₹2,500",
  },
  {
    name: "DCA",
    duration: "6 Months",
    fee: "₹5,000",
  },
  {
    name: "ADCA",
    duration: "12 Months",
    fee: "₹9,500",
  },
];

export default function HomePage() {
  const handleApplyNow = () => {
    window.open("https://ar-computer-educatio-lnzo.bolt.host/", "_blank");
  };

  const handleEnrollCourse = (courseName: string) => {
    const url = `https://ar-computer-educatio-lnzo.bolt.host/?course=${encodeURIComponent(courseName)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
              AR COMPUTER EDUCATION
            </h1>
            <p className="text-blue-100 mt-1">Build Your Future With Technology</p>
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            <Link
              to="/student/login"
              className="px-5 py-2 rounded-2xl bg-white text-blue-800 font-semibold shadow hover:scale-105 transition"
            >
              Student Login
            </Link>
            <Link
              to="/admin/login"
              className="px-5 py-2 rounded-2xl border border-white font-semibold hover:bg-white hover:text-blue-800 transition"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Admission Open 2026
          </span>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Learn Computer Skills For a Better Career
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            Join AR Computer Education and learn modern computer courses, office
            tools, graphic design, Tally, web development and more with expert
            guidance.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleApplyNow}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition"
            >
              Apply Now
            </button>

            <Link
              to="/courses"
              className="border border-slate-300 px-6 py-3 rounded-2xl font-semibold hover:bg-slate-100 transition"
            >
              View Courses
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
            className="rounded-2xl h-[350px] w-full object-cover"
            alt="Computer Education"
          />

          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div className="bg-blue-50 rounded-2xl p-4">
              <h3 className="text-2xl font-bold text-blue-700">500+</h3>
              <p className="text-sm text-slate-600">Students</p>
            </div>
            <div className="bg-cyan-50 rounded-2xl p-4">
              <h3 className="text-2xl font-bold text-cyan-700">10+</h3>
              <p className="text-sm text-slate-600">Courses</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-4">
              <h3 className="text-2xl font-bold text-green-700">100%</h3>
              <p className="text-sm text-slate-600">Support</p>
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold">Our Popular Courses</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course) => (
              <div
                key={course.name}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow"
              >
                <h4 className="text-2xl font-bold">{course.name}</h4>
                <p className="mt-3 text-slate-600">Duration: {course.duration}</p>
                <p className="text-slate-600">Course Fee: {course.fee}</p>
                <button
                  type="button"
                  onClick={() => handleEnrollCourse(course.name)}
                  className="mt-6 w-full bg-blue-700 text-white py-3 rounded-2xl font-semibold"
                >
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
