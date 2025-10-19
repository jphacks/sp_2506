import { useCallback } from 'react';
import { gsap } from 'gsap';
import { useMobileDetection } from './useMobileDetection';

export const useFireworksAnimation = () => {
  const isMobile = useMobileDetection();

  const createFireworks = useCallback(() => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    const particleCount = isMobile ? 15 : 30;
    
    // 花火の中心点をランダムに決定
    const centerX = Math.random() * window.innerWidth;
    const centerY = Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2;
    
    for (let i = 0; i < particleCount; i++) {
      const firework = document.createElement('div');
      firework.className = 'firework-particle';
      firework.style.cssText = `
        position: fixed;
        width: ${isMobile ? '3px' : '4px'};
        height: ${isMobile ? '3px' : '4px'};
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        box-shadow: 0 0 6px currentColor;
      `;
      
      document.body.appendChild(firework);
      
      // 初期位置を中心に設定
      gsap.set(firework, {
        x: centerX,
        y: centerY,
        scale: 0
      });
      
      // ランダムな方向に爆発
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = isMobile ? 50 + Math.random() * 100 : 80 + Math.random() * 150;
      const targetX = centerX + Math.cos(angle) * distance;
      const targetY = centerY + Math.sin(angle) * distance;
      
      const tl = gsap.timeline();
      
      // 爆発アニメーション
      tl.to(firework, {
        scale: 1,
        duration: 0.1,
        ease: "power2.out"
      })
      .to(firework, {
        x: targetX,
        y: targetY,
        scale: 0,
        opacity: 0,
        duration: isMobile ? 1.2 : 1.8,
        ease: "power2.out",
        onComplete: () => firework.remove()
      });
    }
  }, [isMobile]);

  const createSuccessSequence = useCallback(() => {
    const tl = gsap.timeline();
    
    // 複数の花火を時間差で発射
    tl.call(createFireworks, [], 0)
      .call(createFireworks, [], 0.3)
      .call(createFireworks, [], 0.6)
      .call(createFireworks, [], 0.9);
    
    return tl;
  }, [createFireworks]);

  const createConfetti = useCallback(() => {
    const confettiCount = isMobile ? 20 : 40;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.cssText = `
        position: fixed;
        width: ${isMobile ? '6px' : '8px'};
        height: ${isMobile ? '6px' : '8px'};
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        pointer-events: none;
        z-index: 1000;
        top: -10px;
        left: ${Math.random() * window.innerWidth}px;
      `;
      
      document.body.appendChild(confetti);
      
      const tl = gsap.timeline();
      
      tl.to(confetti, {
        y: window.innerHeight + 100,
        rotation: 720,
        duration: isMobile ? 2 : 3,
        ease: "power2.out",
        onComplete: () => confetti.remove()
      });
    }
  }, [isMobile]);

  const createSuccessPulse = useCallback(() => {
    const pulse = document.createElement('div');
    pulse.className = 'success-pulse';
    pulse.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border: 2px solid #4ecdc4;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999;
      transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(pulse);
    
    gsap.to(pulse, {
      width: isMobile ? '200px' : '300px',
      height: isMobile ? '200px' : '300px',
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => pulse.remove()
    });
  }, [isMobile]);

  return {
    createFireworks,
    createSuccessSequence,
    createConfetti,
    createSuccessPulse
  };
};
