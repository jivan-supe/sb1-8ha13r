import { Link } from 'react-router-dom';

interface MenuItemProps {
  item: {
    icon?: React.ReactNode;
    label: string;
    path: string;
  };
  isActive: boolean;
}

export default function SidebarMenuItem({ item, isActive }: MenuItemProps) {
  return (
    <Link
      to={item.path}
      className={`flex items-center space-x-2 px-4 py-2.5 rounded-md transition-colors duration-200 ${
        isActive
          ? 'bg-indigo-50 text-indigo-600'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {item.icon}
      <span className="font-medium">{item.label}</span>
    </Link>
  );
}