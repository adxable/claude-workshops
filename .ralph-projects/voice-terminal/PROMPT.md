# Voice Terminal Feature - Talk with Claude Code!

## Overview
Implement a speech-to-text and text-to-speech system that allows users to have voice conversations with their terminal. This is for a Claude workshop presentation to 500 people - it needs to be impressive, entertaining, and work reliably!

## Technical Requirements

### 1. Speech-to-Text (Using whisper.cpp)
- Clone and build whisper.cpp from https://github.com/ggml-org/whisper.cpp
- Download the base.en model for fast, accurate English transcription
- Create a Node.js wrapper that:
  - Records audio from microphone using SoX (install via homebrew)
  - Processes audio through whisper.cpp
  - Returns transcribed text

### 2. Text-to-Speech
- Use macOS built-in `say` command for TTS
- Support multiple voices (Samantha, Alex, Victoria for variety/comedy)
- Allow voice selection in the UI

### 3. Server Integration
- Extend the existing WebSocket server at `server/index.js`
- Add endpoints for:
  - `/voice/record` - Start recording
  - `/voice/stop` - Stop recording and get transcription
  - `/voice/speak` - Speak text using TTS
- Stream transcription events in real-time

### 4. Frontend UI
- Add a new "Voice Mode" tab in the Dashboard
- Include:
  - Large microphone button (press and hold to talk)
  - Voice waveform visualization during recording
  - Text display of what was said
  - Voice selection dropdown
  - Fun animations for when Claude is "thinking" or "speaking"

### 5. Demo Features for Workshop
- Easter eggs: funny responses for specific phrases
- "Claude, tell me a programming joke"
- Voice confirmation sounds
- Dramatic pause before responses
- Show real-time transcription as user speaks

## Implementation Steps
1. Install dependencies: whisper.cpp, SoX (sox), node packages
2. Build whisper.cpp and download model
3. Create voice recording/processing module
4. Extend WebSocket server with voice endpoints
5. Create React components for voice UI
6. Add fun animations and sound effects
7. Test end-to-end flow
8. Add demo features and polish

## Success Criteria
- [ ] Can record voice and see real-time transcription
- [ ] Can hear Claude's responses spoken aloud
- [ ] Works smoothly without crashes
- [ ] UI is visually impressive for presentation
- [ ] Has at least 2-3 fun/funny demo features
- [ ] Voice mode integrates seamlessly with terminal

## EXIT_SIGNAL Conditions
Set EXIT_SIGNAL: true when:
- Voice recording and transcription working
- TTS working with voice selection
- UI complete with animations
- All success criteria met
- No blocking errors

## Current Status
Starting fresh - no work completed yet.
