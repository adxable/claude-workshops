---
description: Prepare company workshop materials from knowledge base
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - Task
---

# Workshop Preparation

Generate comprehensive workshop materials from knowledge files. Creates everything needed to deliver an engaging, interactive workshop.

## Usage

```
/workshop [knowledge file path or topic]
```

Examples:
```
/workshop knowledge/claude/agent-self-validation-with-hooks.md
/workshop "React Server Components"
```

## Workflow

1. **Find Source**: Locate knowledge file (by path or search)
2. **Gather Context**: Read the knowledge file thoroughly
3. **Determine Parameters**: Ask about duration, audience, format
4. **Generate Materials**: Create all 4 workshop files
5. **Summary**: Report what was created

## Output Structure

Creates `workshops/{topic-slug}/`:

```
workshops/{topic-slug}/
├── outline.md           # Agenda with timing
├── speaker-notes.md     # Detailed presenter guide
├── participant-guide.md # Handout for attendees
└── slides-outline.md    # Slide-by-slide content
```

## File Templates

### outline.md

```markdown
# Workshop: {Title}

## Overview

**Duration:** {X} hours
**Audience:** {Description}
**Prerequisites:**
- {Prereq 1}
- {Prereq 2}

**Learning Outcomes:**
By the end of this workshop, participants will be able to:
1. {Outcome 1}
2. {Outcome 2}
3. {Outcome 3}

---

## Agenda

| Time | Duration | Topic | Type |
|------|----------|-------|------|
| 0:00 | 15 min | Welcome and Setup | Setup |
| 0:15 | 20 min | {Topic 1} | Presentation |
| 0:35 | 30 min | Exercise 1: {Name} | Hands-on |
| 1:05 | 10 min | Break | - |
| ... | ... | ... | ... |

---

## Module 1: {Name}

### 1.1 {Section} ({duration})

**Objectives:**
- {Objective}

**Activities:**
- {Activity}

### 1.2 {Section} ({duration})
...

---

## Facilitator Notes

### Before the Workshop
- [ ] {Prep item}

### Required Setup
- {Requirement}

### Backup Plans
- **If X happens:** Do Y
```

### speaker-notes.md

```markdown
# Speaker Notes: {Title}

## Pre-Workshop Preparation

### Environment Setup (30 min before)
1. {Setup step}

### Materials Ready
- [ ] {Material}

---

## Module 1: {Name}

### 1.1 {Section} ({duration})

**[SLIDE: {Slide title}]**

"{Exact words to say}"

**Key message:**
"{Core point to emphasize}"

**Demo steps:**
1. {Step}
2. {Step}

**If asked "{common question}":**
"{Answer}"

---

## Timing Checkpoints

| Checkpoint | Should be at | If behind |
|------------|--------------|-----------|
| End Module 1 | 0:50 | Cut discussion |
| End Exercise 1 | 1:35 | Provide solution |
```

### participant-guide.md

```markdown
# Participant Guide: {Title}

## Workshop Overview

**What you'll learn:**
- {Learning 1}
- {Learning 2}

**What you'll build:**
- {Deliverable}

---

## Setup Instructions

Before the workshop, ensure you have:
- [ ] {Requirement with version}
- [ ] {Requirement}

**Verify setup:**
```bash
{verification command}
```

---

## Exercise 1: {Name}

**Objective:** {What they'll accomplish}

**Time:** {X} minutes

### Instructions

1. {Step}
2. {Step}

### Starter Code

```{language}
{code}
```

### Expected Output

{What success looks like}

### Hints

<details>
<summary>Hint 1</summary>
{Hint}
</details>

### Solution

<details>
<summary>Click to reveal solution</summary>

```{language}
{solution}
```

</details>

---

## Quick Reference

### Key Concepts

| Concept | Description |
|---------|-------------|
| {Term} | {Definition} |

### Common Commands

```bash
{useful commands}
```

---

## Resources

- [{Title}]({url})
- [{Title}]({url})

## Next Steps

After this workshop:
1. {Suggestion}
2. {Suggestion}
```

### slides-outline.md

```markdown
# Slides Outline: {Title}

## Slide 1: Title
- Workshop title
- Presenter name
- Date

## Slide 2: Agenda
- Module 1: {Name} ({time})
- Module 2: {Name} ({time})
- ...

## Slide 3: Learning Outcomes
By the end of this workshop, you will:
- {Outcome 1}
- {Outcome 2}

---

## Section: {Module Name}

### Slide N: {Title}

**Visual:** {Description of visual/diagram}

**Bullets:**
- {Point 1}
- {Point 2}
- {Point 3}

**Speaker notes:** {Brief note}

### Slide N+1: {Title}

**Code example:**
```{language}
{code}
```

**Speaker notes:** {Walkthrough}

---

## Section: Exercise 1

### Slide: Exercise Overview
- Objective: {goal}
- Time: {duration}
- Deliverable: {what they build}

### Slide: Exercise Instructions
1. {Step}
2. {Step}

---

## Section: Wrap-up

### Slide: Key Takeaways
1. {Takeaway}
2. {Takeaway}
3. {Takeaway}

### Slide: Resources & Next Steps
- {Resource}
- {Next step}

### Slide: Q&A
Questions?
```

## Guidelines

1. **Match existing format**: Look at `workshops/self-validating-agents/` for reference
2. **Realistic timing**: Don't pack too much - exercises take longer than expected
3. **Interactive > lecture**: Every 15-20 min of content should have interaction
4. **Concrete exercises**: Give exact code, exact steps, exact expected output
5. **Speaker notes are scripts**: Write what to actually say, not just topics
6. **Backup plans**: Always include "if time runs short" alternatives

## Workshop Types by Duration

| Duration | Modules | Exercises | Breaks |
|----------|---------|-----------|--------|
| 1 hour | 2-3 | 1 | 0 |
| 2 hours | 3-4 | 2 | 1 |
| Half-day (3h) | 4-5 | 2-3 | 2 |
| Full-day (6h) | 6-8 | 4-5 | 3+ lunch |

## After Completion

```
Workshop materials created in: workshops/{topic-slug}/

Files:
  - outline.md (agenda and structure)
  - speaker-notes.md (presenter script)
  - participant-guide.md (attendee handout)
  - slides-outline.md (slide content)

To present this workshop in the app:
  1. Start the dev server: pnpm dev
  2. Navigate to /dashboard/workshops
  3. Import the outline.md or create from these materials
```
