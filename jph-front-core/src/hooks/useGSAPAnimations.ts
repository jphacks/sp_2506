import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMobileDetection } from './useMobileDetection';

// ScrollTriggerプラグインを登録
gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = () => {
  const isMobile = useMobileDetection();

  // フェードインアニメーション
  const fadeIn = (element: HTMLElement, delay: number = 0) => {
    if (isMobile) {
      gsap.fromTo(element, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay: delay * 0.5,
          ease: "power2.out"
        }
      );
    } else {
      gsap.fromTo(element, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: delay * 0.3,
          ease: "power3.out"
        }
      );
    }
  };

  // スケールアニメーション
  const scaleIn = (element: HTMLElement, delay: number = 0) => {
    if (isMobile) {
      gsap.fromTo(element,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: delay * 0.3,
          ease: "back.out(1.7)"
        }
      );
    } else {
      gsap.fromTo(element,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          delay: delay * 0.2,
          ease: "back.out(2)"
        }
      );
    }
  };

  // 回転アニメーション
  const rotateIn = (element: HTMLElement, delay: number = 0) => {
    gsap.fromTo(element,
      { rotation: -180, opacity: 0 },
      {
        rotation: 0,
        opacity: 1,
        duration: isMobile ? 0.6 : 0.8,
        delay: delay * 0.2,
        ease: "power2.out"
      }
    );
  };

  // パーティクルアニメーション（軽量版）
  const createParticleAnimation = (element: HTMLElement, index: number) => {
    if (isMobile) {
      // モバイルでは最小限のアニメーション
      gsap.to(element, {
        y: -30,
        opacity: 0.4,
        scale: 0.6,
        duration: 3,
        repeat: -1,
        ease: "power1.out",
        delay: index * 0.5
      });
    } else {
      // デスクトップでも軽量化
      gsap.to(element, {
        y: -60,
        opacity: 0.6,
        scale: 0.8,
        duration: 4,
        repeat: -1,
        ease: "power1.out",
        delay: index * 0.3
      });
    }
  };

  // ホバーアニメーション
  const hoverAnimation = (element: HTMLElement) => {
    const hoverTl = gsap.timeline({ paused: true });
    
    hoverTl.to(element, {
      scale: isMobile ? 1.05 : 1.1,
      y: isMobile ? -2 : -5,
      duration: 0.3,
      ease: "power2.out"
    });

    element.addEventListener('mouseenter', () => hoverTl.play());
    element.addEventListener('mouseleave', () => hoverTl.reverse());
  };

  // パルスアニメーション
  const pulseAnimation = (element: HTMLElement) => {
    gsap.to(element, {
      scale: isMobile ? 1.1 : 1.2,
      duration: isMobile ? 0.8 : 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  };

  // スパークルアニメーション（軽量版）
  const sparkleAnimation = (element: HTMLElement, index: number) => {
    if (isMobile) {
      // モバイルでは最小限のアニメーション
      gsap.to(element, {
        scale: 0.6,
        rotation: 45,
        opacity: 0.5,
        duration: 1.5,
        ease: "power1.out",
        delay: index * 0.15,
        repeat: -1,
        yoyo: true
      });
    } else {
      // デスクトップでも軽量化
      gsap.to(element, {
        scale: 0.8,
        rotation: 90,
        opacity: 0.7,
        duration: 2,
        ease: "power1.out",
        delay: index * 0.3,
        repeat: -1,
        yoyo: true
      });
    }
  };

  return {
    fadeIn,
    scaleIn,
    rotateIn,
    createParticleAnimation,
    hoverAnimation,
    pulseAnimation,
    sparkleAnimation
  };
};
