precision mediump float;

uniform sampler2D uWaveform;
uniform vec2 uResolution;

#pragma glslify: audio = require(../)

void main() {
  float amplitude = audio(uWaveform, gl_FragCoord.x / uResolution.x) * 3.;

  vec3 color = vec3(0.);

  color += max(0., +amplitude) * vec3(0.5, 1.0, 0.2);
  color += max(0., -amplitude) * vec3(0.9, 0.1, 0.4);

  gl_FragColor = vec4(color, 1.0);
}
