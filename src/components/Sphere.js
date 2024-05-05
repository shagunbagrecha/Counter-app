// Sphere.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

const Sphere = ({ radius }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (mountRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
      const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable alpha channel
      renderer.setClearColor(0x00000000, 0); // Set clear color to transparent black
  
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);
  
      const geometry = new THREE.SphereGeometry(radius || 1, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });
      const sphere = new THREE.Mesh(geometry, material);
  
      scene.add(sphere);
      camera.position.z = 5;
  
      const animate = () => {
        requestAnimationFrame(animate);
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
  
      animate();
  
      return () => {
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    }
  }, [radius]);

  return (
    <div className="relative h-screen">
      <Link to="/" className="absolute top-4 left-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go Back
        </button>
      </Link>
      <div ref={mountRef} />
    </div>
  );
};

export default Sphere;
