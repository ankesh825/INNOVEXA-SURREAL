import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  RotateCw,
  Pause,
  Play,
  Sparkles,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  RefreshCw,
  Eye,
  Image as ImageIcon,
  Box,
  Layers,
  ZoomIn,
  ZoomOut,
  X,
  ShieldCheck,
  Crown
} from 'lucide-react';

export default function Product3DViewer({ activeProduct, onOpenVideo }) {
  const mountRef = useRef(null);
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'photo'
  const [isRotating, setIsRotating] = useState(true);
  const [isLidOpen, setIsLidOpen] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lightMode, setLightMode] = useState('studio'); // 'studio', 'sun', 'twilight'
  const [activeView, setActiveView] = useState('front');
  const [isLoading, setIsLoading] = useState(true);
  const [webGLError, setWebGLError] = useState(false);

  // Photo interactive drag state
  const [photoAngle, setPhotoAngle] = useState(0);
  const [isPhotoDragging, setIsPhotoDragging] = useState(false);
  const photoPrevX = useRef(0);

  // References for Three.js objects
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const jarGroupRef = useRef(null);
  const lidMeshRef = useRef(null);
  const jarBodyRef = useRef(null);
  const gelCoreRef = useRef(null);
  const labelMeshRef = useRef(null);
  const keyLightRef = useRef(null);
  const fillLightRef = useRef(null);
  const rimLightRef = useRef(null);
  const isRotatingRef = useRef(true);
  const isLidOpenRef = useRef(false);
  const isExplodedRef = useRef(false);

  // Keep refs in sync with state
  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    isLidOpenRef.current = isLidOpen;
  }, [isLidOpen]);

  useEffect(() => {
    isExplodedRef.current = isExploded;
  }, [isExploded]);

  // Lighting Mode effect
  useEffect(() => {
    if (!keyLightRef.current || !fillLightRef.current || !rimLightRef.current) return;
    if (lightMode === 'studio') {
      keyLightRef.current.color.setHex(0xffffff);
      keyLightRef.current.intensity = 2.4;
      fillLightRef.current.color.setHex(0xe8f5ee);
      fillLightRef.current.intensity = 1.1;
      rimLightRef.current.color.setHex(0xd4af37); // Gold rim
      rimLightRef.current.intensity = 2.0;
    } else if (lightMode === 'sun') {
      keyLightRef.current.color.setHex(0xfffaed);
      keyLightRef.current.intensity = 2.9;
      fillLightRef.current.color.setHex(0xffecd1);
      fillLightRef.current.intensity = 1.3;
      rimLightRef.current.color.setHex(0x55cc77);
      rimLightRef.current.intensity = 2.2;
    } else if (lightMode === 'twilight') {
      keyLightRef.current.color.setHex(0xf3cca3);
      keyLightRef.current.intensity = 2.0;
      fillLightRef.current.color.setHex(0x524365);
      fillLightRef.current.intensity = 0.9;
      rimLightRef.current.color.setHex(0xd4af37);
      rimLightRef.current.intensity = 2.8;
    }
  }, [lightMode]);

  // Camera presets effect
  useEffect(() => {
    if (!cameraRef.current) return;
    const cam = cameraRef.current;
    if (activeView === 'front') {
      cam.position.set(0, 0.45, 4.0);
      cam.lookAt(0, 0.15, 0);
    } else if (activeView === 'angle') {
      cam.position.set(2.8, 1.8, 3.2);
      cam.lookAt(0, 0.2, 0);
    } else if (activeView === 'top') {
      cam.position.set(0, 4.2, 1.2);
      cam.lookAt(0, 0, 0);
    } else if (activeView === 'macro') {
      cam.position.set(0, 0.2, 2.4);
      cam.lookAt(0, 0.1, 0);
    }
  }, [activeView]);

  // Zoom handlers
  const handleZoom = (delta) => {
    if (!cameraRef.current) return;
    const cam = cameraRef.current;
    const newZ = cam.position.z + delta;
    cam.position.z = Math.max(2.1, Math.min(5.8, newZ));
  };

  const handleResetCamera = () => {
    if (!cameraRef.current || !jarGroupRef.current) return;
    cameraRef.current.position.set(0, 0.45, 4.0);
    cameraRef.current.lookAt(0, 0.15, 0);
    jarGroupRef.current.rotation.set(0, 0, 0);
    setActiveView('front');
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container || viewMode !== '3d') return;

    let animationFrameId;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLError(true);
        setIsLoading(false);
        return;
      }
    } catch {
      setWebGLError(true);
      setIsLoading(false);
      return;
    }

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 480;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.45, 4.0);
    camera.lookAt(0, 0.15, 0);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3.5, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.DirectionalLight(0xe8f5ee, 1.2);
    fillLight.position.set(-4, 2, 2.5);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.2); // Gold accent rim light
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // Subtle bottom gold reflector bounce
    const bottomReflector = new THREE.DirectionalLight(0xd4af37, 0.5);
    bottomReflector.position.set(0, -3, 2);
    scene.add(bottomReflector);

    // ROOT PRODUCT GROUP
    const jarGroup = new THREE.Group();
    scene.add(jarGroup);
    jarGroupRef.current = jarGroup;

    // 1. STONE PEDESTAL (Matching royal dashboard aesthetic)
    const pedestalGeo = new THREE.CylinderGeometry(1.68, 1.78, 0.32, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xefede7,
      roughness: 0.65,
      metalness: 0.05,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.18;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // Water ripple ring around pedestal
    const waterRingGeo = new THREE.RingGeometry(1.7, 2.3, 48);
    const waterRingMat = new THREE.MeshStandardMaterial({
      color: 0xcfe9da,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
    const waterRing = new THREE.Mesh(waterRingGeo, waterRingMat);
    waterRing.rotation.x = -Math.PI / 2;
    waterRing.position.y = -1.25;
    scene.add(waterRing);

    // Soft ground shadow plane
    const shadowGeo = new THREE.PlaneGeometry(5.2, 5.2);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    const grad = sCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
    grad.addColorStop(0, 'rgba(18, 43, 32, 0.45)');
    grad.addColorStop(0.5, 'rgba(18, 43, 32, 0.12)');
    grad.addColorStop(1, 'rgba(18, 43, 32, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 256, 256);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.33;
    scene.add(shadowPlane);

    // 2. CREATE AUTHENTIC SUREAL LABEL TEXTURE
    const textureLoader = new THREE.TextureLoader();
    const labelTexture = textureLoader.load(
      '/images/threejs_sureal_label.png',
      () => {
        renderer.render(scene, camera);
      }
    );
    labelTexture.wrapS = THREE.ClampToEdgeWrapping;
    labelTexture.wrapT = THREE.ClampToEdgeWrapping;

    // 3. TRANSPARENT CLEAR JAR BODY (Showing vibrant green gel inside)
    const jarOuterGeo = new THREE.CylinderGeometry(1.08, 1.02, 1.35, 64);
    const jarGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88, // Clear transparent container
      opacity: 0.98,
      transparent: true,
      roughness: 0.08,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      ior: 1.5,
    });
    const jarBody = new THREE.Mesh(jarOuterGeo, jarGlassMat);
    jarBody.position.y = -0.32;
    jarBody.castShadow = true;
    jarBody.receiveShadow = true;
    jarGroup.add(jarBody);
    jarBodyRef.current = jarBody;

    // 4. INNER VIBRANT ALOE VERA GEL CORE
    const gelGeo = new THREE.CylinderGeometry(1.0, 0.95, 1.25, 48);
    const gelMat = new THREE.MeshPhysicalMaterial({
      color: 0x2bb656, // Vibrant fresh Aloe Vera Green
      emissive: 0x0f5e2b,
      emissiveIntensity: 0.25,
      roughness: 0.25,
      transmission: 0.5,
      transparent: true,
      opacity: 0.92,
      ior: 1.34,
    });
    const gelCore = new THREE.Mesh(gelGeo, gelMat);
    gelCore.position.y = -0.32;
    jarGroup.add(gelCore);
    gelCoreRef.current = gelCore;

    // Fresh Dew Drops on Outer Jar Glass (Cold-pressed fresh dew condensation)
    const dewMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      roughness: 0.02,
      ior: 1.33,
      transparent: true,
      opacity: 0.95,
    });
    const dewGroup = new THREE.Group();
    const dropletAngles = [0.4, 0.9, 1.6, 2.2, 2.9, 3.7, 4.3, 5.1, 5.8];
    dropletAngles.forEach((ang, idx) => {
      const radius = 0.022 + (idx % 3) * 0.01;
      const dewMesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 12), dewMat);
      const yPos = -0.8 + ((idx * 0.17) % 0.95);
      dewMesh.position.set(Math.cos(ang) * 1.085, yPos, Math.sin(ang) * 1.085);
      dewGroup.add(dewMesh);
    });
    jarGroup.add(dewGroup);

    // 5. SUREAL FRONT LABEL BAND
    const labelGeo = new THREE.CylinderGeometry(1.085, 1.085, 0.92, 64, 1, true, -Math.PI / 2.3, Math.PI / 1.15);
    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.35,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.y = -0.32;
    jarGroup.add(labelMesh);
    labelMeshRef.current = labelMesh;

    // 6. SIGNATURE METALLIC GOLD SCREW CAP / LID (Exact match to Sureal real product!)
    const lidGroup = new THREE.Group();
    lidMeshRef.current = lidGroup;
    jarGroup.add(lidGroup);

    // Main Gold Lid Cylinder
    const lidGeo = new THREE.CylinderGeometry(1.12, 1.12, 0.42, 64);
    const lidGoldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Rich metallic luxury gold
      roughness: 0.22,
      metalness: 0.88,
    });
    const lidMain = new THREE.Mesh(lidGeo, lidGoldMat);
    lidMain.castShadow = true;
    lidGroup.add(lidMain);

    // Screw ridges on lid side for realistic grip
    const ridgeRingGeo = new THREE.TorusGeometry(1.125, 0.02, 16, 64);
    const ridgeRingMat = new THREE.MeshStandardMaterial({
      color: 0xf5deb3,
      metalness: 0.9,
      roughness: 0.15,
    });
    const ridge1 = new THREE.Mesh(ridgeRingGeo, ridgeRingMat);
    ridge1.rotation.x = Math.PI / 2;
    ridge1.position.y = 0.08;
    lidGroup.add(ridge1);

    const ridge2 = new THREE.Mesh(ridgeRingGeo, ridgeRingMat);
    ridge2.rotation.x = Math.PI / 2;
    ridge2.position.y = -0.08;
    lidGroup.add(ridge2);

    // Polished top beveled cap with authentic circular seal
    const lidTopTexture = textureLoader.load('/images/threejs_gold_lid_top.png');
    const lidTopCapGeo = new THREE.CylinderGeometry(1.05, 1.11, 0.06, 64);
    const lidTopCapMat = new THREE.MeshStandardMaterial({
      map: lidTopTexture,
      roughness: 0.3,
      metalness: 0.8,
    });
    const lidTopCap = new THREE.Mesh(lidTopCapGeo, lidTopCapMat);
    lidTopCap.position.y = 0.23;
    lidGroup.add(lidTopCap);

    // Initial closed position of the gold lid
    lidGroup.position.set(0, 0.58, 0);

    // 7. BOTANICAL ALOE LEAVES ON THE SIDES
    const createAloeLeaf = (scaleX, scaleY, scaleZ, posX, posY, posZ, rotX, rotY, rotZ) => {
      const leafGeo = new THREE.ConeGeometry(0.35, 2.2, 16);
      leafGeo.rotateX(Math.PI);
      const leafMat = new THREE.MeshStandardMaterial({
        color: 0x3d8252,
        roughness: 0.35,
        metalness: 0.1,
      });
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.scale.set(scaleX, scaleY, scaleZ);
      leaf.position.set(posX, posY, posZ);
      leaf.rotation.set(rotX, rotY, rotZ);
      leaf.castShadow = true;
      leaf.receiveShadow = true;
      return leaf;
    };

    const leaf1 = createAloeLeaf(0.55, 0.95, 0.18, 1.45, -0.65, 0.35, 0.2, -0.5, -0.6);
    scene.add(leaf1);
    const leaf2 = createAloeLeaf(0.45, 0.75, 0.15, -1.45, -0.75, 0.25, 0.1, 0.6, 0.7);
    scene.add(leaf2);

    // 8. FLOATING GOLDEN AMBIENT DUST & BOTANICAL PARTICLES
    const particleCount = 110;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const pAngle = Math.random() * Math.PI * 2;
      const pRadius = 1.25 + Math.random() * 2.2;
      particlePositions[i * 3] = Math.cos(pAngle) * pRadius;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3.6;
      particlePositions[i * 3 + 2] = Math.sin(pAngle) * pRadius;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.045,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    setIsLoading(false);

    // MOUSE & TOUCH DRAG INTERACTION
    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX);
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      rotationVelocityX = deltaX * 0.007;
      rotationVelocityY = deltaY * 0.005;

      jarGroup.rotation.y += rotationVelocityX;
      jarGroup.rotation.x = Math.max(-0.35, Math.min(0.35, jarGroup.rotation.x + rotationVelocityY));

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      const newZ = camera.position.z + e.deltaY * 0.0025;
      camera.position.z = Math.max(2.1, Math.min(5.8, newZ));
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domElem.addEventListener('touchstart', onMouseDown, { passive: true });
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    domElem.addEventListener('wheel', onWheel, { passive: false });

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION RENDER LOOP
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Continuous auto-rotation when active and not dragging
      if (isRotatingRef.current && !isDragging) {
        jarGroup.rotation.y += 0.007;
      }

      // Smooth inertia damping when user stops dragging
      if (!isDragging) {
        jarGroup.rotation.y += rotationVelocityX;
        rotationVelocityX *= 0.92;
        rotationVelocityY *= 0.92;
      }

      // Smooth Lid & Exploded Animation
      if (lidGroup) {
        let targetLidY = 0.58;
        let targetLidRotZ = 0;

        if (isExplodedRef.current) {
          targetLidY = 2.05; // Lift cap high in exploded view
          targetLidRotZ = 0.35;
        } else if (isLidOpenRef.current) {
          targetLidY = 1.45;
          targetLidRotZ = 0.28;
        }

        lidGroup.position.y += (targetLidY - lidGroup.position.y) * 0.1;
        lidGroup.rotation.z += (targetLidRotZ - lidGroup.rotation.z) * 0.1;
      }

      // Jar Body and Core Exploded displacement
      if (jarBodyRef.current && gelCoreRef.current && labelMeshRef.current) {
        const targetJarY = isExplodedRef.current ? -0.58 : -0.32;
        const targetGelScale = isExplodedRef.current ? 1.05 : 1.0;
        const targetLabelScale = isExplodedRef.current ? 1.1 : 1.0;

        jarBodyRef.current.position.y += (targetJarY - jarBodyRef.current.position.y) * 0.1;
        gelCoreRef.current.scale.lerp(new THREE.Vector3(targetGelScale, 1.0, targetGelScale), 0.1);
        labelMeshRef.current.scale.lerp(new THREE.Vector3(targetLabelScale, 1.0, targetLabelScale), 0.1);

        if (gelCoreRef.current.material) {
          const targetEmissive = isExplodedRef.current ? 0.45 : 0.22;
          gelCoreRef.current.material.emissiveIntensity +=
            (targetEmissive - gelCoreRef.current.material.emissiveIntensity) * 0.1;
        }
      }

      // Particles gentle drift & orbit
      if (particles) {
        particles.rotation.y += 0.002;
        const pArray = particleGeo.attributes.position.array;
        for (let i = 1; i < particleCount * 3; i += 3) {
          pArray[i] += 0.0035;
          if (pArray[i] > 2.0) pArray[i] = -1.6;
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElem.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
      domElem.removeEventListener('wheel', onWheel);
      if (renderer) renderer.dispose();
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
    };
  }, [viewMode, isFullscreen]);

  // Photo mode mouse drag rotation
  const handlePhotoMouseDown = (e) => {
    setIsPhotoDragging(true);
    photoPrevX.current = e.clientX || (e.touches && e.touches[0].clientX);
  };

  const handlePhotoMouseMove = (e) => {
    if (!isPhotoDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const delta = clientX - photoPrevX.current;
    setPhotoAngle((prev) => prev + delta * 0.3);
    photoPrevX.current = clientX;
  };

  const handlePhotoMouseUp = () => {
    setIsPhotoDragging(false);
  };

  const viewerContainerClass = isFullscreen
    ? 'fixed inset-0 z-50 bg-[#091510]/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8 animate-fadeIn'
    : 'relative w-full h-full min-h-[460px] md:min-h-[520px] flex items-center justify-center select-none overflow-hidden rounded-3xl bg-gradient-to-b from-[#f9f7f2] via-[#eef6f1] to-[#e4ede7] border border-[#d6e3da] shadow-2xl';

  return (
    <div className={viewerContainerClass}>
      {/* Fullscreen Close Button */}
      {isFullscreen && (
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
          title="Exit Fullscreen 3D Stage"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* View Mode Toggle: 3D WebGL vs Authentic Studio Photo */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 p-1 rounded-full bg-white/90 backdrop-blur-md border border-[#c1d9cb] shadow-sm">
        <button
          onClick={() => setViewMode('3d')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            viewMode === '3d'
              ? 'bg-[#173829] text-white shadow-xs'
              : 'text-[#445b4c] hover:bg-[#eaf3ed]'
          }`}
        >
          <Box className="w-3.5 h-3.5 text-emerald-300" />
          <span>3D WebGL (360°)</span>
        </button>

        <button
          onClick={() => setViewMode('photo')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
            viewMode === 'photo'
              ? 'bg-[#173829] text-white shadow-xs'
              : 'text-[#445b4c] hover:bg-[#eaf3ed]'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Real Studio Shot</span>
        </button>
      </div>

      {/* Top Right Quick Controls */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
        {viewMode === '3d' ? (
          <>
            {/* Auto-Rotate Toggle */}
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm cursor-pointer ${
                isRotating
                  ? 'bg-[#173829] text-white border border-[#173829]'
                  : 'bg-white/85 text-[#173829] border border-[#c1d9cb] hover:bg-white'
              }`}
              title={isRotating ? 'Pause automatic 360° spin' : 'Resume automatic 360° spin'}
            >
              {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isRotating ? '360°: ON' : '360°: OFF'}</span>
            </button>

            {/* Interactive Lid Toggle Button */}
            <button
              onClick={() => {
                if (isExploded) setIsExploded(false);
                setIsLidOpen(!isLidOpen);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm cursor-pointer ${
                isLidOpen && !isExploded
                  ? 'bg-[#d4af37] text-[#122b20] border border-[#d4af37] font-semibold'
                  : 'bg-white/85 text-[#173829] border border-[#c1d9cb] hover:bg-white'
              }`}
              title={isLidOpen ? 'Close Gold Lid' : 'Unscrew Gold Lid to inspect Aloe Gel'}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isLidOpen ? 'Lid: Open' : 'Open Lid'}</span>
            </button>

            {/* Exploded / Layers View Button */}
            <button
              onClick={() => {
                setIsExploded(!isExploded);
                if (!isExploded) setIsLidOpen(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm cursor-pointer ${
                isExploded
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#e6c98f] text-[#122b20] font-bold shadow-md'
                  : 'bg-white/85 text-[#173829] border border-[#c1d9cb] hover:bg-white'
              }`}
              title="Separate layers to inspect Gold Cap, Jar and Pure Bioactive Aloe Core"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isExploded ? 'Collapse' : 'Inspect Layers'}</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-full bg-white/85 text-[#173829] border border-[#c1d9cb] hover:bg-white shadow-sm transition-all cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'View in Fullscreen Cinema Mode'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 text-[#173829] border border-[#c1d9cb] text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Sureal Real Product</span>
          </div>
        )}
      </div>

      {/* Exploded View Floating 3D Layer Hotspots */}
      {viewMode === '3d' && isExploded && (
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-10 animate-fadeIn">
          {/* Top Hotspot: Gold Cap */}
          <div className="self-end bg-[#122b20]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl border border-[#d4af37]/60 shadow-lg text-xs flex items-center gap-2 animate-bounce pointer-events-auto">
            <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
            <div>
              <span className="font-bold text-[#f5deaa] block text-[11px]">Signature Metallic Gold Cap</span>
              <span className="text-[9px] text-[#bed2c5]">Precision Screw Thread Seal · 100% Airtight</span>
            </div>
          </div>

          {/* Center Hotspot: Gel Core */}
          <div className="self-start bg-[#122b20]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl border border-emerald-400/60 shadow-lg text-xs flex items-center gap-2 pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <div>
              <span className="font-bold text-emerald-300 block text-[11px]">100% Cold-Pressed Aloe Core</span>
              <span className="text-[9px] text-[#bed2c5]">Harvested in Indore · Zero Water Dilution</span>
            </div>
          </div>

          {/* Bottom Hotspot: Clear Jar Base */}
          <div className="self-end bg-[#122b20]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl border border-white/40 shadow-lg text-xs flex items-center gap-2 pointer-events-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <div>
              <span className="font-bold text-white block text-[11px]">Frosted Glass Apothecary Jar</span>
              <span className="text-[9px] text-[#bed2c5]">100g Net Weight · Minimal Luxury Craft</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 1: 3D WebGL Canvas */}
      {viewMode === '3d' && (
        <div
          ref={mountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center relative z-10"
          title="Drag to rotate Sureal Aloe Vera Gel in 360 degrees · Scroll wheel to zoom"
        />
      )}

      {/* VIEW MODE 2: Authentic Studio Photo with Interactive Tilt */}
      {viewMode === 'photo' && (
        <div
          onMouseDown={handlePhotoMouseDown}
          onMouseMove={handlePhotoMouseMove}
          onMouseUp={handlePhotoMouseUp}
          onTouchStart={handlePhotoMouseDown}
          onTouchMove={handlePhotoMouseMove}
          onTouchEnd={handlePhotoMouseUp}
          className="w-full h-full flex flex-col items-center justify-center p-6 z-10 cursor-grab active:cursor-grabbing relative overflow-hidden"
        >
          {/* Authentic Sureal jar stage photo */}
          <div
            className="relative max-h-[420px] max-w-[480px] w-full flex items-center justify-center transition-transform duration-100 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${photoAngle * 0.15}deg)`,
            }}
          >
            <img
              src="/images/real_sureal_aloe_product_full.png"
              alt="Sureal Aloe Vera Gel on Wooden Pedestal with Fresh Aloe Vera Leaves and Flowers"
              className="max-h-[410px] w-auto object-contain drop-shadow-2xl rounded-2xl"
              draggable="false"
            />
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#d6e3da] shadow-sm text-xs text-[#173829] font-medium">
            <RotateCw className="w-3.5 h-3.5 text-emerald-600 animate-spin-slow" />
            <span>Interactive 360° Studio Angle · Drag to Tilt</span>
          </div>
        </div>
      )}

      {/* 3D Mode Bottom Bar: Camera Views, Zoom & Lighting Mood Bar */}
      {viewMode === '3d' && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#d6e3da] shadow-md max-w-[96%]">
          <span className="text-[10px] uppercase font-bold text-[#5d7a68] tracking-widest px-2 hidden lg:inline">
            Angle
          </span>

          {[
            { id: 'front', label: 'Front' },
            { id: 'angle', label: '45° Hero' },
            { id: 'top', label: 'Top Cap' },
            { id: 'macro', label: 'Sureal Label' },
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`px-2.5 py-1 text-xs rounded-full transition-all cursor-pointer ${
                activeView === view.id
                  ? 'bg-[#173829] text-white font-medium shadow-xs'
                  : 'text-[#445b4c] hover:bg-[#eaf3ed]'
              }`}
            >
              {view.label}
            </button>
          ))}

          <div className="h-4 w-[1px] bg-[#d6e3da] mx-1"></div>

          {/* Zoom In & Out */}
          <button
            onClick={() => handleZoom(-0.5)}
            className="p-1 rounded-full text-[#173829] hover:bg-[#eaf3ed] transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => handleZoom(0.5)}
            className="p-1 rounded-full text-[#173829] hover:bg-[#eaf3ed] transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleResetCamera}
            className="p-1 rounded-full text-[#173829] hover:bg-[#eaf3ed] transition-colors cursor-pointer"
            title="Reset Camera Angle & Zoom"
          >
            <RefreshCw className="w-3 h-3" />
          </button>

          <div className="h-4 w-[1px] bg-[#d6e3da] mx-1"></div>

          {/* Lighting Mode toggle */}
          <button
            onClick={() => setLightMode(lightMode === 'studio' ? 'sun' : lightMode === 'sun' ? 'twilight' : 'studio')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-[#f4f7f4] hover:bg-[#e4ede7] text-[#173829] transition-all cursor-pointer"
            title="Switch lighting: Studio / Sunlight / Twilight"
          >
            {lightMode === 'studio' && <Sparkles className="w-3 h-3 text-emerald-600" />}
            {lightMode === 'sun' && <Sun className="w-3 h-3 text-amber-500" />}
            {lightMode === 'twilight' && <Moon className="w-3 h-3 text-purple-600" />}
            <span className="capitalize">{lightMode} Light</span>
          </button>
        </div>
      )}

      {/* Floating Subtitle Watermark */}
      <div className="absolute bottom-4 right-5 text-[10px] tracking-widest uppercase text-[#739480] pointer-events-none hidden lg:block">
        Sureal Treasures · Indore
      </div>
    </div>
  );
}
