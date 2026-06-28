import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  Calendar,
  Radio,
  Wallet,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Calendar, label: 'Matches', path: '/matches' },
  { icon: Radio, label: 'Live', path: '/live' },
  { icon: Wallet, label: 'Holding', path: '/holding' },
  { icon: Users, label: 'Roundtable', path: '/roundtable' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex h-14 w-full items-center justify-around border-t border-fie-border-primary bg-[rgba(11,14,20,0.95)] backdrop-blur-xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-colors duration-200',
                isActive ? 'text-fie-accent-teal' : 'text-fie-text-muted'
              )
            }
          >
            <Icon className="h-5 w-5" />
            <span className="text-[11px] font-medium">{tab.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
