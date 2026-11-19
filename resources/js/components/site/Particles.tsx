import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/lib/site/i18n';
import { initHeroRing } from '@/lib/site/motion';

// Hero mark: Three.js 3D dot ring (loaded on demand); falls back to the 2D canvas ring
// when WebGL is unavailable or the visitor prefers reduced motion.
export default function Particles({ className }: any) {
    const ref = useRef(null);
    const { ar } = useLang();

    useEffect(() => {
        const cv = ref.current;
        let cleanup = () => {},
            cancelled = false;
        import('three')
            .then((THREE) => {
                if (cancelled) return;
                const stop = initHeroRing(THREE, cv, {
                    gsap,
                    ScrollTrigger,
                    rtl: ar,
                    ready: window.BRD_READY || Promise.resolve(),
                });
                cleanup = stop || draw2D(cv, ar);
            })
            .catch(() => {
                if (!cancelled) cleanup = draw2D(cv, ar);
            });
        return () => {
            cancelled = true;
            cleanup();
        };
    }, [ar]);

    return <canvas ref={ref} aria-hidden="true" className={className} />;
}

function draw2D(cv: any, ar: any) {
    const ctx = cv.getContext('2d');
    if (!ctx) return () => {};
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cols = ['#f99d1b', '#fdca0f', '#f7a823', '#ffb81c'],
        dir = ar ? -1 : 1;
    let W = 0,
        R = 0,
        dots: any[] = [],
        t = 0,
        raf = 0;

    function setup() {
        const dpr = Math.min(devicePixelRatio || 1, 2),
            s = cv.clientWidth;
        cv.width = cv.height = s * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        W = s;
        R = s * 0.33;
        dots = [];
        for (let i = 0; i < 340; i++) {
            const a = Math.random() * Math.PI * 2,
                band = R + (Math.random() - 0.5) * W * 0.13,
                j = (Math.random() - 0.5) * W * 0.35;
            dots.push({
                a,
                r: band,
                s: 1.5 + Math.random() * Math.random() * 9,
                c: cols[i % 4],
                x: W / 2 + Math.cos(a) * (band + j),
                y: W / 2 + Math.sin(a) * (band + j),
                ph: Math.random() * 6,
            });
        }
        for (let i = 0; i < 9; i++)
            dots.push({
                trail: i,
                s: 3 + i * 0.9,
                c: cols[i % 2],
                x: W / 2,
                y: W / 2,
                ph: i,
            });
    }
    function frame() {
        ctx.clearRect(0, 0, W, W);
        t += 0.006;
        for (const d of dots) {
            let tx, ty;
            if (d.trail !== undefined) {
                tx = W / 2 + dir * (R * 0.55 + d.trail * W * 0.028);
                ty =
                    W / 2 -
                    R -
                    d.trail * W * 0.035 +
                    Math.sin(t * 3 + d.ph) * 3;
            } else {
                const a = d.a + t * 0.25 * dir,
                    rr = d.r + Math.sin(t * 2 + d.ph) * 4;
                tx = W / 2 + Math.cos(a) * rr;
                ty = W / 2 + Math.sin(a) * rr;
            }
            if (reduce) {
                d.x = tx;
                d.y = ty;
            } else {
                d.x += (tx - d.x) * 0.045;
                d.y += (ty - d.y) * 0.045;
            }
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.s, 0, 7);
            ctx.fillStyle = d.c;
            ctx.fill();
        }
        if (!reduce) raf = requestAnimationFrame(frame);
    }
    const onResize = () => {
        cancelAnimationFrame(raf);
        setup();
        frame();
    };
    setup();
    frame();
    addEventListener('resize', onResize);
    return () => {
        cancelAnimationFrame(raf);
        removeEventListener('resize', onResize);
    };
}
