# Plan: Voice Feature Improvements

**Type:** Feature Enhancement
**Created:** 2026-01-21

## Goal

Improve the voice feature with three key changes:
1. Change from press-and-hold to click-to-start/click-to-stop flow
2. Add a text input field for additional context to send with voice
3. Speed up processing and resolve voice cutting issues

## Research Findings

### Current Architecture
- **Frontend**: `src/components/dashboard/VoiceMode.tsx` (928 lines) - React component with press-and-hold interaction
- **Server**: `server/voice.js` - VoiceManager class handling SoX recording + Whisper transcription
- **WebSocket Server**: `server/index.js` - Message routing, Claude CLI integration

### Current UI Flow
- Press-and-hold on mic button starts/stops recording
- `onMouseDown` → `voice_start_recording`
- `onMouseUp` / `onMouseLeave` → `voice_stop_recording`
- No text input exists currently

### Audio Pipeline
```
SoX (16kHz, mono) → WAV file → Whisper.cpp → Text → Claude CLI → TTS
```

### Identified Issues
1. **Voice cutting**: SoX process killed with SIGINT - can truncate final audio
2. **No graceful stop**: Recording ends abruptly on mouse release
3. **No buffer time**: No delay between stop signal and file read
4. **Single interaction mode**: No way to add text context to voice

## Approach

### 1. Click-to-Toggle Recording Flow
- Change button from press-and-hold to click toggle
- First click: Start recording (red indicator, "Recording...")
- Second click: Stop recording and submit (transition to processing)
- Add clear visual state for "recording active"
- Update button text/icon based on state

### 2. Text Context Input
- Add a textarea below the mic button for optional text context
- Placeholder: "Add additional context (optional)"
- Combine text input with voice transcription before sending to Claude
- Format: `[Voice]: {transcription}\n[Context]: {text}` or just transcription if no text

### 3. Speed & Reliability Improvements
- Add 200ms buffer after stopping SoX before reading WAV file
- Use `SIGTERM` instead of `SIGINT` for cleaner process termination
- Add recording duration indicator to help users
- Increase file read retries from 1 to 3 with exponential backoff
- Consider streaming audio instead of file-based approach (future)

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/components/dashboard/VoiceMode.tsx` | Modify | Change to click-toggle flow, add text input |
| `server/voice.js` | Modify | Improve recording stop handling, add buffer time |
| `server/index.js` | Modify | Handle combined voice + text context messages |

## Implementation Steps

### Phase 1: Click-to-Toggle Flow (Frontend)

1. **Update state management in VoiceMode.tsx**
   - Add `isRecordingActive` boolean state (separate from `isRecording` which tracks process state)
   - Change button handlers from `onMouseDown/Up` to single `onClick`

2. **Update button behavior**
   - First click when idle: Call `startRecording()`, set `isRecordingActive: true`
   - Second click when recording: Call `stopRecording()`, set `isRecordingActive: false`
   - Update button text: "Click to Start" → "Click to Stop & Send"

3. **Update visual feedback**
   - Keep pulsing red indicator during recording
   - Add recording duration timer display
   - Change button icon from Mic to MicOff when recording

### Phase 2: Text Context Input (Frontend + Backend)

4. **Add text input component in VoiceMode.tsx**
   - Add textarea state: `textContext: string`
   - Place textarea below mic button, above terminal
   - Style consistently with existing UI (dark theme)
   - Clear text input after successful submission

5. **Update WebSocket message in VoiceMode.tsx**
   - Include `textContext` in `voice_stop_recording` message
   - `ws.send({ type: 'voice_stop_recording', textContext })`

6. **Update server handling in index.js**
   - Parse `textContext` from message
   - Combine with transcription: prepend or append context
   - Format combined prompt for Claude

### Phase 3: Speed & Reliability (Backend)

7. **Improve stopRecording in voice.js**
   - Change from `SIGINT` to `SIGTERM` for cleaner termination
   - Add 300ms delay after process termination before reading file
   - Add retry logic (3 attempts, 100ms → 200ms → 400ms delays)
   - Add file existence and size validation

8. **Add recording metadata**
   - Track recording start time
   - Send recording duration to frontend
   - Add max recording duration (e.g., 5 minutes) with auto-stop

## API Changes

### WebSocket Messages

**Modified: voice_stop_recording (Client → Server)**
```typescript
{
  type: 'voice_stop_recording',
  textContext?: string  // NEW: Optional additional context
}
```

**Modified: voice_transcription (Server → Client)**
```typescript
{
  type: 'voice_transcription',
  transcription: string,
  duration?: number,    // NEW: Recording duration in seconds
  success: boolean
}
```

## UI Mockup

```
┌─────────────────────────────────────────┐
│                                         │
│            [🎤 Click to Start]          │  ← Toggle button
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ Add context (optional)...       │   │  ← NEW: Text input
│   │                                 │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ > Terminal output...            │   │
│   │ > ...                           │   │
│   └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

When recording:
```
┌─────────────────────────────────────────┐
│                                         │
│   ●REC 0:05  [🛑 Click to Stop & Send]  │  ← Red pulsing, timer
│                                         │
│   ████████████████████░░░░░░░░░░░░░░░░  │  ← Audio visualizer
│                                         │
```

## Verification

- [ ] Type check passes (`npm run typecheck` or `tsc --noEmit`)
- [ ] Lint passes (`npm run lint`)
- [ ] Build passes (`npm run build`)
- [ ] Click-to-start initiates recording
- [ ] Click-to-stop stops recording and triggers transcription
- [ ] Text context is sent with voice transcription
- [ ] Voice recording doesn't cut off prematurely
- [ ] Recording duration is displayed
- [ ] UI states transition smoothly

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Breaking existing press-and-hold users | Clear visual cues for new interaction |
| Text context makes prompts too long | Character limit on text input (500 chars) |
| SoX process doesn't terminate cleanly | Add timeout for forced kill after 1s |
| File not ready after recording | Retry logic with exponential backoff |

## Future Considerations

- Stream audio directly to Whisper instead of file-based
- Add voice activity detection (auto-stop on silence)
- Support for multiple audio input devices
- Waveform recording preview before submission
