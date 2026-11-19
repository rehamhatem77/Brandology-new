/**
 * Hides the preloader once the page and fonts are ready (shown for at least 700 ms so it does not flash).
 * window.BRD_READY resolves at that moment, so intro animations start after the preloader.
 */
export function initPreloader(): void {
    if (typeof window === 'undefined' || window.BRD_READY) return;
    window.BRD_READY = new Promise<void>((done) => {
        const preloader = document.getElementById('preloader');
        if (!preloader) return done();
        const started = performance.now();
        const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
        void Promise.race([
            fonts,
            new Promise((r) => setTimeout(r, 3000)),
        ]).then(() => {
            setTimeout(
                () => {
                    preloader.classList.add('done');
                    preloader.addEventListener(
                        'transitionend',
                        () => preloader.remove(),
                        { once: true },
                    );
                    done();
                },
                Math.max(0, 700 - (performance.now() - started)),
            );
        });
    });
}
