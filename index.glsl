float glAudioAnalyser(sampler2D audioData, float audioIndex) {
  return texture2D(audioData, vec2(audioIndex, 0.5)).r;
}

#pragma glslify: export(glAudioAnalyser)
