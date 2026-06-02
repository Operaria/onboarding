"use client";

import { useEffect, useRef } from "react";

// Isotipo Signal animado · canon Operaria.
// Motor extraído textual del manifiesto III (NO MODIFICAR sin permiso de Do).
// Origen: opera-san-seremi/_design/logos/_motor.js + INDEX.html

interface ComboColors {
  arc: string;
  wave: string;
  photon: string;
  node: string;
  primary: string;
  accent: string;
}

const COMBOS: Record<string, { light: ComboColors; dark: ComboColors }> = {
  op_institucional: {
    light: { arc: "#132649", wave: "#1D396D", photon: "#132649", node: "#1D396D", primary: "#132649", accent: "#1F5B57" },
    dark:  { arc: "#EDEAE3", wave: "#EDEAE3", photon: "#EDEAE3", node: "#EDEAE3", primary: "#EDEAE3", accent: "#EDC9C0" },
  },
  op_editorial: {
    light: { arc: "#91524A", wave: "#D7806A", photon: "#91524A", node: "#91524A", primary: "#91524A", accent: "#1F5B57" },
    dark:  { arc: "#EBD8C1", wave: "#EDC9C0", photon: "#EBD8C1", node: "#EDC9C0", primary: "#EBD8C1", accent: "#D7806A" },
  },
  op_despertar: {
    light: { arc: "#1D396D", wave: "#349891", photon: "#1D396D", node: "#D7806A", primary: "#1D396D", accent: "#D7806A" },
    dark:  { arc: "#F0E4D2", wave: "#349891", photon: "#F0E4D2", node: "#D7806A", primary: "#F0E4D2", accent: "#D7806A" },
  },
  flow_primaria: {
    light: { arc: "#132649", wave: "#1D396D", photon: "#132649", node: "#1D396D", primary: "#132649", accent: "#349891" },
    dark:  { arc: "#EDEAE3", wave: "#EDEAE3", photon: "#EDEAE3", node: "#EDEAE3", primary: "#EDEAE3", accent: "#349891" },
  },
  flow_calida: {
    light: { arc: "#1D396D", wave: "#1D396D", photon: "#1D396D", node: "#1D396D", primary: "#1D396D", accent: "#349891" },
    dark:  { arc: "#F0E4D2", wave: "#F0E4D2", photon: "#F0E4D2", node: "#F0E4D2", primary: "#F0E4D2", accent: "#EDC9C0" },
  },
  health_directiva: {
    light: { arc: "#1F5B57", wave: "#349891", photon: "#1F5B57", node: "#1F5B57", primary: "#1F5B57", accent: "#349891" },
    dark:  { arc: "#EDEAE3", wave: "#EDEAE3", photon: "#EDEAE3", node: "#EDEAE3", primary: "#EDEAE3", accent: "#349891" },
  },
  health_comunitaria: {
    light: { arc: "#1F5B57", wave: "#349891", photon: "#1F5B57", node: "#349891", primary: "#1F5B57", accent: "#349891" },
    dark:  { arc: "#EBD8C1", wave: "#EBD8C1", photon: "#EBD8C1", node: "#EBD8C1", primary: "#EBD8C1", accent: "#D7806A" },
  },
};

interface Props {
  combo?: keyof typeof COMBOS;
  mode?: "light" | "dark";
  size?: number;
  className?: string;
}

