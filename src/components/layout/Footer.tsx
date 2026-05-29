export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col sm:flex-row items-center
                        justify-between py-6 gap-4"
        >
          {/* Logo */}
          <span className="font-bold text-gray-900 text-sm">
            Resume<span className="text-blue-600">IQ</span>
          </span>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Help Center
            </a>

            <a
              href="#"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Terms of Service
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} ResumeIQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
