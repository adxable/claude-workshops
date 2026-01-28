# Plan: Fix Workshop Dashboard - Verify Claude CLI Connection & Workshop Display

**Type:** Bug Fix
**Created:** 2026-01-21

## Goal

Make the workshops dashboard at http://localhost:5173/dashboard/workshops fully functional so that:
1. Workshops can be generated via Claude CLI and display content
2. Existing workshops are properly displayed in the list
3. Users can view and interact with generated workshops

## Research Findings

### Current Architecture

| Component | Location | Purpose |
|-----------|----------|---------|
| `WorkshopTab.tsx` | `src/components/workshop/` | Main container, WebSocket handler |
| `WorkshopInput.tsx` | `src/components/workshop/` | Generation/import UI |
| `WorkshopList.tsx` | `src/components/workshop/` | Grid of workshops |
| `WorkshopViewer.tsx` | `src/components/workshop/` | Playback viewer |
| `workshop-store.ts` | `src/data/` | localStorage CRUD |
| `workshop-parser.ts` | `src/lib/` | Markdown → Workshop |
| `index.js` | `server/` | WebSocket server + Claude CLI integration |
| `workshop-agent.js` | `server/` | Prompt building & validation |

### Verified Working

1. **Server is running** on port 3001 (WebSocket server)
2. **Claude CLI is installed** at `~/.local/bin/claude` (version 2.1.14)
3. **Claude CLI responds** to prompts via stdin

### Data Flow for Workshop Generation

```
User Input → WorkshopInput → WebSocket (workshop_generate)
                                ↓
                      Server builds prompt
                                ↓
                      Spawns: claude --print --dangerously-skip-permissions
                                ↓
                      Claude generates JSON
                                ↓
                      parseWorkshopResponse() validates
                                ↓
                      workshop_generated → Client saves to localStorage
                                ↓
                      Navigate to /workshop/:id
```

### Potential Issues Identified

1. **Empty Workshop Issue**: When a workshop is generated but appears empty, it could be:
   - Claude returning invalid/empty JSON
   - JSON parsing failing silently
   - Workshop sections not being properly saved
   - Navigation to viewer happening before save completes

2. **WebSocket Connection**: The client reconnects on disconnect but may miss messages during reconnection

3. **localStorage Race Condition**: Workshop is saved and navigation happens in sequence, but React state may not be updated

## Approach

1. **Add diagnostic logging** to trace the workshop generation flow
2. **Test the import mode first** (doesn't require Claude) to verify the display pipeline works
3. **Test the generation mode** with a sample transcript
4. **Fix any issues** found during testing

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `server/index.js` | Verify/Debug | Check workshop generation handler |
| `server/workshop-agent.js` | Verify/Debug | Check prompt & response parsing |
| `src/components/workshop/WorkshopTab.tsx` | Verify/Debug | Check WebSocket message handling |
| `src/components/workshop/WorkshopViewer.tsx` | Verify | Check workshop loading |

## Implementation Steps

1. **Test Import Mode (No Claude Required)**
   - Go to http://localhost:5173/dashboard/workshops/new
   - Paste a sample markdown workshop plan
   - Verify it imports and displays correctly

2. **Test Generation Mode**
   - Paste a sample transcript
   - Observe WebSocket messages and server logs
   - Verify Claude returns valid JSON
   - Verify workshop saves to localStorage

3. **Debug Path if Issues Found**
   - Add console.log at key points in the data flow
   - Check server output for Claude response
   - Verify JSON structure matches expected schema

4. **Common Fixes**
   - If JSON parsing fails: Improve response extraction
   - If sections empty: Check section type detection
   - If viewer shows nothing: Check localStorage retrieval

## Verification

- [ ] Import mode creates workshop with sections
- [ ] Generate mode connects to Claude CLI
- [ ] Generated workshop has content in sections
- [ ] Workshop list shows all workshops
- [ ] Workshop viewer displays content
- [ ] Quizzes/exercises are interactive

## Test Data

### Sample Import (Markdown)
```markdown
# Workshop: Introduction to Testing

## Section 1: Introduction

### Slide 1: Welcome
- Testing is essential for software quality
- We'll cover unit tests, integration tests, and E2E tests

### Slide 2: Quiz - Knowledge Check
What is the purpose of unit testing?

### Slide 3: Exercise - Write Your First Test
Write a simple test for a function that adds two numbers.
```

### Sample Transcript for Generation
```
Hello and welcome to this video about JavaScript testing.
Today we're going to learn about the fundamentals of testing.
Testing is crucial for building reliable software...
```