export default function OrbitalLogo({
  combo = "health_comunitaria",
  mode = "dark",
  size = 100,
  className,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const c = COMBOS[combo]?.[mode];
    if (!c) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = size * DPR;
    cv.height = size * DPR;
    cv.style.width = `${size}px`;
    cv.style.height = `${size}px`;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.scale(DPR, DPR);

    const OPEN = 0.55;
    const ARC_S = Math.PI * 0.18 + OPEN;
    const ARC_E = Math.PI * 2.18 - OPEN;
    const CYCLE = (Math.PI * 1.6) / 1.12;

    const cssW = size;
    const cssH = size;
    const arcR = Math.min(cssW, cssH) * 0.34;
    const cx = cssW / 2;
    const cy = cssH / 2;
    const lw = Math.max(1.4, arcR * 0.054);

    function drawArc(col: string) {
      ctx!.save();
      ctx!.strokeStyle = col;
      ctx!.lineWidth = lw;
      ctx!.lineCap = "round";
      ctx!.beginPath();
      ctx!.arc(cx, cy, arcR, ARC_S, ARC_E);
      ctx!.stroke();
      ctx!.restore();
    }
    function drawWave(col: string, phase: number) {
      ctx!.save();
      ctx!.strokeStyle = col;
      ctx!.lineWidth = lw * 0.55;
      ctx!.globalAlpha = 0.42;
      ctx!.beginPath();
      for (let i = 0; i <= 100; i++) {
        const ang = (i / 100) * Math.PI * 1.6 + ARC_S;
        const nx = -Math.sin(ang);
        const ny = Math.cos(ang);
        const wo = Math.sin(ang * 6 - phase * 2.8) * (arcR * 0.062);
        const px = cx + Math.cos(ang) * (arcR - arcR * 0.19) + nx * wo;
        const py = cy + Math.sin(ang) * (arcR - arcR * 0.19) + ny * wo;
        if (i === 0) ctx!.moveTo(px, py);
        else ctx!.lineTo(px, py);
      }
      ctx!.stroke();
      ctx!.restore();
    }
    function drawNode(col: string) {
      const nr = arcR * 0.1;
      ctx!.save();
      ctx!.fillStyle = col;
      ctx!.strokeStyle = col;
      ctx!.lineWidth = arcR * 0.025;
      ctx!.globalAlpha = 0.88;
      ctx!.beginPath();
      ctx!.arc(cx, cy, nr, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.stroke();
      ctx!.restore();
    }
    function drawPhoton(col: string, phase: number) {
      const pa = (phase * 1.12) % (Math.PI * 1.6) + ARC_S;
      const px = cx + Math.cos(pa) * arcR;
      const py = cy + Math.sin(pa) * arcR;

      ctx!.save();
      for (let i = 1; i <= 12; i++) {
        const ta = pa - i * 0.07;
        ctx!.globalAlpha = (1 - i / 12) * 0.28;
        ctx!.fillStyle = col;
        ctx!.beginPath();
        ctx!.arc(
          cx + Math.cos(ta) * arcR,
          cy + Math.sin(ta) * arcR,
          Math.max(0.2, arcR * 0.065 - i * 0.15),
          0,
          Math.PI * 2,
        );
        ctx!.fill();
      }
      ctx!.restore();

      ctx!.save();
      ctx!.shadowColor = col;
      ctx!.shadowBlur = 14;
      ctx!.fillStyle = col;
      ctx!.beginPath();
      ctx!.arc(px, py, arcR * 0.078, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();

      ctx!.save();
      ctx!.strokeStyle = col;
      ctx!.lineWidth = 0.5;
      ctx!.globalAlpha = 0.12;
      ctx!.setLineDash([2, 5]);
      ctx!.beginPath();
      ctx!.moveTo(cx, cy);
      ctx!.lineTo(px, py);
      ctx!.stroke();
      ctx!.restore();
    }

    // Partículas
    class FieldParticle {
      angle = 0; radius = 0; life = 0; maxLife = 0; size = 0; speed = 0;
      constructor() { this.reset(); }
      reset() {
        this.angle = Math.random() * Math.PI * 2;
        this.radius = arcR * (0.08 + Math.random() * 0.28);
        this.life = 0;
        this.maxLife = 40 + Math.random() * 50;
        this.size = 0.7 + Math.random() * 1.4;
        this.speed = (Math.random() < 0.5 ? 1 : -1) * (0.016 + Math.random() * 0.032);
      }
      update() {
        this.angle += this.speed;
        this.life++;
        if (this.life > this.maxLife) this.reset();
      }
      draw(col: string, phase: number) {
        const a = Math.sin((this.life / this.maxLife) * Math.PI) * 0.52;
        const x = cx + Math.cos(this.angle) * this.radius * (0.8 + 0.35 * Math.sin(this.angle * 3 + phase));
        const y = cy + Math.sin(this.angle) * this.radius * (0.8 + 0.35 * Math.cos(this.angle * 2 + phase));
        ctx!.save();
        ctx!.globalAlpha = a;
        ctx!.fillStyle = col;
        ctx!.beginPath();
        ctx!.arc(x, y, this.size, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }
    class OrbitalParticle {
      angle: number; phaseOffset: number; size: number; baseR: number; driftSpeed: number;
      constructor(phaseOffset: number) {
        this.angle = Math.random() * Math.PI * 2;
        this.phaseOffset = phaseOffset;
        this.size = 1.1 + Math.random() * 0.8;
        this.baseR = arcR * (0.06 + Math.random() * 0.08);
        this.driftSpeed = (Math.random() < 0.5 ? 1 : -1) * (0.004 + Math.random() * 0.005);
      }
      draw(col: string, glowCol: string, globalPhase: number) {
        this.angle += this.driftSpeed;
        const photonPhase = (globalPhase * 1.12) % (Math.PI * 1.6) + ARC_S;
        const cyclePos = ((globalPhase % CYCLE) / CYCLE + this.phaseOffset) % 1.0;
        const travelT = Math.sin(cyclePos * Math.PI);
        const currentR = this.baseR + (arcR - this.baseR) * travelT;
        const blendAngle = this.angle + (photonPhase - this.angle) * travelT * 0.6;
        const x = cx + Math.cos(blendAngle) * currentR;
        const y = cy + Math.sin(blendAngle) * currentR;
        const baseAlpha = 0.18 + travelT * 0.6;
        ctx!.save();
        ctx!.globalAlpha = baseAlpha;
        if (travelT > 0.45) {
          ctx!.fillStyle = glowCol;
          ctx!.shadowColor = glowCol;
          ctx!.shadowBlur = 8 * travelT;
        } else {
          ctx!.fillStyle = col;
        }
        ctx!.beginPath();
        ctx!.arc(x, y, this.size * (0.7 + 0.5 * travelT), 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }

    const fld = Array.from({ length: 12 }, () => new FieldParticle());
    const orb = [
      new OrbitalParticle(0.00),
      new OrbitalParticle(0.38),
      new OrbitalParticle(0.68),
    ];

    let phase = Math.random() * Math.PI * 2;
    let raf = 0;

    function tick() {
      ctx!.clearRect(0, 0, cssW, cssH);
      fld.forEach((p) => { p.update(); p.draw(c.photon, phase); });
      orb.forEach((p) => p.draw(c.photon, c.wave, phase));
      drawWave(c.wave, phase);
      drawArc(c.arc);
      drawNode(c.node);
      drawPhoton(c.photon, phase);
      phase += 0.022;
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => cancelAnimationFrame(raf);
  }, [combo, mode, size]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
