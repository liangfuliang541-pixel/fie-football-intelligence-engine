import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Layout() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div
      className="min-h-[100dvh] bg-fie-bg-primary"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 50% 0%, rgba(0,212,160,0.03) 0%, transparent 60%)',
      }}
    >
      {isDesktop ? (
        <>
          <Sidebar />
          <main className="ml-[220px] min-h-[100dvh] p-6">
            <div className="mx-auto max-w-[1400px]">
              <Outlet />
            </div>
          </main>
        </>
      ) : (
        <>
          <main className="min-h-[100dvh] pb-[72px] p-4">
            <Outlet />
          </main>
          <BottomNav />
        </>
      )}
    </div>
  );
}
