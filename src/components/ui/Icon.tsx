import {
  Aperture, ArrowDown, ArrowUpRight, BadgeCheck, Bell, Bot, CalendarClock, Check,
  ChevronLeft, ChevronRight, CircleDot, Code, Eye, FileText, Globe, Inbox, Layers,
  LayoutDashboard, LogOut, Mail, MapPin, Megaphone, Menu, MessageSquare, Minus, Pencil,
  Phone, Plus, Search, Settings, Share2, ShieldCheck, Sparkles, Target, TrendingUp, Users,
  Workflow, X, Zap, type LucideIcon,
} from "lucide-react";

const icons = {
  aperture: Aperture,
  "arrow-down": ArrowDown,
  "arrow-up-right": ArrowUpRight,
  "badge-check": BadgeCheck,
  bell: Bell,
  bot: Bot,
  "calendar-clock": CalendarClock,
  check: Check,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "circle-dot": CircleDot,
  code: Code,
  eye: Eye,
  "file-text": FileText,
  globe: Globe,
  inbox: Inbox,
  layers: Layers,
  "layout-dashboard": LayoutDashboard,
  "log-out": LogOut,
  mail: Mail,
  "map-pin": MapPin,
  megaphone: Megaphone,
  menu: Menu,
  "message-square": MessageSquare,
  minus: Minus,
  pencil: Pencil,
  phone: Phone,
  plus: Plus,
  search: Search,
  settings: Settings,
  "share-2": Share2,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  target: Target,
  "trending-up": TrendingUp,
  users: Users,
  workflow: Workflow,
  x: X,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number;
}

/** Lucide icon with the design system `dt-icon` class. Decorative by default. */
export function Icon({ name, size }: IconProps) {
  const Component = icons[name];
  return <Component className="dt-icon" aria-hidden="true" size={size} />;
}
