# Shader Magic 2026

A minimal WebGL2 fullscreen demo engine (ShaderToy-like) built with TypeScript and Vite. Pure WebGL2, no frameworks - just shaders and canvas.

## Features

- **Pure WebGL2**: No Three.js or other frameworks
- **Fullscreen Triangle**: Efficient fullscreen rendering
- **GLSL ES 3.00**: Modern shader language
- **TypeScript**: Type-safe development
- **ShaderToy-like**: Simple shader-focused architecture
- **Audio System**: Web Audio API with frequency analysis and beat detection
- **Timeline System**: Part-based demo progression with fade in/out

## Tech Stack

- **Vite**: Fast build tool and dev server
- **TypeScript**: Type-safe JavaScript
- **WebGL2**: Modern graphics API
- **GLSL ES 3.00**: Shader language

## Project Structure

```
src/
├── main.ts              # Application entry point, WebGL2 initialization, render loop
├── gl.ts                # WebGL2 helper functions (compileShader, linkProgram, uniforms, etc.)
├── timeline.ts          # Timeline/cue system with parts and fade transitions
├── audio.ts             # Web Audio API system with frequency analysis and beat detection
└── shaders/
    ├── main.vert        # Pass-through vertex shader for fullscreen triangle
    └── main.frag        # Fragment shader with audio-reactive uniforms
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The dev server will start on `http://localhost:3000`

## Build

```bash
npm run build
```

## Controls

- **Click Canvas**: Start audio + demo (user gesture required for autoplay)
- **Spacebar**: Toggle pause
- **ESC**: Stop audio
- **H**: Toggle debug overlay

## Architecture

### Fullscreen Triangle

The engine uses a fullscreen triangle instead of a quad for efficiency. The triangle vertices are:
- Bottom left: `(-1, -1)`
- Bottom right: `(3, -1)` (extends beyond screen)
- Top left: `(-1, 3)` (extends beyond screen)

This covers the entire screen in clip space and is more efficient than a quad.

### Shader Loading

Shaders are imported using Vite's `?raw` import syntax:
```typescript
import fragmentShaderSource from './shaders/main.frag?raw';
```

### Uniform Helpers

The `gl.ts` file provides helper functions for setting uniforms:
- `setUniform1f`, `setUniform2f`, `setUniform3f`, `setUniform4f`
- `setUniform2fv` for vec2 arrays
- `setUniform1i` for integers

### Audio System

The audio system (`src/audio.ts`) provides:
- **Frequency Analysis**: Bass (20-120Hz), Mid (120-1000Hz), High (1k-8kHz)
- **Beat Detection**: Smoothed envelope peak detection from bass frequencies
- **Autoplay Handling**: Requires user gesture (canvas click) to start

Place `music.ogg` in the `public/` directory. The system will run silently if the file is missing.

### Shader Uniforms

Available uniforms in fragment shaders:
- `uTime` (float): Global demo time in seconds
- `uResolution` (vec2): Canvas resolution
- `uPart` (int): Current timeline part index
- `uPartT` (float): Local time within part (0..1)
- `uFade` (float): Fade factor (0..1)
- `uBass` (float): Bass frequency level (0..1)
- `uMid` (float): Mid frequency level (0..1)
- `uHigh` (float): High frequency level (0..1)
- `uBeat` (float): Beat detection value (0..1)

## License

MIT
