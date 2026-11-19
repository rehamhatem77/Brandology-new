/** Main navigation. Labels come from the site copy (t.nav[key]) so they follow the language. */
export type NavKey =
    | 'home'
    | 'about'
    | 'services'
    | 'projects'
    | 'signs'
    | 'clients'
    | 'blog'
    | 'contact';
export type NavItem = { path: string; key: NavKey };

export const NAV: NavItem[] = [
    { path: '/', key: 'home' },
    { path: '/about', key: 'about' },
    { path: '/services', key: 'services' },
    { path: '/projects', key: 'projects' },
    { path: '/safety-signs', key: 'signs' },
    { path: '/clients', key: 'clients' },
    { path: '/blog', key: 'blog' },
    { path: '/contact', key: 'contact' },
];
