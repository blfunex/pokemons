import { useCallback, useEffect, useState } from "react";

// Inspired by https://mdn.github.io/web-speech-api/speak-easy-synthesis/

const synth = window.speechSynthesis;

const voices = synth
  ? synth
      .getVoices()
      .filter(voice => voice.lang === "en-US")
      .sort(function (a, b) {
        const an = a.name.toUpperCase(),
          bn = b.name.toUpperCase();
        if (an < bn) return -1;
        else if (an === bn) return 0;
        else return +1;
      })
  : [];

function attemptToGetPreferredVoice() {
  const index = voices.findIndex(voice => voice.name.indexOf("Mark") >= 0);
  return index < 0 ? 0 : index;
}

const names = voices.map(voice => voice.name);

let selected = voices.length > 0 ? attemptToGetPreferredVoice() : -1;

console.log(...names, "\nSelected", names[selected]);

export function useSpeechSynthesisVoiceOptions() {
  const [toggle, refresh] = useState(false);

  const select = useCallback(
    function selectSpeechSynthesisVoice(name: string) {
      const previous = selected;
      selected = voices.findIndex(voice => voice.name === name);
      if (selected !== previous) refresh(!toggle);
    },
    [toggle]
  );

  return [names, names[selected] || "", select] as const;
}

export default function useSpeechSynthesis(
  enabled = true,
  pitch: number = 1,
  rate: number = 1
) {
  useEffect(() => {
    if (!enabled) synth?.cancel();
  }, [enabled]);

  const cancel = useCallback(function cancelTextUtterance() {
    if (!synth) return;
    synth?.cancel();
  }, []);

  const speak = useCallback(
    function speakTextUtterance(text: string) {
      if (!synth) return;

      synth?.cancel();

      if (!enabled) return;

      const utterance = new SpeechSynthesisUtterance(text);

      if (selected >= 0) utterance.voice = voices[selected];

      utterance.pitch = pitch;
      utterance.lang = "en-US";
      utterance.rate = rate;

      synth.speak(utterance);
    },
    [enabled, pitch, rate]
  );

  return [speak, cancel] as const;
}
