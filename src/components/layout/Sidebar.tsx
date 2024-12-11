import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard,
  Package,
  Target,
  BarChart3,
  Settings,
  Brain,
  TrendingUp,
  Bell,
  Mail,
  Database,
  ChevronDown,
  ChevronRight,
  Lock
} from 'lucide-react';
import SidebarLink from './SidebarLink';
import SidebarSubmenu from './SidebarSubmenu';

export default function Sidebar() {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>(['competitor-board']);

  const toggleSubmenu = (key: string) => {
    setOpenMenus(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const mainMenuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/',
    },
    {
      key: 'product',
      label: 'Product Info',
      icon: <Package className="h-5 w-5" />,
      path: '/product/add',
    },
    {
      key: 'competitors',
      label: 'Competitors',
      icon: <Target className="h-5 w-5" />,
      path: '/competitors',
    },
  ];

  const submenuItems = [
    {
      key: 'competitor-board',
      label: 'Competitor Board',
      icon: <BarChart3 className="h-5 w-5" />,
      submenu: [
        {
          key: 'insights',
          label: 'Insights',
          path: '/competitor-board/insights',
        },
        {
          key: 'swot',
          label: 'SWOT',
          path: '/competitor-board/swot',
          disabled: true,
        },
        {
          key: 'market-trends',
          label: 'Market Trends',
          path: '/competitor-board/market-trends',
          disabled: true,
        },
        {
          key: 'activity-alerts',
          label: 'Activity Alerts',
          path: '/competitor-board/activity-alerts',
          disabled: true,
        },
        {
          key: 'newsletters',
          label: 'Newsletters',
          path: '/competitor-board/newsletters',
          disabled: true,
        },
        {
          key: 'ai-copilot',
          label: 'AI Co-Pilot',
          path: '/competitor-board/ai-copilot',
        },
      ],
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      submenu: [
        {
          key: 'data-sources',
          label: 'Data Sources',
          path: '/settings/data-sources',
          disabled: true,
        },
      ],
    },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <BarChart3 className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-bold text-gray-800">CompetitorIQ</span>
        </Link>
      </div>

      <nav className="p-4 space-y-1">
        {mainMenuItems.map((item) => (
          <SidebarLink
            key={item.key}
            item={item}
            isActive={location.pathname === item.path}
          />
        ))}

        <div className="my-4 border-t border-gray-200" />

        {submenuItems.map((item) => (
          <SidebarSubmenu
            key={item.key}
            item={item}
            isOpen={openMenus.includes(item.key)}
            onToggle={() => toggleSubmenu(item.key)}
            currentPath={location.pathname}
          />
        ))}
      </nav>
    </div>
  );
}