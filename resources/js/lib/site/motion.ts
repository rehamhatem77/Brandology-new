// Brandology motion engine (GSAP + ScrollTrigger + Three.js).
// Works on plain DOM through data attributes, so the HTML site and the React site share it:
//   data-hero-title   hero heading: words rise in after the preloader
//   data-hero-item    hero parts: fade up in sequence after the title
//   data-reveal       fade up when scrolled into view (batched, staggered)
//   data-split        heading words rise when scrolled into view
//   data-count        number counts up when scrolled into view
//   data-parallax     image frame: clip reveal + scroll parallax
//   data-line         timeline: orange line draws with scroll
//   data-tilt         card: 3D tilt + glow following the pointer
//   data-magnetic     button: pulled toward the pointer
// Everything is skipped when the visitor prefers reduced motion.

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () =>
    matchMedia('(hover: hover) and (pointer: fine)').matches;

export function splitWords(el: any) {
    if (!el.dataset.splitDone) {
        el.dataset.splitDone = '1';
        const walk = (node: any) => {
            [...node.childNodes].forEach((n) => {
                if (n.nodeType === 3 && n.textContent.trim()) {
                    const frag = document.createDocumentFragment();
                    n.textContent.split(/(\s+)/).forEach((part: any) => {
                        if (!part) return;
                        if (/^\s+$/.test(part))
                            return frag.append(document.createTextNode(part));
                        const outer = document.createElement('span'),
                            inner = document.createElement('span');
                        outer.className = 'sw';
                        inner.className = 'sw-i';
                        inner.textContent = part;
                        outer.append(inner);
                        frag.append(outer);
                    });
                    n.replaceWith(frag);
                } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
            });
        };
        walk(el);
    }
    return el.querySelectorAll('.sw-i');
}

function countUp(gsap: any, el: any) {
    const text = el.textContent.trim(),
        m = text.match(/\d+/);
    if (!m) return;
    const end = +m[0],
        pre = text.slice(0, m.index),
        post = text.slice(m.index + m[0].length);
    const obj = { v: end > 1900 ? end - 30 : 0 };
    el.textContent = pre + obj.v + post;
    gsap.to(obj, {
        v: end,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate: () => {
            el.textContent = pre + Math.round(obj.v) + post;
        },
    });
}

