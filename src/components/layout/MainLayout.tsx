import Sidebar from './Sidebar';
import Navbar from '../Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-64">
        <Navbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}