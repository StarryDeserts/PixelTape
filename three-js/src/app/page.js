"use client";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useState, useEffect, useRef } from "react";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function Home() {

  const mountRef = useRef(null); // 指定类型为 HTMLDivElement 或 null
  const mixerRef = useRef(null);  // 用于存储动画混合器
  const clipActionRef = useRef(null);  // 用于存储clipAction
  const isAnimationPlayingRef = useRef(false); // 用于判断动画是否正在播放

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.x = 0.4;
    camera.position.y = 2.9;
    camera.position.z = 2.8;

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // 禁止缩放
    controls.enableRotate = false; // 禁止旋转
    controls.enablePan = false; // 禁止右键拖拽


    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9); // 颜色和强度
    scene.add(ambientLight);

    // 添加点光源
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5); // 设置点光源位置
    scene.add(pointLight);

    const loader = new GLTFLoader();
    loader.load('mod.glb', function (gltf) {
      scene.add(gltf.scene);

      const mixer = new THREE.AnimationMixer(gltf.scene);
      mixerRef.current = mixer;  // 存储混合器

      const clipAction = mixer.clipAction(gltf.animations[0]); // 获取第一个动画clip
      clipAction.loop = THREE.LoopOnce;
      clipActionRef.current = clipAction;  // 存储clipAction

    }, undefined, function (error) {
      console.error(error);
    });


    // 渲染
    const clock = new THREE.Clock();
    function animate() {
      renderer.render(scene, camera);
      controls.update();
      requestAnimationFrame(animate);

      if (mixerRef.current) {
        mixerRef.current.update(clock.getDelta());
      }
    }

    animate();

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 清理函数
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // 按钮点击事件
  const handleClick = () => {
    console.log("Button clicked!");

    // 只在动画没有播放的情况下播放动画
    if (clipActionRef.current && !isAnimationPlayingRef.current) {
      clipActionRef.current.reset();  // 重置动画
      clipActionRef.current.play(); // 播放动画
      isAnimationPlayingRef.current = true; // 标记动画正在播放

      // 监听动画结束
      clipActionRef.current.clampWhenFinished = true; // 动画完成后停留在最后一帧
      clipActionRef.current.onFinished = () => {
        isAnimationPlayingRef.current = false; // 动画播放完成后设置为停止状态
      };
    }
  };

    // 按钮点击事件
    const handleClickl = () => {
      console.log("Button clicked!  qwe");

    };

  return (
    <div>
      <style>
        {`body { margin: 0; }`}
      </style>
      {/* 渲染器的画布 */}
      <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />

      {/* 左上角按钮 */}
      <button
        onClick={handleClickl}
        style={{
          position: "absolute",
          top: "20px",        // 左上角
          left: "20px",       // 左上角
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        Left Top Button
      </button>

      {/* 右下角按钮 */}
      <button
        onClick={handleClick}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        Mint
      </button>
    </div>
  );
}
