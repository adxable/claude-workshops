# Plan: Fix AI Voice Integration with Claude API

**Type:** Bug Fix / Feature Enhancement
**Created:** 2026-01-18

## Goal

Fix the AI voice integration so that when the user asks a question with their voice, it is:
1. Transcribed (already working via whisper.cpp)
2. Sent to the Claude API (NOT WORKING - currently uses hardcoded easter eggs)
3. Response returned to the app and spoken back (TTS already works)

## Research Findings

### Current State
- **Voice recording**: Working (sox → whisper.cpp)
- **Transcription**: Working (whisper.cpp local transcription)
- **Claude Integration**: BROKEN - Uses hardcoded "easter egg" responses instead of actual API calls
- **Text-to-speech**: Working (macOS `say` command)

### Root Cause
The system does NOT call the Anthropic Claude API. Instead:
1. Easter eggs match transcription text → return hardcoded responses
2. If Claude Code CLI is running, text is piped to its stdin (but this is for terminal, not voice mode)

### Relevant Files

| File | Purpose |
|------|---------|
| `/server/index.js:110-140` | WebSocket message handler - routes `voice_stop_recording` |
| `/server/voice.js:200-240` | `checkEasterEgg()` - currently bypasses real AI |
| `/server/voice.js` | VoiceManager class - needs `askClaude()` method |
| `/src/components/dashboard/VoiceMode.tsx:180-220` | Frontend handler for transcription results |
| `/server/package.json` | Missing `@anthropic-ai/sdk` dependency |

## Approach

Replace the easter egg system with actual Claude API calls:
1. Add `@anthropic-ai/sdk` to server dependencies
2. Create `.env` file for API key
3. Add `askClaude()` method to VoiceManager
4. Update message handler to call Claude API instead of easter eggs
5. Stream or return Claude's response to frontend
6. Frontend speaks the response via existing TTS

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `/server/package.json` | Modify | Add `@anthropic-ai/sdk` and `dotenv` dependencies |
| `/server/.env` | Create | Store `ANTHROPIC_API_KEY` |
| `/server/.env.example` | Create | Template for API key (safe to commit) |
| `/server/claude.js` | Create | Claude API integration module |
| `/server/index.js` | Modify | Import claude module, update message handler |
| `/server/voice.js` | Modify | Add `askClaude()` integration, keep easter eggs as fallback |
| `/src/components/dashboard/VoiceMode.tsx` | Modify | Handle new `voice_claude_response` message type |
| `/.gitignore` | Modify | Ensure `.env` is ignored |

## Implementation Steps

### Step 1: Add Dependencies
```bash
cd server && npm install @anthropic-ai/sdk dotenv
```

### Step 2: Create Environment Configuration
Create `/server/.env`:
```
ANTHROPIC_API_KEY=your-api-key-here
```

Create `/server/.env.example`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

### Step 3: Create Claude API Module (`/server/claude.js`)
```javascript
import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function askClaude(userMessage, onStream = null) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: userMessage,
      },
    ],
    system: 'You are a helpful voice assistant. Keep responses concise and conversational since they will be spoken aloud. Aim for 1-3 sentences unless more detail is needed.',
  });

  return response.content[0].text;
}
```

### Step 4: Update Server Message Handler (`/server/index.js`)
In the `voice_stop_recording` case:
```javascript
// After transcription succeeds:
const transcription = result.transcription;

// Check for easter egg first (optional - can keep for fun)
const easterEgg = voiceManager.checkEasterEgg(transcription);
if (easterEgg) {
  // Handle easter egg...
} else {
  // NEW: Call Claude API
  try {
    ws.send(JSON.stringify({ type: 'voice_processing', message: 'Thinking...' }));
    const claudeResponse = await askClaude(transcription);
    ws.send(JSON.stringify({
      type: 'voice_claude_response',
      question: transcription,
      response: claudeResponse
    }));
    // Auto-speak the response
    await voiceManager.speak(claudeResponse);
    ws.send(JSON.stringify({ type: 'voice_speaking_done' }));
  } catch (error) {
    ws.send(JSON.stringify({
      type: 'voice_error',
      error: `Claude API error: ${error.message}`
    }));
  }
}
```

### Step 5: Update Frontend (`VoiceMode.tsx`)
Add handler for new message type:
```typescript
case 'voice_processing':
  setIsProcessing(true);
  addMessage('system', data.message || 'Processing...');
  break;

case 'voice_claude_response':
  setIsProcessing(false);
  addMessage('user', data.question);
  addMessage('assistant', data.response);  // Need to add 'assistant' type
  break;

case 'voice_error':
  setIsProcessing(false);
  addMessage('system', `Error: ${data.error}`);
  break;
```

### Step 6: Update .gitignore
```
# Environment files
.env
server/.env
```

## Verification

- [ ] `ANTHROPIC_API_KEY` is set in `.env`
- [ ] Server starts without errors
- [ ] Voice recording works (press & hold microphone)
- [ ] Transcription appears in UI
- [ ] Claude API is called (check server logs)
- [ ] Claude's response appears in UI
- [ ] Response is spoken via TTS
- [ ] Type check passes: `npm run typecheck` or `npx tsc --noEmit`
- [ ] Build passes: `npm run build`

## Edge Cases to Handle

1. **No API key**: Show helpful error message, fall back to easter eggs
2. **API rate limit**: Queue requests or show "please wait" message
3. **Network error**: Graceful error message, retry option
4. **Empty transcription**: Don't call API, show "I didn't catch that"
5. **Long response**: Consider truncating for TTS or splitting into chunks

## Alternative Approaches Considered

1. **Use Claude Code CLI directly**: Already exists but not designed for voice Q&A flow
2. **Use streaming API**: More responsive but adds complexity (nice-to-have later)
3. **Add conversation context**: Store history for follow-up questions (nice-to-have later)

## Rollback Plan

If issues arise, the easter egg system remains functional. The implementation adds new code paths without removing existing functionality.
