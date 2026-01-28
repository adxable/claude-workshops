---
description: Condense a YouTube transcript into key learnings
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - Task
---

# Condense Transcript

Transform a YouTube transcript or text content into a structured knowledge file for workshop preparation.

## Usage

```
/condense [paste transcript or provide context]
```

## Workflow

1. **Get Input**: User pastes transcript or describes source
2. **Determine Category**: Ask user or infer from content (claude, react, typescript, general, etc.)
3. **Generate Slug**: Create kebab-case filename from topic
4. **Write Knowledge File**: Create `knowledge/{category}/{slug}.md`

## Output Format

Create a knowledge file with this structure:

```markdown
# {Title}

**Source:** {URL if provided}
**Date Condensed:** {today's date}
**Category:** {category}
**Duration:** {approximate duration if known}
**Speaker:** {speaker name if known}
**Difficulty:** {beginner|intermediate|advanced}

## TL;DR

{2-3 sentence summary of the core message}

## Key Topics

### 1. {First Major Topic}

{Detailed explanation of this topic}

**Key Point:** {One-liner takeaway}

**Code Example:** (if applicable)
```{language}
{relevant code snippet}
```

### 2. {Second Major Topic}
{Continue pattern...}

## Techniques & Patterns

| Technique | Description | When to Use |
|-----------|-------------|-------------|
| {name} | {what it does} | {use case} |

## Actionable Takeaways

- [ ] {Specific action item 1}
- [ ] {Specific action item 2}
- [ ] {Specific action item 3}

## Memorable Quotes

> "{Notable quote 1}"

> "{Notable quote 2}"

## Code Examples

### {Example Name}
```{language}
{Complete, working code example}
```

## Related Resources

- [{Resource title}]({url}) - {Brief description}

## Workshop Notes

**Relevance:** {High|Medium|Low}
**Good for:** {Target audience level}
**Potential demo:** {Yes/No} - {Description of demo idea}
**Exercise idea:** {Hands-on activity description}

## Related Topics

- {Related topic 1}
- {Related topic 2}
```

## Guidelines

1. **Extract, don't invent**: Only include information from the source material
2. **Be specific**: Vague takeaways are useless - make them actionable
3. **Include code**: If the source has code examples, preserve them
4. **Workshop focus**: The "Workshop Notes" section is critical - think about how this becomes a workshop
5. **Difficulty matters**: Accurately assess the technical level

## Example

User: `/condense` then pastes a transcript about React Server Components

Output: `knowledge/react/react-server-components.md` with full structure above

## After Completion

Suggest:
```
Knowledge file created: knowledge/{category}/{slug}.md

To generate workshop materials:
  /workshop knowledge/{category}/{slug}.md
```
