// Globals the public site's motion code shares between layout, transition and pages.
declare global {
    interface Window {
        BRD_READY?: Promise<void>;
        __brdHold?: Promise<void> | null;
        __brdRelease?: () => void;
        __lenis?: import('lenis').default | null;
    }
}

export {};
