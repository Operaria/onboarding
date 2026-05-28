"use client";

/**
 * Lee un texto en voz alta usando la Web Speech API del navegador.
 * Sin dependencias ni archivos: usa la voz en español del dispositivo.
 * Pensado para familias con baja alfabetización (formulario del hogar).
 */
export function speakText(text: string): void {
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  if (!synth) return;

  // Si ya se está leyendo, cortar (toggle natural al volver a tocar).
  synth.cancel();

  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "es-CL";
  utt.rate = 0.95;
  utt.pitch = 1;

  const voices = synth.getVoices();
  const esVoice =
    voices.find((v) => v.lang?.toLowerCase().startsWith("es-cl")) ??
    voices.find((v) => v.lang?.toLowerCase().startsWith("es-419")) ??
    voices.find((v) => v.lang?.toLowerCase().startsWith("es"));
  if (esVoice) utt.voice = esVoice;

  synth.speak(utt);
}

/** Detiene cualquier lectura en curso. */
export function stopSpeaking(): void {
  if (typeof window === "undefined") return;
  window.speechSynthesis?.cancel();
}

/** ¿El navegador soporta lectura en voz alta? */
export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
