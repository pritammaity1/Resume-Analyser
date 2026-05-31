import { Quote } from "lucide-react";

export default function Testimonial() {
  return (
    <div className="py-8 px-4 max-w-2xl mx-auto  ">
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center">
        {/* quote Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
            <Quote size={18} className="text-blue-500" />
          </div>
        </div>

        {/* Quote text  */}

        <p className="text-base text-gray-600 leading-relaxed italic mb-6">
          "I was getting rejected automatically from every application. After
          using ResumeIQ to find the missing keywords for a Project Manager
          role, I landed 3 interviews in one week."
        </p>

        {/* Author */}

        <div className="flex items-center justify-center gap-3">
          {/* avatar placeholder */}
          <div className="w-9 h-9 rounded-full bg-blue-600 justify-center text-white text-sm font-semibold">
            S
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">Sarah Jenkins</p>
            <p className="text-xs text-gray-400">Senior PM at TechCore</p>
          </div>
        </div>
      </div>
    </div>
  );
}
