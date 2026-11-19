import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import MainLayout from '@/layouts/MainLayout';
import SettingsLayout from '@/layouts/settings/layout';
import { initPreloader } from '@/lib/site/preloader';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Opens the public site's preloader (a no-op on pages that don't render one).
initPreloader();

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            case name === 'dashboard':
                return AppLayout;
            default:
                // Every other page is part of the public Brandology site.
                return MainLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#f99d1b',
    },
});

// This will set light / dark mode on load...
initializeTheme();
