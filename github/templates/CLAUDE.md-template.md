# CLAUDE.md Template
# ─────────────────────────────────────────────────────────────────────────────
# Instructions: Replace all [BRACKETED] placeholders with project-specific values.
# Delete sections that don't apply to your project.
# This file is read by Claude Code at the start of every session.
# Write it for Claude, not for humans — be specific and actionable.
# ─────────────────────────────────────────────────────────────────────────────

# [PROJECT NAME] — Claude Code Context

## Project Overview
[One paragraph: what this project does, what problem it solves, who uses it.]

**Stack**: [Language] + [Framework] + [Database] + [Testing framework]
**Stage**: [Early development / Active development / Maintenance]
**Key constraint**: [The most important constraint Claude should never violate, e.g., "No breaking API changes without a major version bump"]

---

## Architecture

[2–4 sentences: the high-level structure. Name the key modules/services/layers.]

```
[Optional: ASCII diagram of the system architecture]
src/
├── [module-a]/     # [What it does]
├── [module-b]/     # [What it does]
└── [module-c]/     # [What it does]
```

**Key files to read before making changes**:
- `[path/to/file]` — [why it matters]
- `[path/to/file]` — [why it matters]

---

## Coding Conventions

### Naming
- Files: `[kebab-case / snake_case / camelCase]`
- Classes: `[PascalCase]`
- Functions: `[camelCase / snake_case]`
- Constants: `[SCREAMING_SNAKE_CASE / camelCase]`

### Error Handling
[Describe the project's error handling pattern. Examples:]
- We use `Result<T, AppError>` — never throw, always return
- We use typed exceptions extending `AppException`
- Async functions return `Promise<T>` — errors propagate via rejection

### Testing
- Framework: [Jest / pytest / JUnit / etc.]
- Test location: `[tests/ / __tests__/ / *.test.ts beside source]`
- Convention: [One test file per module / colocated / etc.]
- Run tests: `[npm test / pytest / ./gradlew test]`

### Code Style
- Formatter: [Prettier / Black / gofmt / rustfmt] — run automatically on save
- Linter: [ESLint / Ruff / etc.] — `[lint command]`
- [Any specific style rules that aren't covered by the formatter]

---

## Decisions Made (Don't Revisit Without Discussion)

| Decision | Rationale |
|----------|-----------|
| [e.g., "No ORM — raw SQL with pg"] | [e.g., "Team prefers explicit queries; ORM abstraction not worth the overhead for our query patterns"] |
| [e.g., "JWT in httpOnly cookies, not Authorization header"] | [e.g., "XSS protection; decided in security review 2026-01"] |
| [e.g., "Monorepo, not microservices"] | [e.g., "Team size and deployment complexity don't justify microservices yet"] |

---

## Patterns to Follow

### [Pattern Name, e.g., "API Route Handler"]
```[language]
// [Show the canonical pattern — one example is worth three paragraphs of description]
[example code]
```

### [Another Pattern, e.g., "Database Query"]
```[language]
[example code]
```

---

## Patterns to Avoid

- ❌ **[Anti-pattern name]**: [Why and what to do instead]
- ❌ **[Anti-pattern name]**: [Why and what to do instead]
- ❌ **[Anti-pattern name]**: [Why and what to do instead]

---

## Environment Setup

```bash
# Install dependencies
[install command]

# Configure environment (copy from .env.example — never commit real values)
cp .env.example .env

# Run development server
[dev server command]

# Run tests
[test command]

# Run linter
[lint command]
```

**Required environment variables** (see `.env.example`):
- `[VAR_NAME]` — [what it is, how to get it]
- `[VAR_NAME]` — [what it is, how to get it]

---

## Current Work in Progress

[Optional: brief note on what's actively being built. Update when priorities shift.]

- [ ] [Active feature/bug being worked on]
- [ ] [Next priority]

---

## Out of Scope (Don't Build Without Explicit Request)

- [Feature or refactor that might seem obvious but is explicitly not being done]
- [External service integration that's been deprioritized]

---

*Last updated: [YYYY-MM-DD] by [Author/Team]*
