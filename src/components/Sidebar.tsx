import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Radio,
  Wallet,
  BarChart3,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Calendar, label: 'Matches', path: '/matches' },
  { icon: ClipboardList, label: 'PreMatch', path: '/prematch' },
  { icon: Radio, label: 'Live', path: '/live' },
  { icon: Wallet, label: 'Holding', path: '/holding' },
  { icon: BarChart3, label: 'Review', path: '/review' },
  { icon: Users, label: 'Roundtable', path: '/roundtable' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-[100dvh] w-[220px] flex-col border-r border-fie-border-primary bg-fie-bg-primary">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-fie-border-primary px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgba(0,212,160,0.1)]">
          <LayoutDashboard className="h-5 w-5 text-fie-accent-teal" />
        </div>
        <span className="text-xl font-bold tracking-tight text-fie-text-primary">FIE</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'border-l-[3px] border-l-fie-accent-teal bg-[rgba(0,212,160,0.08)] text-fie-accent-teal'
                        : 'border-l-[3px] border-l-transparent text-fie-text-secondary hover:bg-[rgba(255,255,255,0.03)] hover:text-fie-text-primary'
                    )
                  }
                >
                  <Icon className="h-[18px] w-[18px] flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="border-t border-fie-border-primary px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fie-border-hover text-xs font-semibold text-fie-text-secondary">
            U
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-fie-text-primary">User</span>
            <span className="text-[11px] text-fie-text-muted">Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
