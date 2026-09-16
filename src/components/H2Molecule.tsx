'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const keywords = [
  'Hidrojen',
  'Milli Teknoloji',
  'Enerji Bağımsızlığı',
  'Yerli Üretim',
  'Savunma Sanayi',
  'Türkiye Yüzyılı',
  'Stratejik Güç',
  'Temiz Enerji',
  'İnovasyon',
  'Ar-Ge',
  'Sürdürülebilirlik',
  'Gelecek',
];

const TRAIL = 82;
const CLOUD = 16000;

// Glows are drawn as camera-facing quads shaded in the fragment stage rather
// than as textured Sprites: mobile GPUs smeared the canvas-backed texture into
// vertical streaks at the poles.
const glowVert = `
  uniform float uSize;varying vec2 vUv;
  void main(){
    vUv=uv;
    vec4 mv=modelViewMatrix*vec4(0.,0.,0.,1.);
    mv.xy+=position.xy*uSize;
    gl_Position=projectionMatrix*mv;
  }`;

function glowMesh(quad: THREE.PlaneGeometry, falloff: number, coreCut: number, tint: string) {
  const material = new THREE.ShaderMaterial({
    uniforms: { uSize: { value: 1 }, uOpa: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: glowVert,
    fragmentShader: `
      uniform float uOpa;varying vec2 vUv;
      void main(){
        float d=length(vUv-.5)*2.;
        float core=smoothstep(${coreCut.toFixed(2)},0.,d);
        vec3 col=mix(${tint},vec3(.78,.94,1.),core);
        col=mix(col,vec3(1.),smoothstep(${(coreCut * 0.4).toFixed(2)},0.,d));
        float a=pow(smoothstep(1.,0.,d),${falloff.toFixed(2)});
        gl_FragColor=vec4(col,a*uOpa);
      }`,
  });
  return new THREE.Mesh(quad, material);
}

function buildCloud(n: number, R: number, A: number) {
  const pos = new Float32Array(n * 3);
  const max = Math.pow(1 + Math.exp(-R / A), 2 * 0.65);
  let i = 0;
  while (i < n) {
    const x = (Math.random() * 2 - 1) * 4.7;
    const y = (Math.random() * 2 - 1) * 3.7;
    const z = (Math.random() * 2 - 1) * 3.7;
    const psi = Math.exp(-Math.hypot(x + R / 2, y, z) / A) + Math.exp(-Math.hypot(x - R / 2, y, z) / A);
    if (Math.random() * max < Math.pow(psi * psi, 0.65)) {
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      i++;
    }
  }
  return pos;
}

export default function H2Molecule() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setKeyword((k) => (k + 1) % keywords.length), 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    host.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.z = 7.2;

    const root = new THREE.Group();
    const mol = new THREE.Group();
    mol.rotation.z = -0.27;
    root.add(mol);
    scene.add(root);

    const R = 1.5;
    const A = 0.85;

    const uniforms = {
      uTime: { value: 0 },
      uPR: { value: renderer.getPixelRatio() },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uOpa: { value: 0 },
    };

    const cloudGeo = new THREE.BufferGeometry();
    cloudGeo.setAttribute('position', new THREE.BufferAttribute(buildCloud(CLOUD, R, A), 3));
    const seeds = new Float32Array(CLOUD);
    const sizes = new Float32Array(CLOUD);
    for (let i = 0; i < CLOUD; i++) {
      seeds[i] = Math.random();
      sizes[i] = 0.5 + Math.pow(Math.random(), 4) * 2.9;
    }
    cloudGeo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    cloudGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const cloudMat = new THREE.ShaderMaterial({
      uniforms,
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
        }`,
      fragmentShader: `
        uniform float uOpa;varying float vR,vA;
        void main(){
          float d=length(gl_PointCoord-.5);float a=smoothstep(.5,0.,d);
          vec3 col=mix(vec3(.70,.95,1.),vec3(.10,.70,1.),smoothstep(0.,.9,vR));
          col=mix(col,vec3(.08,.27,.90),smoothstep(.9,2.9,vR));
          float fade=1.-smoothstep(1.4,3.5,vR);
          gl_FragColor=vec4(col,a*vA*(.14+.55*fade)*uOpa);
        }`,
    });
    mol.add(new THREE.Points(cloudGeo, cloudMat));

    const quad = new THREE.PlaneGeometry(1, 1);
    const nuclei = [new THREE.Vector3(-R / 2, 0, 0), new THREE.Vector3(R / 2, 0, 0)].map((p) => {
      const mesh = glowMesh(quad, 2.2, 0.3, 'vec3(.05,.29,.84)');
      mesh.position.copy(p);
      mol.add(mesh);
      return mesh;
    });
    const electrons = [0, 1].map((k) => {
      const head = glowMesh(quad, 3, 0.5, 'vec3(.10,.53,1.)');
      head.material.uniforms.uSize.value = 0.34;
      mol.add(head);

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(TRAIL * 3), 3));
      const alpha = new Float32Array(TRAIL);
      for (let i = 0; i < TRAIL; i++) alpha[i] = 1 - i / TRAIL;
      geo.setAttribute('aA', new THREE.BufferAttribute(alpha, 1));

      const line = new THREE.Line(
        geo,
        new THREE.ShaderMaterial({
          uniforms,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexShader: `attribute float aA;varying float vA;void main(){vA=aA;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
          fragmentShader: `uniform float uOpa;varying float vA;void main(){gl_FragColor=vec4(.38,.82,1.,vA*vA*.65*uOpa);}`,
        })
      );
      line.frustumCulled = false;
      mol.add(line);

      return { head, line, phase: k * Math.PI, tilt: k ? 0.82 : -0.82, hist: [] as THREE.Vector3[] };
    });

    const dustPos = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const r = 4.2 + Math.random() * 3;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      dustPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      dustPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
      dustPos[i * 3 + 2] = r * Math.cos(ph);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(
      dustGeo,
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

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (ev: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.ty = ((ev.clientY - rect.top) / rect.height) * 2 - 1;
      const dir = new THREE.Vector3(pointer.tx, -pointer.ty, 0.5)
        .unproject(camera)
        .sub(camera.position)
        .normalize();
      const dist = camera.position.z / -dir.z;
      uniforms.uMouse.value.set(dir.x * dist, dir.y * dist, 0);
    };
    const onLeave = () => {
      uniforms.uMouse.value.set(99, 99, 0);
      pointer.tx = pointer.ty = 0;
    };
    // Cursor tracking only makes sense with a real pointer. On touch there is
    // no event until a finger lands, and a scroll gesture leaves the cloud
    // pushed aside at the spot it was touched; those devices get the drift
    // applied in the frame loop instead.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (fine) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    }

    // Checked every frame: a one-shot measurement is lost on browsers that
    // report the host as 0x0 until after first paint, leaving the drawing
    // buffer at its 300x150 default and stretching it to fit.
    const syncSize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      const pr = Math.min(window.devicePixelRatio, 2);
      if (canvas.width === Math.floor(w * pr) && canvas.height === Math.floor(h * pr)) return;
      renderer.setPixelRatio(pr);
      renderer.setSize(w, h, false);
      uniforms.uPR.value = pr;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    syncSize();

    const clock = new THREE.Clock();
    const tmp = new THREE.Vector3();
    let time = 0;
    let frame = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      syncSize();
      const dt = Math.min(clock.getDelta(), 0.05);
      time += dt;
      uniforms.uTime.value = time;
      uniforms.uOpa.value = Math.min(1, uniforms.uOpa.value + dt * 0.55);

      if (!fine) {
        const drift = time * 0.23;
        uniforms.uMouse.value.set(Math.sin(drift) * 2.1, Math.cos(drift * 0.81) * 1.25, 0);
        pointer.tx = Math.sin(drift * 0.57) * 0.55;
        pointer.ty = Math.cos(drift * 0.43) * 0.3;
      }

      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      root.rotation.y = pointer.x * 0.44 + Math.sin(time * 0.17) * 0.12;
      root.rotation.x = pointer.y * 0.27;
      dust.rotation.y = time * 0.018;

      const pulse = 1.5 + Math.sin(time * 2.15) * 0.12;
      nuclei.forEach((n, i) => {
        n.material.uniforms.uSize.value = pulse + (i ? 0.04 : 0);
        n.material.uniforms.uOpa.value = uniforms.uOpa.value;
      });

      electrons.forEach((e) => {
        const a = time * 1.28 + e.phase;
        const c = Math.cos(e.tilt + time * 0.13);
        const s = Math.sin(e.tilt + time * 0.13);
        const y = Math.sin(2 * a) * 0.76;
        const z = Math.cos(a) * 0.5;
        tmp.set(Math.sin(a) * 1.58, y * c - z * s, y * s + z * c);
        e.head.position.copy(tmp);
        e.hist.unshift(tmp.clone());
        if (e.hist.length > TRAIL) e.hist.pop();
        const arr = e.line.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < TRAIL; i++) {
          const p = e.hist[Math.min(i, e.hist.length - 1)];
          arr[i * 3] = p.x;
          arr[i * 3 + 1] = p.y;
          arr[i * 3 + 2] = p.z;
        }
        e.line.geometry.attributes.position.needsUpdate = true;
        e.head.material.uniforms.uOpa.value = uniforms.uOpa.value;
      });

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return (
    <div ref={hostRef} className="relative h-full w-full">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        {keywords.map((word, i) => (
          <span
            key={word}
            className="absolute text-center transition-all duration-500"
            style={{
              opacity: i === keyword ? 1 : 0,
              transform: i === keyword ? 'scale(1)' : 'scale(0.86)',
              fontSize: 'clamp(26px, 3.4vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: '86%',
              color: '#e9fbff',
              textShadow: '0 0 30px rgba(0,110,210,.95), 0 0 70px rgba(4,10,30,.95)',
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
