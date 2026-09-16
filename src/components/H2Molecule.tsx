'use client';

import { useEffect, useRef, useState } from 'react';

const keywords = [
  'Hidrojen',
  'Enerji',
  'Teknoloji',
  'İnovasyon',
  'Strateji',
  'Ekosistem',
  'Sürdürülebilirlik',
  'Uygulama',
  'Dönüşüm',
  'Gelecek',
];

export default function H2Molecule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentKeyword, setCurrentKeyword] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword((prev) => (prev + 1) % keywords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const canvas = document.createElement('canvas');
    containerRef.current.appendChild(canvas);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      const THREE = (window as any).THREE;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.z = 11;

      const root = new THREE.Group();
      const mol = new THREE.Group();
      mol.rotation.z = -0.27;
      root.add(mol);
      scene.add(root);

      // H₂ bonding orbital
      const R = 1.5, A = 0.85;
      const NA = new THREE.Vector3(-R / 2, 0, 0), NB = new THREE.Vector3(R / 2, 0, 0);
      const N = 16000;

      function buildCloud(n: number) {
        const pos = new Float32Array(n * 3);
        const max = Math.pow((1 + Math.exp(-R / A)), 2 * 0.65);
        let i = 0;
        while (i < n) {
          const x = (Math.random() * 2 - 1) * 4.7;
          const y = (Math.random() * 2 - 1) * 3.7;
          const z = (Math.random() * 2 - 1) * 3.7;
          const r1 = Math.hypot(x - NA.x, y, z);
          const r2 = Math.hypot(x - NB.x, y, z);
          const psi = Math.exp(-r1 / A) + Math.exp(-r2 / A);
          if (Math.random() * max < Math.pow(psi * psi, 0.65)) {
            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
            i++;
          }
        }
        return pos;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(buildCloud(N), 3));
      const seeds = new Float32Array(N);
      const szs = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        seeds[i] = Math.random();
        szs[i] = 0.5 + Math.pow(Math.random(), 4) * 2.9;
      }
      geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
      geo.setAttribute('aSize', new THREE.BufferAttribute(szs, 1));

      const uT = {
        uTime: { value: 0 },
        uPR: { value: renderer.getPixelRatio() },
        uMouse: { value: new THREE.Vector3(99, 99, 0) },
        uOpa: { value: 0 },
      };

      mol.add(
        new THREE.Points(
          geo,
          new THREE.ShaderMaterial({
            uniforms: uT,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexShader: `
              uniform float uTime,uPR;uniform vec3 uMouse;
              attribute float aSeed,aSize;varying float vR,vA;
              void main(){
                vec3 p=position;
                float ang=uTime*(0.13+0.31*aSeed)*(aSeed>.5?1.:-1.);
                float c=cos(ang),s=sin(ang);p.yz=mat2(c,-s,s,c)*p.yz;
                p.yz*=1.+.065*sin(uTime*.86-length(p.yz)*1.65);
                p.x*=1.+.033*sin(uTime*.86);
                p+=.04*vec3(sin(uTime*1.2+aSeed*61.),cos(uTime*1.1+aSeed*37.),sin(uTime*.9+aSeed*83.));
                vec4 mv=modelViewMatrix*vec4(p,1.);
                vec2 dd=mv.xy-uMouse.xy;float f=exp(-dot(dd,dd)*1.6);
                mv.xy+=normalize(dd+1e-4)*f*.42;
                gl_Position=projectionMatrix*mv;
                gl_PointSize=aSize*uPR*(15.5/-mv.z)*(1.+f*1.15);
                vR=length(position-vec3(clamp(position.x,-.75,.75),0.,0.));
                vA=.5+.5*sin(uTime*1.9+aSeed*40.);
              }
            `,
            fragmentShader: `
              uniform float uOpa;varying float vR,vA;
              void main(){
                float d=length(gl_PointCoord-.5);float a=smoothstep(.5,0.,d);
                vec3 col=mix(vec3(.70,.95,1.),vec3(.10,.70,1.),smoothstep(0.,.9,vR));
                col=mix(col,vec3(.08,.27,.90),smoothstep(.9,2.9,vR));
                float fade=1.-smoothstep(1.4,3.5,vR);
                gl_FragColor=vec4(col,a*vA*(.14+.55*fade)*uOpa);
              }
            `,
          })
        )
      );

      // Nucleus glows
      function radialTex(stops: Array<[number, string]>) {
        const cv = document.createElement('canvas');
        cv.width = cv.height = 256;
        const g = cv.getContext('2d')!;
        const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
        stops.forEach(([o, c]) => gr.addColorStop(o, c));
        g.fillStyle = gr;
        g.fillRect(0, 0, 256, 256);
        return new THREE.CanvasTexture(cv);
      }

      const nucTex = radialTex([
        [0, 'rgba(255,255,255,1)'],
        [0.1, 'rgba(195,238,255,1)'],
        [0.28, 'rgba(45,175,255,.5)'],
        [0.56, 'rgba(12,75,215,.08)'],
        [1, 'rgba(0,0,0,0)'],
      ]);

      const nuclei = [NA, NB].map((p) => {
        const s = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: nucTex,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
            opacity: 0,
          })
        );
        s.position.copy(p);
        s.scale.setScalar(1.75);
        mol.add(s);
        return s;
      });

      // Electrons + trail
      const TRAIL = 82;
      const eTex = radialTex([
        [0, 'rgba(255,255,255,1)'],
        [0.2, 'rgba(140,220,255,.88)'],
        [0.55, 'rgba(25,135,255,.15)'],
        [1, 'rgba(0,0,0,0)'],
      ]);

      const tmp = new THREE.Vector3();
      const electrons = [0, 1].map((k) => {
        const head = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: eTex,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true,
          })
        );
        head.scale.setScalar(0.28);
        mol.add(head);

        const tg = new THREE.BufferGeometry();
        tg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(TRAIL * 3), 3));
        const al = new Float32Array(TRAIL);
        for (let i = 0; i < TRAIL; i++) al[i] = 1 - i / TRAIL;
        tg.setAttribute('aA', new THREE.BufferAttribute(al, 1));

        const line = new THREE.Line(
          tg,
          new THREE.ShaderMaterial({
            uniforms: uT,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexShader: `attribute float aA;varying float vA;void main(){vA=aA;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
            fragmentShader: `uniform float uOpa;varying float vA;void main(){gl_FragColor=vec4(.38,.82,1.,vA*vA*.65*uOpa);}`,
          })
        );
        line.frustumCulled = false;
        mol.add(line);

        return { head, line, phase: k * Math.PI, tilt: k ? 0.82 : -0.82, hist: [] as any[] };
      });

      function ePos(e: any, t: number, out: any) {
        const a = t * 1.28 + e.phase;
        const x = Math.sin(a) * 1.58;
        const y = Math.sin(2 * a) * 0.76;
        const z = Math.cos(a) * 0.5;
        const c = Math.cos(e.tilt + t * 0.13);
        const s = Math.sin(e.tilt + t * 0.13);
        return out.set(x, y * c - z * s, y * s + z * c);
      }

      // Dust
      const dp = new Float32Array(500 * 3);
      for (let i = 0; i < 500; i++) {
        const r = 4.2 + Math.random() * 3;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(Math.random() * 2 - 1);
        dp[i * 3] = r * Math.sin(ph) * Math.cos(th);
        dp[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
        dp[i * 3 + 2] = r * Math.cos(ph);
      }
      const dg = new THREE.BufferGeometry();
      dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
      const dust = new THREE.Points(
        dg,
        new THREE.PointsMaterial({
          size: 0.02,
          color: 0x3a7aff,
          transparent: true,
          opacity: 0.28,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      root.add(dust);

      // Mouse
      const m = { x: 0, y: 0, tx: 0, ty: 0 };
      const handlePointerMove = (ev: PointerEvent) => {
        m.tx = (ev.clientX / innerWidth) * 2 - 1;
        m.ty = (ev.clientY / innerHeight) * 2 - 1;
        const v = new THREE.Vector3(m.tx, -m.ty, 0.5)
          .unproject(camera)
          .sub(camera.position)
          .normalize();
        const d = camera.position.z / -v.z;
        uT.uMouse.value.set(v.x * d, v.y * d, 0);
      };

      const handlePointerLeave = () => {
        uT.uMouse.value.set(99, 99, 0);
        m.tx = m.ty = 0;
      };

      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerleave', handlePointerLeave);

      // Resize
      const resize = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', resize);
      resize();

      // Loop
      const clock = new THREE.Clock();
      let t = 0;

      const loop = () => {
        requestAnimationFrame(loop);
        const dt = Math.min(clock.getDelta(), 0.05);
        t += dt;
        uT.uTime.value = t;
        uT.uOpa.value = Math.min(1, uT.uOpa.value + dt * 0.55);
        m.x += (m.tx - m.x) * 0.045;
        m.y += (m.ty - m.y) * 0.045;
        root.rotation.y = m.x * 0.44 + Math.sin(t * 0.17) * 0.12;
        root.rotation.x = m.y * 0.27;
        dust.rotation.y = t * 0.018;
        const pulse = 1.5 + Math.sin(t * 2.15) * 0.12;
        nuclei.forEach((n, i) => {
          n.scale.setScalar(pulse + (i ? 0.04 : 0));
          n.material.opacity = uT.uOpa.value;
        });
        electrons.forEach((e) => {
          ePos(e, t, tmp);
          e.head.position.copy(tmp);
          e.hist.unshift(tmp.clone());
          if (e.hist.length > TRAIL) e.hist.pop();
          const arr = (e.line.geometry.attributes.position.array as Float32Array);
          for (let i = 0; i < TRAIL; i++) {
            const p = e.hist[Math.min(i, e.hist.length - 1)];
            arr[i * 3] = p.x;
            arr[i * 3 + 1] = p.y;
            arr[i * 3 + 2] = p.z;
          }
          (e.line.geometry.attributes.position as any).needsUpdate = true;
          e.head.material.opacity = uT.uOpa.value;
        });
        renderer.render(scene, camera);
      };

      loop();

      // Cleanup
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerleave', handlePointerLeave);
        window.removeEventListener('resize', resize);
      };
    };

    document.head.appendChild(script);

    return () => {
      script.remove();
      if (containerRef.current?.contains(canvas)) {
        containerRef.current.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] sm:min-h-[500px]"
      style={{ background: 'transparent' }}
    >
      {/* Keywords overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          {keywords.map((keyword, idx) => (
            <div
              key={keyword}
              className="absolute text-center transition-all duration-1000"
              style={{
                opacity: idx === currentKeyword ? 1 : 0,
                transform: idx === currentKeyword ? 'scale(1)' : 'scale(0.8)',
                fontSize: 'clamp(20px, 5vw, 52px)',
                fontWeight: '700',
                letterSpacing: '0.05em',
                background: 'linear-gradient(135deg, #00c8ff, #79e8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {keyword}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
