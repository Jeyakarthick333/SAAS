'use client';

import { useRouter } from 'next/navigation';
import { ADD_ACTIONS } from '@/lib/types/modules';

interface AddButtonProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  showButton?: boolean;
}

export function AddButton({ isOpen, onToggle, showButton = false }: AddButtonProps) {
  const router = useRouter();

  const handleAction = (route: string) => {
    onToggle(false);
    router.push(route);
  };

  return (
    <>
      {/* Add Button (only if showButton is true) */}
      {showButton && (
        <button
          onClick={() => onToggle(!isOpen)}
          className={`
            px-4 py-2 rounded-lg shadow-sm
            flex items-center gap-2 transition-all duration-300
            ${isOpen ? 'bg-red-500' : 'bg-blue-600 hover:bg-blue-700'}
            text-white font-medium text-sm
          `}
          aria-label="Add new item"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="hidden sm:inline">Add</span>
        </button>
      )}

      {/* Bottom Sheet Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => onToggle(false)}
          />
          
          {/* Bottom Sheet / Modal */}
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
            <div className="w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl animate-slide-up max-h-[80vh] overflow-hidden">
              <div className="p-6 overflow-y-auto max-h-[80vh]">
                {/* Handle */}
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
                
                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New</h2>
                
                {/* Actions Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {ADD_ACTIONS.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleAction(action.route)}
                      className="
                        flex flex-col items-center justify-center p-5 rounded-xl
                        bg-gray-50 hover:bg-gray-100 transition-colors
                        border border-gray-200 hover:border-blue-300
                        hover:shadow-md
                      "
                    >
                      <div className={`w-14 h-14 rounded-full ${action.color} flex items-center justify-center mb-3 text-2xl`}>
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700 text-center">
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

