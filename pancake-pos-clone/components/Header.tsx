import Link from 'next/link';
import { Button } from './ui/Button';
import { ChevronDown } from 'lucide-react';

export default function Header() {
  const navLinks = [
    { name: 'Sản phẩm', href: '#' },
    { name: 'Giải pháp', href: '#' },
    { name: 'Khách hàng', href: '#' },
    { name: 'Tài liệu', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
           <span className="text-2xl font-bold text-primary">Pancake POS</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* <button className="hidden sm:flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-primary">
            <span className="text-xl">🇻🇳</span>
            <ChevronDown className="h-4 w-4" />
          </button> */}
          
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="font-semibold text-text-secondary hover:text-primary">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="rounded-full px-5 bg-primary hover:bg-blue-700 font-bold shadow-md hover:shadow-lg transition-all">
                  Dùng thử miễn phí
                </Button>
              </Link>
            </div>
          
          {/* Mobile Menu Button (Placeholder) */}
          <button className="md:hidden p-2 text-text-secondary">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
