import React from 'react';

function Icon({ size = 24, children }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export function CalendarDays(props) { return <Icon {...props}><path d="M8 2v4" /><path d="M16 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" /></Icon>; }
export function ChevronRight(props) { return <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>; }
export function GitBranch(props) { return <Icon {...props}><path d="M6 3v12" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></Icon>; }
export function Globe2(props) { return <Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15 15 0 0 1 0 20" /><path d="M12 2a15 15 0 0 0 0 20" /></Icon>; }
export function MapPin(props) { return <Icon {...props}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Icon>; }
export function Stadium(props) { return <MapPin {...props} />; }
export function Medal(props) { return <Icon {...props}><path d="M7 2h10l-3 7H10L7 2Z" /><circle cx="12" cy="15" r="5" /></Icon>; }
export function Moon(props) { return <Icon {...props}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></Icon>; }
export function Search(props) { return <Icon {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Icon>; }
export function Shield(props) { return <Icon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></Icon>; }
export function Sparkles(props) { return <Icon {...props}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /></Icon>; }
export function Sun(props) { return <Icon {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M4.9 4.9l1.4 1.4" /><path d="M17.7 17.7l1.4 1.4" /><path d="M2 12h2" /><path d="M20 12h2" /></Icon>; }
export function Table2(props) { return <Icon {...props}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18" /><path d="M9 4v16" /></Icon>; }
export function Trophy(props) { return <Icon {...props}><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M5 5H3v2a4 4 0 0 0 4 4" /><path d="M19 5h2v2a4 4 0 0 1-4 4" /></Icon>; }
export function Users(props) { return <Icon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /><path d="M16 3.1a4 4 0 0 1 0 7.8" /></Icon>; }
