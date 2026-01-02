"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  Settings, 
  BarChart3, 
  Truck,
  Wallet,
  Store,
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CornerUpLeft,
  Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarItems = [
  { name: 'Tổng quan', href: '/dashboard', icon: LayoutDashboard },
  { 
    name: 'Bán hàng', 
    href: '/shop/100934568', // POS is now at root of shop
    icon: ShoppingCart,
    subItems: [
      { name: 'Bán hàng', href: '/shop/100934568', icon: ShoppingCart },
      { name: 'Trả hàng', href: '/shop/100934568/returned-orders', icon: CornerUpLeft },
    ]
  },
  { 
    name: 'Đơn hàng', 
    href: '/shop/100934568/order', 
    icon: FileText,
    subItems: [
      { name: 'Đơn hàng', href: '/shop/100934568/order', icon: FileText },
      { name: 'Livestream', href: '/shop/100934568/livestream-manager', icon: Video },
      { name: 'Đổi trả', href: '/shop/100934568/list-returned-orders', icon: CornerUpLeft },
    ]
  },
  { name: 'Sản phẩm', href: '#', icon: Package },
  { name: 'Khách hàng', href: '#', icon: Users },
  { name: 'Vận chuyển', href: '#', icon: Truck },
  { name: 'Thu chi', href: '#', icon: Wallet },
  { name: 'Cửa hàng', href: '#', icon: Store },
  { name: 'Báo cáo', href: '#', icon: BarChart3 },
  { name: 'Cấu hình', href: '#', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(['Bán hàng']); // Default open "Bán hàng"

  const toggleMenu = (name: string) => {
    if (isCollapsed) return;
    setOpenMenus(prev => 
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  const isActiveLink = (href: string) => {
      if (href === '/dashboard' && pathname.includes('/overview')) return true;
      return pathname === href;
  };

  const isMenuOpen = (name: string) => openMenus.includes(name);

  return (
    <aside 
      className={`hidden lg:flex flex-col bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo Area */}
      <div className={`h-16 flex items-center px-4 border-b border-gray-50 gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
        <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0">P</div>
            {!isCollapsed && <span className="text-xl font-bold text-blue-600 whitespace-nowrap overflow-hidden">Pancake POS</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = isActiveLink(item.href) || (item.subItems && item.subItems.some(sub => isActiveLink(sub.href)));
          const Icon = item.icon;
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isOpen = isMenuOpen(item.name);
          
          return (
            <div key={item.name}>
                <div
                  onClick={() => hasSubItems && toggleMenu(item.name)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative cursor-pointer ${
                    isActive && !hasSubItems
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                    {/* Main Item Link or Button */}
                   {!hasSubItems ? (
                       <Link href={item.href === '/dashboard' ? `/shop/100934568/overview` : item.href} className="flex items-center gap-3 w-full">
                           <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                           {!isCollapsed && <span className="whitespace-nowrap overflow-hidden flex-1">{item.name}</span>}
                       </Link>
                   ) : (
                       <div className="flex items-center gap-3 w-full">
                           <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                           {!isCollapsed && <span className="whitespace-nowrap overflow-hidden flex-1">{item.name}</span>}
                           {!isCollapsed && (
                               <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                           )}
                       </div>
                   )}

                   {isActive && !hasSubItems && (
                        <motion.div 
                            layoutId="sidebar-active"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full"
                        />
                   )}
                </div>

                {/* Sub Items */}
                <AnimatePresence>
                    {hasSubItems && isOpen && !isCollapsed && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-gray-50/50 rounded-b-lg mb-1"
                        >
                            {item.subItems.map((sub) => {
                                const isSubActive = isActiveLink(sub.href);
                                return (
                                    <Link 
                                        key={sub.name}
                                        href={sub.href}
                                        className={`flex items-center gap-3 pl-11 pr-3 py-2 text-sm transition-colors ${
                                            isSubActive ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${isSubActive ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                                        {sub.name}
                                    </Link>
                                )
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Collapse Button (Bottom) */}
      <div className="p-4 border-t border-gray-50">
         <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium w-full transition-colors ${isCollapsed ? 'justify-center' : ''}`}
         >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">Thu gọn</span>}
         </button>
      </div>
    </aside>
  );
}
