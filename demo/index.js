var canvas   = document.body.appendChild(document.createElement('canvas'))
var gl       = require('gl-context')(canvas, render)
var triangle = require('a-big-triangle')
var Shader   = require('gl-shader')
var glslify  = require('glslify')
var Analyser = require('../')

var audio    = new Audio
var analyser = Analyser(gl, audio)
var shader   = Shader(gl,
  glslify('./index.vert'),
  glslify('./index.frag')
)

require('soundcloud-badge')({
    client_id: 'ded451c6d8f9ff1c62f72523f49dab68'
  , song: 'https://soundcloud.com/colo_uk/holidays-1'
  , dark: false
  , getFonts: true
}, function(err, src, json, div) {
  if (err) throw err
  audio.crossOrigin = 'Anonymous'
  audio.src  = src
  audio.loop = true
  audio.addEventListener('canplay', function() {
    audio.play()
  }, false)
})

function render() {
  var width  = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  gl.viewport(0, 0, width, height)

  shader.bind()
  shader.uniforms.uWaveform   = analyser.bindWaveform(0)
  shader.uniforms.uResolution = [width, height]

  triangle(gl)
}

window.addEventListener('resize'
  , require('canvas-fit')(canvas)
  , false
)
