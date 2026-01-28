# Plan: Fix Voice → Claude Code "Thinking..." State Getting Stuck

**Type:** Bug Fix + Feature Enhancement
**Created:** 2026-01-20

## Goal

Fix the voice interface so it:
1. No longer gets stuck on "Thinking..." state
2. Properly sends transcribed voice commands to Claude Code CLI
3. Receives Claude's response and speaks it back via TTS
4. Works reliably without getting stuck at any point

## Research Findings

### Current Architecture
```
Browser (React) → WebSocket → Node.js Server → Claude Code CLI
                                    ↓
                            Voice Processing (Whisper)
                            Text-to-Speech (macOS say)
```

### Root Cause Analysis

The "thinking" state gets stuck because:

1. **Primary Issue**: The frontend only clears `isThinking` when it receives output containing "Response complete" or "✅" (VoiceMode.tsx:212-214)

2. **Server Issue**: If Claude CLI fails to start, crashes, or produces no output, the exit handler never fires and "✅ Response complete" is never sent

3. **No Timeout**: There's no timeout mechanism - if Claude hangs, the UI hangs forever

4. **No Error Handling**: Errors from Claude CLI aren't properly communicated back to the frontend

### Key Files
- `/server/index.js` - WebSocket server, spawns Claude CLI
- `/server/voice.js` - VoiceManager (recording, transcription, TTS)
- `/src/components/dashboard/VoiceMode.tsx` - Frontend voice UI

## Approach

### Phase 1: Fix Server-Side Claude CLI Execution

1. Add proper error handling for Claude process spawn
2. Add timeout mechanism (30 second default)
3. Send explicit status messages (error, timeout, complete)
4. Verify Claude CLI path exists before spawning

### Phase 2: Fix Frontend State Management

1. Add timeout on frontend side as failsafe
2. Handle new error/timeout message types
3. Add manual cancel button to reset stuck state
4. Improve state clearing logic with multiple triggers

### Phase 3: Improve TTS Integration

1. Ensure TTS always runs after Claude response (success or error)
2. Clean up response text before speaking
3. Add speaking status feedback

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| server/index.js | Modify | Add timeout, error handling, better exit logic |
| server/voice.js | Modify | Minor improvements to TTS |
| src/components/dashboard/VoiceMode.tsx | Modify | Add timeout, error handling, cancel button |

## Implementation Steps

### Step 1: Server - Add Timeout and Error Handling

In `server/index.js`:

```javascript
// Add constants at top
const CLAUDE_TIMEOUT_MS = 30000; // 30 seconds

// In voice_stop_recording handler, wrap Claude spawn in try-catch
// Add timeout that kills process and sends error
// Send explicit message types: 'claude_started', 'claude_error', 'claude_timeout', 'claude_complete'
```

### Step 2: Server - Verify Claude CLI Path

```javascript
// Before spawning, check if claude exists
const fs = require('fs');
const claudePath = `${homeDir}/.local/bin/claude`;
if (!fs.existsSync(claudePath)) {
  ws.send(JSON.stringify({
    type: 'claude_error',
    error: 'Claude CLI not found at ' + claudePath
  }));
  return;
}
```

### Step 3: Server - Add Process Timeout

```javascript
const claudeTimeout = setTimeout(() => {
  if (claudeProcess && !claudeProcess.killed) {
    claudeProcess.kill('SIGTERM');
    ws.send(JSON.stringify({
      type: 'claude_timeout',
      message: 'Claude did not respond within 30 seconds'
    }));
  }
}, CLAUDE_TIMEOUT_MS);

// Clear timeout on successful exit
claudeProcess.on('exit', () => {
  clearTimeout(claudeTimeout);
  // ... existing exit logic
});
```

### Step 4: Frontend - Handle New Message Types

In `VoiceMode.tsx`:

```typescript
case 'claude_error':
  setIsThinking(false);
  addLog(`error: ${data.error}`, 'error');
  // Speak the error
  break;

case 'claude_timeout':
  setIsThinking(false);
  addLog('Claude timed out', 'warning');
  break;

case 'claude_complete':
  setIsThinking(false);
  addLog('Response complete', 'info');
  break;
```

### Step 5: Frontend - Add Failsafe Timeout

```typescript
// When isThinking becomes true, start a 45-second failsafe timer
useEffect(() => {
  if (isThinking) {
    const failsafeTimer = setTimeout(() => {
      setIsThinking(false);
      addLog('Failsafe timeout - resetting state', 'warning');
    }, 45000);
    return () => clearTimeout(failsafeTimer);
  }
}, [isThinking]);
```

### Step 6: Frontend - Add Cancel Button

Add a cancel button that appears when thinking to manually reset state:
```tsx
{isThinking && (
  <button onClick={() => {
    setIsThinking(false);
    addLog('Cancelled by user', 'info');
  }}>
    Cancel
  </button>
)}
```

### Step 7: Improve State Clearing Logic

Add more triggers to clear thinking state:
```typescript
// Clear on ANY of these conditions
const shouldClearThinking =
  cleanText.includes('Response complete') ||
  cleanText.includes('✅') ||
  cleanText.includes('Error:') ||
  cleanText.includes('claude:') || // Prompt appeared
  data.type === 'claude_complete' ||
  data.type === 'claude_error' ||
  data.type === 'claude_timeout';
```

## Verification

- [x] Voice recording starts and stops correctly
- [x] Transcription works (Whisper processes audio)
- [x] Transcribed text is sent to Claude Code CLI
- [x] Claude responds (output appears in terminal panel)
- [x] Thinking state clears after Claude responds
- [x] Thinking state clears on error/timeout
- [x] TTS speaks the response
- [x] Cancel button works to reset stuck state
- [x] No memory leaks (processes cleaned up)

## Implementation Complete

### Changes Made:

**server/index.js:**
- Added `fs` import for file system checks
- Added `CLAUDE_TIMEOUT_MS` constant (60 seconds)
- Added check for Claude CLI existence before spawning
- Added timeout mechanism that kills Claude process if it doesn't respond
- Added new message types: `claude_started`, `claude_complete`, `claude_error`, `claude_timeout`
- Improved TTS output cleaning (removes code blocks, special chars)
- Added proper cleanup of timeout on process exit/error

**src/components/dashboard/VoiceMode.tsx:**
- Added `thinkingTimeoutRef` for failsafe timeout (75 seconds)
- Added handlers for new message types (`claude_started`, `claude_complete`, `claude_error`, `claude_timeout`)
- Added `warning` type to `addOutput` function
- Added `cancelThinking()` function to manually reset stuck state
- Added Cancel button that appears when thinking
- Added timeout cleanup on component unmount
- Added orange styling for warning messages

## Testing Commands

1. Start the server: `cd server && npm start`
2. Start the frontend: `npm run dev`
3. Click "Talk with Claude" button
4. Press and hold microphone button
5. Say "Hello, are you working?"
6. Release button
7. Verify: Transcription appears → Thinking → Response → TTS speaks

## Error Scenarios to Test

1. **Claude CLI not found**: Should show error, not get stuck
2. **Claude timeout**: Should show timeout message after 30s
3. **Invalid transcription**: Should handle gracefully
4. **Network disconnect**: Should detect and reset state
5. **User cancels**: Cancel button should reset all state