/* Page animations. Returns a cleanup function (for route changes in the React app). */
export function initMotion({
    gsap,
    ScrollTrigger,
    root = document,
    ready = Promise.resolve(),
}: {
    gsap: any;
    ScrollTrigger: any;
    root?: Document | HTMLElement | null;
    ready?: Promise<unknown>;
}) {
    if (!root) return () => {};
    if (reduced()) return () => {};
    gsap.registerPlugin(ScrollTrigger);
    const off: Array<() => void> = [];
    const on = (el: any, type: any, fn: any) => {
        el.addEventListener(type, fn);
        off.push(() => el.removeEventListener(type, fn));
    };
    const $ = (sel: any) => [...root.querySelectorAll(sel)];

    const ctx = gsap.context(
        () => {
            // Hero intro: hidden now, played once the preloader is gone
            const titles = $('[data-hero-title]'),
                items = $('[data-hero-item]');
            const words = titles.flatMap((t) => [...splitWords(t)]);
            gsap.set(words, { yPercent: 115 });
            gsap.set(items, { autoAlpha: 0, y: 28 });
            void ready.then(() =>
                ctx.add(() => {
                    gsap.timeline({ defaults: { ease: 'power4.out' } })
                        .to(words, {
                            yPercent: 0,
                            duration: 1.1,
                            stagger: 0.055,
                        })
                        .to(
                            items,
                            {
                                autoAlpha: 1,
                                y: 0,
                                duration: 0.9,
                                stagger: 0.12,
                            },
                            '-=0.75',
                        );
                }),
            );

            // Fade-up reveals, batched so cards in a row stagger together
            const reveals = $('[data-reveal]').filter(
                (el) => !el.closest('[data-hero-item]'),
            );
            gsap.set(reveals, { autoAlpha: 0, y: 44 });
            ScrollTrigger.batch(reveals, {
                start: 'top 90%',
                once: true,
                onEnter: (batch: any) =>
                    gsap.to(batch, {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.95,
                        ease: 'power3.out',
                        stagger: 0.12,
                        overwrite: true,
                    }),
            });

            // Headings: words rise
            $('[data-split]').forEach((h) => {
                if (h.matches('[data-hero-title]')) return;
                gsap.from(splitWords(h), {
                    yPercent: 115,
                    duration: 1,
                    ease: 'power4.out',
                    stagger: 0.045,
                    scrollTrigger: { trigger: h, start: 'top 90%', once: true },
                });
            });

            // Numbers
            $('[data-count]').forEach((el) => countUp(gsap, el));

            // Image frames: clip reveal + parallax
            $('[data-parallax]').forEach((box) => {
                const img =
                    box.tagName === 'IMG' ? box : box.querySelector('img');
                gsap.fromTo(
                    box,
                    { clipPath: 'inset(10% 10% 10% 10%)' },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        duration: 1.3,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: box,
                            start: 'top 88%',
                            once: true,
                        },
                    },
                );
                if (img && img !== box)
                    gsap.fromTo(
                        img,
                        { scale: 1.18, yPercent: -5 },
                        {
                            scale: 1.06,
                            yPercent: 5,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: box,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: true,
                            },
                        },
                    );
            });

            // Caution stripes slide with scroll
            $('.stripe').forEach((s) =>
                gsap.fromTo(
                    s,
                    { backgroundPosition: '0px 0px' },
                    {
                        backgroundPosition: '360px 0px',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: s,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                    },
                ),
            );

            // Timeline line draws
            $('[data-line]').forEach((el) => {
                const line = document.createElement('span');
                line.className = 'motion-line';
                el.style.position = 'relative';
                el.prepend(line);
                off.push(() => line.remove());
                gsap.fromTo(
                    line,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 75%',
                            end: 'bottom 55%',
                            scrub: true,
                        },
                    },
                );
            });

            // Hover: 3D tilt cards + glow
            if (finePointer()) {
                $('[data-tilt]').forEach((card) => {
                    gsap.set(card, { transformPerspective: 900 });
                    const rx = gsap.quickTo(card, 'rotationX', {
                        duration: 0.5,
                        ease: 'power3',
                    });
                    const ry = gsap.quickTo(card, 'rotationY', {
                        duration: 0.5,
                        ease: 'power3',
                    });
                    on(card, 'pointermove', (e: any) => {
                        const r = card.getBoundingClientRect(),
                            x = (e.clientX - r.left) / r.width,
                            y = (e.clientY - r.top) / r.height;
                        rx((0.5 - y) * 9);
                        ry((x - 0.5) * 11);
                        card.style.setProperty('--mx', `${x * 100}%`);
                        card.style.setProperty('--my', `${y * 100}%`);
                    });
                    on(card, 'pointerenter', () =>
                        gsap.to(card, {
                            y: -6,
                            duration: 0.4,
                            ease: 'power3.out',
                        }),
                    );
                    on(card, 'pointerleave', () => {
                        rx(0);
                        ry(0);
                        gsap.to(card, {
                            y: 0,
                            duration: 0.6,
                            ease: 'power3.out',
                        });
                    });
                });

                // Magnetic buttons
                $('[data-magnetic]').forEach((btn) => {
                    const mx = gsap.quickTo(btn, 'x', {
                            duration: 0.4,
                            ease: 'power3',
                        }),
                        my = gsap.quickTo(btn, 'y', {
                            duration: 0.4,
                            ease: 'power3',
                        });
                    on(btn, 'pointermove', (e: any) => {
                        const r = btn.getBoundingClientRect();
                        mx((e.clientX - r.left - r.width / 2) * 0.28);
                        my((e.clientY - r.top - r.height / 2) * 0.35);
                    });
                    on(btn, 'pointerleave', () =>
                        gsap.to(btn, {
                            x: 0,
                            y: 0,
                            duration: 0.8,
                            ease: 'elastic.out(1, 0.4)',
                        }),
                    );
                });
            }
        },
        root === document ? undefined : root,
    );

    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState !== 'complete')
        addEventListener('load', refresh, { once: true });
    off.push(() => removeEventListener('load', refresh));

    return () => {
        off.forEach((fn) => fn());
        ctx.revert();
    };
}

/* Site-wide extras, created once: scroll progress bar + cursor follower. */
export function initGlobal({ gsap, ScrollTrigger }: any) {
    if (reduced() || document.querySelector('.motion-progress')) return;
    gsap.registerPlugin(ScrollTrigger);

    const bar = document.createElement('div');
    bar.className = 'motion-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.append(bar);
    gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
            start: 0,
            end: 'max',
            scrub: 0.3,
            invalidateOnRefresh: true,
        },
    });

    if (!finePointer()) return;
    const dot = document.createElement('div'),
        ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    dot.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');
    document.body.append(ring, dot);
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const dx = gsap.quickTo(dot, 'x', { duration: 0.08 }),
        dy = gsap.quickTo(dot, 'y', { duration: 0.08 });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' }),
        ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        gsap.to([dot, ring], {
            autoAlpha: 1,
            duration: 0.2,
            overwrite: 'auto',
        });
        dx(e.clientX);
        dy(e.clientY);
        rx(e.clientX);
        ry(e.clientY);
    });
    document.addEventListener('pointerover', (e) => {
        const hot = (e.target as Element).closest(
            'a, button, [data-tilt], select, label, summary',
        );
        gsap.to(ring, {
            scale: hot ? 1.9 : 1,
            backgroundColor: hot
                ? 'rgba(249,157,27,.12)'
                : 'rgba(249,157,27,0)',
            duration: 0.3,
        });
    });
    document.addEventListener('pointerleave', () =>
        gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 }),
    );
}

/* Three.js hero: the logo's dotted "O" as a 3D particle ring.
   Returns a cleanup function, or null when WebGL isn't available (callers fall back to 2D). */
