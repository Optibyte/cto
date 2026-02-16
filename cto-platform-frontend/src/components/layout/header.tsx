'use client';

import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/30 bg-card/80 backdrop-blur-md supports-[backdrop-filter]:bg-card/60 px-6 transition-all shadow-sm shadow-black/5 dark:shadow-black/10">
            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search teams, metrics, SLAs..."
                        className="pl-10 rounded-xl border-border/50 transition-all focus:shadow-lg focus:shadow-primary/10 focus:border-primary/50"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-colors rounded-xl">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors rounded-xl">
                    <User className="h-5 w-5" />
                </Button>
            </div>
        </header>
    );
}
