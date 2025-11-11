'use client';

import Link from 'next/link';
import { MODULES } from '@/lib/types/modules';

export default function ModulesHub() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Modules Hub</h1>
        <p className="text-gray-600">All your productivity tools in one place</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {MODULES.map((module) => (
          <Link
            key={module.id}
            href={module.route}
            className="
              bg-white rounded-xl shadow-sm p-6 border border-gray-100
              hover:shadow-md hover:border-blue-200 transition-all
              flex flex-col items-center justify-center
              min-h-[140px]
            "
          >
            <div className={`w-16 h-16 rounded-full ${module.color} flex items-center justify-center mb-3 text-3xl`}>
              {module.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-center">{module.name}</h3>
            <p className="text-xs text-gray-500 text-center">{module.description}</p>
          </Link>
        ))}
      </div>

      {/* Favorites Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">⭐ Favorites</h2>
        <div className="grid grid-cols-2 gap-4">
          {MODULES.slice(0, 4).map((module) => (
            <Link
              key={module.id}
              href={module.route}
              className="
                bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-sm p-4 border border-yellow-200
                hover:shadow-md transition-all
                flex items-center gap-3
              "
            >
              <div className={`w-12 h-12 rounded-full ${module.color} flex items-center justify-center text-2xl`}>
                {module.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{module.name}</h3>
                <p className="text-xs text-gray-600">{module.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

