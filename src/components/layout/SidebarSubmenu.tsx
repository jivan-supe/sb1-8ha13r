import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Lock } from 'lucide-react';

interface SubmenuItemProps {
  item: {
    key: string;
    label: string;
    icon?: React.ReactNode;
    submenu: Array<{
      key: string;
      label: string;
      path: string;
      disabled?: boolean;
    }>;
  };
  isOpen: boolean;
  onToggle: () => void;
  currentPath: string;
}

export default function SidebarSubmenu({ 
  item, 
  isOpen, 
  onToggle, 
  currentPath 
}: SubmenuItemProps) {
  return (
    <div className="space-y-1">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-md transition-colors duration-200 ${
          isOpen ? 'bg-gray-50 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center space-x-2">
          {item.icon}
          <span className="font-medium">{item.label}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="pl-4 space-y-1">
          {item.submenu.map((subItem) => (
            subItem.disabled ? (
              <div
                key={subItem.key}
                className="flex items-center justify-between px-4 py-2 rounded-md text-gray-400 cursor-not-allowed"
              >
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>{subItem.label}</span>
                </div>
                <Lock className="h-4 w-4" />
              </div>
            ) : (
              <Link
                key={subItem.key}
                to={subItem.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                  currentPath === subItem.path
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                <span>{subItem.label}</span>
              </Link>
            )
          ))}
        </div>
      )}
    </div>
  );
}