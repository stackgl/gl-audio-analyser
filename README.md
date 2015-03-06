# gl-audio-analyser

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Pull audio waveform/frequency data into WebGL for realtime audio visualisation!

This is a wrapper around the more generic/flexible [web-audio-analyser](http://github.com/hughsk/web-audio-analyser) that makes it easier to just drop into a new WebGL project and get up and running quickly.

## Browser Usage

[![NPM](https://nodei.co/npm/gl-audio-analyser.png)](https://nodei.co/npm/gl-audio-analyser/)

You can pull `gl-audio-analyser` into your project using [browserify](http://browserify.org).

See [`demo/index.js`](demo/index.js) for a full usage example.

### `analyser = require('gl-audio-analyser')(gl, audio, [ctx])`

Creates a new audio analyser given the following arguments:

* `gl` is the WebGL context you want to use.
* `audio` is an audio node to analyse, be that an `<audio>` tag,
  `MediaStream` or `AudioSourceNode`.
* `ctx` is an (optional) `AudioContext` instance to use.
  Note however there may only be one instance of this per page,
  and if not supplied one will be created for you.

Once created, you should then bind the waveform and/or frequency
textures once per frame:

### `analyser.bindWaveform([index])`

Uploads the audio's waveform data to a specific texture `index`, which defaults to 0, returning the bound GL texture index.

### `analyser.bindFrequencies([index])`

Uploads the audio's frequency data to a specific texture `index`, which defaults to 0, returning the bound GL texture index.

## GLSL Usage

You can then read the audio data from a texture. For your convenience,
this module can also be used with
[glslify](http://github.com/stackgl/glslify), though the [GLSL module
source](index.glsl) is relatively short.

See [`demo/index.frag`](demo/index.frag) for an example.

### `analyse(sampler2D texture, float audioIndex)`

``` glsl
uniform sampler2D audioTexture;

#pragma glslify: analyse = require(gl-audio-analyser)

void main() {
  float amplitude = analyse(audioTexture);

  gl_FragColor = vec4(vec3(amplitude), 1.0);
}
```

## Contributing

See [stackgl/contributing](https://github.com/stackgl/contributing) for details.

## License

MIT. See [LICENSE.md](http://github.com/stackgl/gl-audio-analyser/blob/master/LICENSE.md) for details.