export function initHeroRing(
    THREE: any,
    canvas: any,
    { gsap, rtl = false, ready = Promise.resolve() }: any,
) {
    if (reduced()) return null;
    let renderer: any;
    try {
        renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
        });
    } catch {
        return null;
    }
    if (!renderer.getContext()) return null;
    canvas.dataset.three = '1';

    const scene = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 7;
    const N = 1700,
        TRAIL = 14,
        total = N + TRAIL,
        dir = rtl ? -1 : 1;
    const pos = new Float32Array(total * 3),
        col = new Float32Array(total * 3),
        size = new Float32Array(total),
        rnd = new Float32Array(total * 3),
        ring = new Float32Array(total);
    const c1 = new THREE.Color('#f99d1b'),
        c2 = new THREE.Color('#fdca0f'),
        c3 = new THREE.Color('#ffb81c');
    for (let i = 0; i < N; i++) {
        const a = Math.random() * Math.PI * 2,
            r = 1.75 + (Math.random() - 0.5) * 0.6;
        pos.set(
            [Math.cos(a) * r, Math.sin(a) * r, (Math.random() - 0.5) * 0.4],
            i * 3,
        );
        const c = [c1, c2, c3][i % 3];
        col.set([c.r, c.g, c.b], i * 3);
        size[i] =
            Math.random() < 0.1
                ? 7 + Math.random() * 8
                : 1.6 + Math.random() * 3.6;
        rnd.set(
            [
                (Math.random() - 0.5) * 9,
                (Math.random() - 0.5) * 9,
                (Math.random() - 0.5) * 7,
            ],
            i * 3,
        );
        ring[i] = 1;
    }
    for (let j = 0; j < TRAIL; j++) {
        const i = N + j;
        pos.set([dir * (1.05 + j * 0.12), 1.95 + j * 0.15, 0], i * 3);
        const c = j % 2 ? c2 : c1;
        col.set([c.r, c.g, c.b], i * 3);
        size[i] = 5 + j * 0.9;
        rnd.set(
            [
                (Math.random() - 0.5) * 6,
                Math.random() * 5,
                (Math.random() - 0.5) * 3,
            ],
            i * 3,
        );
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 3));
    geo.setAttribute('aRing', new THREE.BufferAttribute(ring, 1));

    const uniforms = {
        uTime: { value: 0 },
        uScatter: { value: 1 },
        uPixel: { value: Math.min(devicePixelRatio || 1, 2) },
        uDir: { value: dir },
    };
    const mat = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        vertexShader: `
      attribute vec3 aColor; attribute float aSize; attribute vec3 aRand; attribute float aRing;
      uniform float uTime, uScatter, uPixel, uDir;
      varying vec3 vColor; varying float vAlpha;
      void main(){
        vec3 p = position;
        if (aRing > .5) {
          float a = uTime * .16 * uDir; float c = cos(a), s = sin(a);
          p.xy = mat2(c, s, -s, c) * p.xy;
          p.z += sin(uTime * 1.4 + aRand.x * 3.) * .06;
        } else {
          p.y += sin(uTime * 2. + aRand.x) * .05;
        }
        p += aRand * uScatter;
        vec4 mv = modelViewMatrix * vec4(p, 1.);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * uPixel * (7. / -mv.z);
        vColor = aColor; vAlpha = 1. - uScatter * .7;
      }`,
        fragmentShader: `
      varying vec3 vColor; varying float vAlpha;
      void main(){
        float d = length(gl_PointCoord - .5);
        if (d > .5) discard;
        gl_FragColor = vec4(vColor, vAlpha * smoothstep(.5, .38, d));
      }`,
    });
    const group = new THREE.Group();
    group.add(new THREE.Points(geo, mat));
    scene.add(group);

    const resize = () => {
        const s = canvas.clientWidth || 400;
        renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
        renderer.setSize(s, s, false);
    };
    resize();

    let tx = 0,
        ty = 0,
        raf = 0,
        visible = true;
    const onMove = (e: any) => {
        tx = (e.clientY / innerHeight - 0.5) * 0.5;
        ty = (e.clientX / innerWidth - 0.5) * 0.7;
    };
    addEventListener('pointermove', onMove);
    addEventListener('resize', resize);
    const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) loop();
    });
    io.observe(canvas);

    const clock = new THREE.Clock();
    function loop() {
        if (!visible) {
            raf = 0;
            return;
        }
        uniforms.uTime.value = clock.getElapsedTime();
        group.rotation.x += (tx - group.rotation.x) * 0.05;
        group.rotation.y += (ty - group.rotation.y) * 0.05;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
    }
    loop();

    // Assemble after the preloader, then scatter as the hero scrolls away
    let scrollTween: any;
    ready.then(() => {
        gsap.to(uniforms.uScatter, {
            value: 0,
            duration: 2.4,
            ease: 'power3.out',
            onComplete: () => {
                scrollTween = gsap.to(uniforms.uScatter, {
                    value: 0.9,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: canvas,
                        start: 'center 40%',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
            },
        });
    });

    return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        removeEventListener('pointermove', onMove);
        removeEventListener('resize', resize);
        scrollTween?.scrollTrigger?.kill();
        scrollTween?.kill();
        gsap.killTweensOf(uniforms.uScatter);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        delete canvas.dataset.three;
    };
}
