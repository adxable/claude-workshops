# Voice Terminal Development Plan

## Priority 1 - Core Dependencies
- [ ] Install SoX for audio recording (brew install sox)
- [ ] Clone whisper.cpp from GitHub
- [ ] Build whisper.cpp with make
- [ ] Download whisper base.en model

## Priority 2 - Voice Processing Backend
- [ ] Create voice module in server/voice.js
- [ ] Implement audio recording with SoX
- [ ] Implement whisper.cpp integration for STT
- [ ] Implement macOS TTS with `say` command
- [ ] Add WebSocket endpoints for voice

## Priority 3 - Frontend UI
- [ ] Create VoiceMode component
- [ ] Add microphone button with press-to-talk
- [ ] Add voice waveform visualization
- [ ] Add transcription display
- [ ] Add voice selection dropdown
- [ ] Add animations for speaking/thinking states

## Priority 4 - Demo Features
- [ ] Add fun voice responses
- [ ] Add sound effects
- [ ] Add dramatic pauses
- [ ] Test with actual Claude Code integration

## Priority 5 - Polish & Testing
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Error handling
- [ ] Final polish for presentation

## Completed
(Items move here when done)
