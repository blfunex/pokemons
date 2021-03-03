import { useCallback, useEffect, useState } from "react";

export default function useSpeechSynthesis(
  pitch: number = 1,
  rate: number = 1
) {
  const synth = window.speechSynthesis;

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const [names, setNames] = useState<string[]>([]);

  const [selected, setSelectedVoice] = useState(-1);

  useEffect(() => {
    if (!synth) return;

    const voices = synth
      .getVoices()
      .filter(voice => voice.lang === "en")
      .sort(function (a, b) {
        const aname = a.name.toUpperCase(),
          bname = b.name.toUpperCase();
        if (aname < bname) return -1;
        else if (aname === bname) return 0;
        else return +1;
      });

    setVoices(voices);

    setNames(voices.map(voice => voice.name));

    if (voices.length > 0) setSelectedVoice(0);
  }, [synth]);

  const speak = useCallback(
    function speak(text: string) {
      if (!synth || selected < 0) return;

      synth.cancel();

      const voice = voices[selected];
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;

      synth.speak(utterance);
    },
    [pitch, rate, selected, synth, voices]
  );

  const select = useCallback(
    function select(name: string) {
      setSelectedVoice(voices.findIndex(voice => voice.name === name));
    },
    [voices]
  );

  return [speak, select, names] as const;
}
