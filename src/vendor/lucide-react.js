import React from 'react';

function h(type, props, ...children) {
  return React.createElement(type, props, ...children);
}

function Icon({ size = 24, children }) {
  return h(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      'aria-hidden': 'true',
    },
    children,
  );
}

const path = (d) => h('path', { d });
const circle = (props) => h('circle', props);
const rect = (props) => h('rect', props);

export function CalendarDays(props) { return h(Icon, props, path('M8 2v4'), path('M16 2v4'), rect({ x: 3, y: 4, width: 18, height: 18, rx: 2 }), path('M3 10h18')); }
export function ChevronRight(props) { return h(Icon, props, path('m9 18 6-6-6-6')); }
export function GitBranch(props) { return h(Icon, props, path('M6 3v12'), circle({ cx: 6, cy: 18, r: 3 }), circle({ cx: 18, cy: 6, r: 3 }), path('M18 9a9 9 0 0 1-9 9')); }
export function Globe2(props) { return h(Icon, props, circle({ cx: 12, cy: 12, r: 10 }), path('M2 12h20'), path('M12 2a15 15 0 0 1 0 20'), path('M12 2a15 15 0 0 0 0 20')); }
export function MapPin(props) { return h(Icon, props, path('M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z'), circle({ cx: 12, cy: 10, r: 3 })); }
export function Stadium(props) { return h(MapPin, props); }
export function Medal(props) { return h(Icon, props, path('M7 2h10l-3 7H10L7 2Z'), circle({ cx: 12, cy: 15, r: 5 })); }
export function Moon(props) { return h(Icon, props, path('M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z')); }
export function Search(props) { return h(Icon, props, circle({ cx: 11, cy: 11, r: 8 }), path('m21 21-4.3-4.3')); }
export function Shield(props) { return h(Icon, props, path('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z')); }
export function Sparkles(props) { return h(Icon, props, path('M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z')); }
export function Sun(props) { return h(Icon, props, circle({ cx: 12, cy: 12, r: 4 }), path('M12 2v2'), path('M12 20v2'), path('M4.9 4.9l1.4 1.4'), path('M17.7 17.7l1.4 1.4'), path('M2 12h2'), path('M20 12h2')); }
export function Table2(props) { return h(Icon, props, rect({ x: 3, y: 4, width: 18, height: 16, rx: 2 }), path('M3 10h18'), path('M9 4v16')); }
export function Trophy(props) { return h(Icon, props, path('M8 21h8'), path('M12 17v4'), path('M7 4h10v5a5 5 0 0 1-10 0V4Z'), path('M5 5H3v2a4 4 0 0 0 4 4'), path('M19 5h2v2a4 4 0 0 1-4 4')); }
export function Users(props) { return h(Icon, props, path('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'), circle({ cx: 9, cy: 7, r: 4 }), path('M22 21v-2a4 4 0 0 0-3-3.9'), path('M16 3.1a4 4 0 0 1 0 7.8')); }
