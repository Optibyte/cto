'use client';

import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import { useRole } from '@/contexts/role-context';
import { UserRole } from '@/lib/types';
import { ProjectFilter } from '@/components/filters/project-filter';
import { TeamFilter } from '@/components/filters/team-filter';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const ROLES: { value: UserRole; label: string; color: string }[] = [
    { value: 'CTO', label: 'CTO', color: 'bg-purple-500' },
    { value: 'Manager', label: 'Manager', color: 'bg-blue-500' },
    { value: 'TeamLead', label: 'Team Lead', color: 'bg-emerald-500' },
    { value: 'Employee', label: 'Employee', color: 'bg-amber-500' },
];

export function Header() {
    const { role, setRole } = useRole();
    const currentRole = ROLES.find((r) => r.value === role) || ROLES[0];

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
                {/* Dashboard Filters - Only for CTO and Manager */}
                {(role === 'CTO' || role === 'Manager') && (
                    <>
                        <ProjectFilter />
                        <TeamFilter />
                        <div className="h-6 w-px bg-border/40 mx-1" />
                    </>
                )}

                {/* Role Switcher */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 rounded-xl border-border/50 hover:bg-primary/10 transition-all px-3"
                        >
                            <span className={`h-2 w-2 rounded-full ${currentRole.color}`} />
                            <span className="text-sm font-medium">{currentRole.label}</span>
                            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl">
                        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
                            Switch Role
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {ROLES.map((r) => (
                            <DropdownMenuItem
                                key={r.value}
                                onClick={() => setRole(r.value)}
                                className={`flex items-center gap-2 rounded-lg cursor-pointer ${role === r.value ? 'bg-primary/10 text-primary font-medium' : ''
                                    }`}
                            >
                                <span className={`h-2 w-2 rounded-full ${r.color}`} />
                                <span>{r.label}</span>
                                {role === r.value && (
                                    <span className="ml-auto text-xs text-primary">Active</span>
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

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

