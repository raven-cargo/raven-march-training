# CC2.0 OBSERVE: Concept Map — Modules 07-12
**Date**: 2026-03-16
**Observer**: CC2-OBSERVE (Concept Foundations)
**Operation**: extract → duplicate → extend

---

## Module-by-Module Concept Registry

### Module 07: Skills and Commands

| # | Concept | Type | Section | Dependencies | First/Referenced |
|---|---------|------|---------|--------------|-----------------|
| 1 | Stateless session problem | Mental model | 7.1 | None (foundational) | INTRODUCED |
| 2 | Skill file | Artifact type | 7.1 | Stateless session problem | INTRODUCED |
| 3 | Persistent capability definition | Design principle | 7.1 | Skill file | INTRODUCED |
| 4 | Skill as encapsulated expertise | Mental model | 7.1 | Skill file | INTRODUCED |
| 5 | Skill location hierarchy | Architecture pattern | 7.1 | Skill file | INTRODUCED |
| 6 | Global skills (~/.claude/skills/) | File convention | 7.1 | Skill location hierarchy | INTRODUCED |
| 7 | Project skills (.claude/skills/) | File convention | 7.1 | Skill location hierarchy | INTRODUCED |
| 8 | Skill precedence (project overrides global) | Rule | 7.1 | Global skills, Project skills | INTRODUCED |
| 9 | Skills vs. CLAUDE.md distinction | Conceptual boundary | 7.1 | Skill file, CLAUDE.md (M02) | INTRODUCED (contrast with M02 concept) |
| 10 | CLAUDE.md as "what" vs. Skills as "how" | Mental model | 7.1 | Skills vs. CLAUDE.md distinction | INTRODUCED |
| 11 | YAML frontmatter (skill metadata) | Syntax/format | 7.2 | Skill file | INTRODUCED |
| 12 | Skill name field | Convention | 7.2 | YAML frontmatter | INTRODUCED |
| 13 | Skill description field | Convention | 7.2 | YAML frontmatter | INTRODUCED |
| 14 | Skill version field (semver) | Convention | 7.2 | YAML frontmatter | INTRODUCED |
| 15 | Triggers field (LUXOR convention, not native) | Convention | 7.2 | YAML frontmatter | INTRODUCED |
| 16 | TCEF skill body structure | Framework | 7.2 | TCEF (M04) | REFERENCED (M04), adapted for skills |
| 17 | Role statement (skill element) | Component | 7.2 | TCEF skill body | INTRODUCED |
| 18 | Numbered procedure (skill element) | Component | 7.2 | TCEF skill body | INTRODUCED |
| 19 | Example input/output (skill element) | Component | 7.2 | TCEF skill body | INTRODUCED |
| 20 | Anti-patterns (skill element) | Component | 7.2 | TCEF skill body | INTRODUCED |
| 21 | "Senior Engineer on Day One" test | Quality heuristic | 7.2 | Skill body completeness | INTRODUCED |
| 22 | Skill quality spectrum | Assessment framework | 7.3 | Skill file | INTRODUCED |
| 23 | Beginning/Developing/Proficient/Distinguished levels | Taxonomy | 7.3 | Skill quality spectrum | INTRODUCED |
| 24 | Common skill mistakes (too broad, assumed context, missing format, no anti-patterns) | Anti-pattern catalog | 7.3 | Skill quality spectrum | INTRODUCED |
| 25 | Slash commands | Invocation mechanism | 7.4 | Skill file | INTRODUCED |
| 26 | Command file structure | Format | 7.4 | Slash commands | INTRODUCED |
| 27 | $ARGUMENTS template variable | Syntax | 7.4 | Slash commands | INTRODUCED |
| 28 | Reserved command names | Constraint | 7.4 | Slash commands | INTRODUCED |
| 29 | Commands vs. direct skill invocation | Decision framework | 7.4 | Slash commands, Skill file | INTRODUCED |
| 30 | Skill composition patterns | Architecture | 7.5 | Skill file, Slash commands | INTRODUCED |
| 31 | Sequential composition (pipeline pattern) | Pattern | 7.5 | Skill composition | INTRODUCED |
| 32 | Conditional composition (router pattern) | Pattern | 7.5 | Skill composition | INTRODUCED |
| 33 | Parallel composition (multi-expert pattern) | Pattern | 7.5 | Skill composition, Agent tool | INTRODUCED |
| 34 | Ship-feature pipeline (full example) | Worked example | 7.5 | All three composition patterns | INTRODUCED |
| 35 | Skill vs. one-off prompt decision framework | Decision table | 7.5 | Skill file | INTRODUCED |

### Module 08: Meta-Prompting

| # | Concept | Type | Section | Dependencies | First/Referenced |
|---|---------|------|---------|--------------|-----------------|
| 1 | Meta-prompting (concept) | Core concept | 8.1 | Prompt engineering (M04) | INTRODUCED |
| 2 | Metaprogramming analogy (programs that write programs) | Mental model | 8.1 | Meta-prompting | INTRODUCED |
| 3 | Three applications: generation, evaluation, improvement | Taxonomy | 8.1 | Meta-prompting | INTRODUCED |
| 4 | Prompt generation | Technique | 8.2 | Meta-prompting, TCEF (M04) | INTRODUCED |
| 5 | Meta-prompt (as artifact type) | Artifact | 8.2 | Meta-prompting | INTRODUCED |
| 6 | Template generation | Technique | 8.2 | Prompt generation | INTRODUCED |
| 7 | Bootstrapping pattern | Pattern | 8.2 | Prompt generation, template generation | INTRODUCED |
| 8 | Skill file generation via meta-prompting | Applied technique | 8.2 | Prompt generation, Skill file (M07), YAML frontmatter (M07) | INTRODUCED (convergence: M07+M08) |
| 9 | Prompt evaluation | Technique | 8.3 | Meta-prompting | INTRODUCED |
| 10 | Failure mode finding pattern | Pattern | 8.3 | Prompt evaluation | INTRODUCED |
| 11 | Criteria-based evaluation (scorecard) | Pattern | 8.3 | Prompt evaluation | INTRODUCED |
| 12 | Automated evaluation loop (generate → evaluate → improve → re-evaluate) | Workflow | 8.3 | Prompt generation, Prompt evaluation | INTRODUCED |
| 13 | Semi-automated CLI workflow (claude -p pipeline) | Technique | 8.3 | Automated evaluation loop, claude -p (M02) | INTRODUCED (uses M02 concept) |
| 14 | Convergence criteria (when to stop iterating) | Heuristic | 8.3 | Automated evaluation loop | INTRODUCED |
| 15 | Skill template library | Artifact | 8.4 | Skill file (M07), Meta-prompting | INTRODUCED (convergence: M07+M08) |
| 16 | Two-stage library construction (inventory → generate) | Process | 8.4 | Skill template library | INTRODUCED |
| 17 | Skill generator meta-prompt (meta-skill) | Pattern | 8.4 | Skill file (M07), Meta-prompting | INTRODUCED |
| 18 | Library consistency auditing via meta-prompting | Technique | 8.4 | Skill template library | INTRODUCED |
| 19 | Limits of meta-prompting | Conceptual boundary | 8.5 | Meta-prompting | INTRODUCED |
| 20 | When direct prompting is better (simple tasks, tacit knowledge, original insight) | Decision framework | 8.5 | Meta-prompting, TCEF (M04) | INTRODUCED |
| 21 | Confabulation risk in meta-prompted prompts | Risk category | 8.5 | Meta-prompting | INTRODUCED |
| 22 | Human judgment layer (non-negotiable) | Principle | 8.5 | Confabulation risk | INTRODUCED |
| 23 | Domain validation, context grounding, quality judgment | Human roles in meta-prompting | 8.5 | Human judgment layer | INTRODUCED |

### Module 09: Multi-Agent Systems

| # | Concept | Type | Section | Dependencies | First/Referenced |
|---|---------|------|---------|--------------|-----------------|
| 1 | Single-agent sufficiency principle | Design principle | 9.1 | PRAO loop (M01), Context window (M02) | INTRODUCED (references M01-02) |
| 2 | Three motivations for multi-agent: parallelism, specialization, context isolation | Taxonomy | 9.1 | Single-agent sufficiency | INTRODUCED |
| 3 | Parallelism motivation | Motivation | 9.1 | Multi-agent motivations | INTRODUCED |
| 4 | Specialization motivation | Motivation | 9.1 | Multi-agent motivations, MCP server configs (M05) | INTRODUCED |
| 5 | Context isolation motivation | Motivation | 9.1 | Multi-agent motivations, Context window (M02) | INTRODUCED |
| 6 | Cost of multi-agent: coordination overhead | Risk | 9.1 | Multi-agent systems | INTRODUCED |
| 7 | Cost of multi-agent: aggregation complexity | Risk | 9.1 | Multi-agent systems | INTRODUCED |
| 8 | Cost of multi-agent: debugging difficulty | Risk | 9.1 | Multi-agent systems | INTRODUCED |
| 9 | Four-question decision framework (single vs. multi-agent) | Decision framework | 9.1 | Single-agent sufficiency | INTRODUCED |
| 10 | Fan-out / fan-in pattern | Architecture pattern | 9.2 | Multi-agent systems | INTRODUCED |
| 11 | Orchestrator role (three responsibilities: decompose, dispatch, aggregate) | Role specification | 9.2 | Fan-out / fan-in | INTRODUCED |
| 12 | run_in_background: true (Agent tool parameter) | Implementation detail | 9.2 | Fan-out / fan-in | INTRODUCED |
| 13 | Pipeline pattern (multi-agent) | Architecture pattern | 9.2 | Multi-agent systems | INTRODUCED |
| 14 | Inter-stage interface contract | Design principle | 9.2 | Pipeline pattern | INTRODUCED |
| 15 | Conditional routing pattern | Architecture pattern | 9.2 | Multi-agent systems | INTRODUCED |
| 16 | Classifier agent | Role type | 9.2 | Conditional routing | INTRODUCED |
| 17 | Hybrid patterns (nested fan-out + conditional routing) | Architecture pattern | 9.2 | Fan-out, Conditional routing | INTRODUCED |
| 18 | Task decomposability (three conditions) | Framework | 9.3 | Multi-agent systems | INTRODUCED |
| 19 | Independent subtasks condition | Principle | 9.3 | Task decomposability | INTRODUCED |
| 20 | No shared mutable state condition | Principle | 9.3 | Task decomposability | INTRODUCED |
| 21 | Clear input/output boundaries condition | Principle | 9.3 | Task decomposability | INTRODUCED |
| 22 | Non-decomposable tasks (sequential deps, shared state, holistic reasoning) | Anti-pattern catalog | 9.3 | Task decomposability | INTRODUCED |
| 23 | Decomposition worksheet | Planning artifact | 9.3 | Task decomposability | INTRODUCED |
| 24 | Structured JSON for inter-agent communication (mandatory) | Design principle | 9.4 | Multi-agent systems | INTRODUCED |
| 25 | Five mandatory schema fields: status, checked_scope, findings, error, metadata | Schema specification | 9.4 | Structured JSON | INTRODUCED |
| 26 | Status values: success, error, partial | Taxonomy | 9.4 | Schema fields | INTRODUCED |
| 27 | Checked_scope (provenance reporting) | Concept | 9.4 | Schema fields | INTRODUCED |
| 28 | Provenance requirement (what was examined, not just what was found) | Principle | 9.4 | Checked_scope | INTRODUCED |
| 29 | Schema versioning (schema_version field) | Convention | 9.4 | Inter-agent schema | INTRODUCED |
| 30 | Agent timeout failure mode | Failure mode | 9.5 | Multi-agent systems | INTRODUCED |
| 31 | Timeout recovery: retry with scope reduction, then accept partial | Policy | 9.5 | Agent timeout | INTRODUCED |
| 32 | Malformed output failure mode | Failure mode | 9.5 | Structured JSON | INTRODUCED |
| 33 | Malformed output recovery: retry with explicit schema, then fail gracefully | Policy | 9.5 | Malformed output | INTRODUCED |
| 34 | Contradictory findings failure mode | Failure mode | 9.5 | Multi-agent, Fan-out | INTRODUCED |
| 35 | Contradictory findings policy: escalate to human, never silently resolve | Policy | 9.5 | Contradictory findings | INTRODUCED |
| 36 | Scope creep failure mode | Failure mode | 9.5 | Multi-agent systems | INTRODUCED |
| 37 | Scope creep policy: validate changed files against assigned scope | Policy | 9.5 | Scope creep | INTRODUCED |
| 38 | Silent scope omission (anti-pattern) | Anti-pattern | 9.5 | Timeout recovery | INTRODUCED |

### Module 10: Security and Sandboxing

| # | Concept | Type | Section | Dependencies | First/Referenced |
|---|---------|------|---------|--------------|-----------------|
| 1 | Agentic security surface | Mental model | 10.1 | PRAO loop (M01), Tool calls (M02-03) | INTRODUCED |
| 2 | Autonomy amplifies mistakes | Security property | 10.1 | Agentic security surface | INTRODUCED |
| 3 | Attack surface includes content agent reads | Security property | 10.1 | Agentic security surface, MCP servers (M05) | INTRODUCED |
| 4 | Audit problem is harder (non-deterministic traces) | Security property | 10.1 | Agentic security surface, PRAO loop (M01) | INTRODUCED |
| 5 | Three risk categories: scope creep, secret exposure, prompt injection | Taxonomy | 10.1 | Agentic security surface | INTRODUCED (scope creep REFERENCED from M09) |
| 6 | Principle of least privilege (agentic application) | Security principle | 10.1 | permissions (M02), agentic security | INTRODUCED (extends M02 concept) |
| 7 | settings.json allow/deny model (in depth) | Configuration system | 10.2 | settings.json (M02) | REFERENCED (M02), elaborated |
| 8 | Deny takes precedence (evaluation logic) | Rule | 10.2 | Allow/deny model | INTRODUCED |
| 9 | Default: require explicit human approval | Behavior | 10.2 | Allow/deny model | INTRODUCED |
| 10 | Global vs. project settings layering | Architecture | 10.2 | settings.json (M02) | REFERENCED (M02), elaborated |
| 11 | Production-grade permission configurations (dev, read-only, CI/CD) | Templates | 10.2 | Allow/deny model | INTRODUCED |
| 12 | Instructor vs. student environment permissions | Design pattern | 10.2 | Permission configurations | INTRODUCED |
| 13 | Three secrets management anti-patterns | Anti-pattern catalog | 10.3 | Secrets management | INTRODUCED |
| 14 | Secrets in prompts (anti-pattern) | Anti-pattern | 10.3 | Context window (M02) | INTRODUCED |
| 15 | Secrets in CLAUDE.md committed to VCS (anti-pattern) | Anti-pattern | 10.3 | CLAUDE.md (M02), Git (assumed) | INTRODUCED |
| 16 | Inline secrets in MCP configuration (anti-pattern) | Anti-pattern | 10.3 | MCP config (M05-06) | INTRODUCED |
| 17 | Environment variables as correct secrets pattern | Pattern | 10.3 | Secrets anti-patterns | INTRODUCED |
| 18 | ${VAR_NAME} substitution in MCP config | Syntax | 10.3 | Environment variables, MCP config (M05) | INTRODUCED |
| 19 | CI/CD secret injection | Technique | 10.3 | Environment variables | INTRODUCED |
| 20 | .env file protocol (.gitignore, .env.example) | Convention | 10.3 | Environment variables | INTRODUCED |
| 21 | Prompt injection in agentic contexts | Threat | 10.4 | Agentic security surface, MCP tools (M05) | INTRODUCED |
| 22 | Trust hierarchy (Tier 1: CLAUDE.md, Tier 2: operator prompt, Tier 3: processed content) | Security model | 10.4 | CLAUDE.md (M02), Prompt injection | INTRODUCED |
| 23 | Content trust policy (in CLAUDE.md) | Defensive pattern | 10.4 | Trust hierarchy, CLAUDE.md (M02) | INTRODUCED |
| 24 | Defense patterns: scope validation, output validation, MCP tool scoping, sandboxed web fetch | Techniques | 10.4 | Trust hierarchy | INTRODUCED |
| 25 | Approval gates | Design pattern | 10.5 | Agentic security surface | INTRODUCED |
| 26 | Four mandatory approval gate categories (irreversible, public-facing, production DB, changes at scale) | Taxonomy | 10.5 | Approval gates | INTRODUCED |
| 27 | "Show me the plan" pattern (two-phase protocol) | Implementation pattern | 10.5 | Approval gates, CLAUDE.md (M02) | INTRODUCED |
| 28 | Audit trail (session ID, timestamp, plan hash, human identity, outcome) | Data model | 10.5 | Approval gates | INTRODUCED |
| 29 | Deviation from plan field | Detail | 10.5 | Audit trail | INTRODUCED |
| 30 | Blast radius concept (bounded by permissions) | Mental model | 10.1-10.2 | Principle of least privilege | INTRODUCED |

### Module 11: Tech Stack Adaptation

| # | Concept | Type | Section | Dependencies | First/Referenced |
|---|---------|------|---------|--------------|-----------------|
| 1 | Adaptation problem (gap between demo and deployment) | Mental model | 11.1 | All prior modules (generic patterns) | INTRODUCED |
| 2 | Documentation currency (training data staleness) | Challenge | 11.1 | Adaptation problem | INTRODUCED |
| 3 | Convention encoding | Challenge | 11.1 | CLAUDE.md (M02), Skill files (M07) | INTRODUCED |
| 4 | Context grounding (architectural position) | Challenge | 11.1 | Adaptation problem | INTRODUCED |
| 5 | Adaptation investment (one-time cost, compounding returns) | Mental model | 11.1 | Adaptation problem | INTRODUCED |
| 6 | Context7 MCP server | Tool | 11.2 | MCP architecture (M05), MCP config (M06) | INTRODUCED |
| 7 | resolve-library-id tool | API | 11.2 | Context7 | INTRODUCED |
| 8 | query-docs tool | API | 11.2 | Context7 | INTRODUCED |
| 9 | Documentation pre-loading workflow (3 steps) | Workflow | 11.2 | Context7 | INTRODUCED |
| 10 | Libraries that benefit most from Context7 | Decision heuristic | 11.2 | Documentation currency | INTRODUCED |
| 11 | Stack prep script (prep-agent-session.sh) | Artifact | 11.2 | Context7, Session initialization | INTRODUCED |
| 12 | Stack-specific CLAUDE.md structure (five categories) | Template | 11.3 | CLAUDE.md (M02), Adaptation problem | INTRODUCED |
| 13 | Framework versions section | CLAUDE.md component | 11.3 | Stack-specific CLAUDE.md | INTRODUCED |
| 14 | Architectural patterns section | CLAUDE.md component | 11.3 | Stack-specific CLAUDE.md | INTRODUCED |
| 15 | Naming conventions section | CLAUDE.md component | 11.3 | Stack-specific CLAUDE.md | INTRODUCED |
| 16 | Code generation rules section | CLAUDE.md component | 11.3 | Stack-specific CLAUDE.md | INTRODUCED |
| 17 | Key files and decisions section | CLAUDE.md component | 11.3 | Stack-specific CLAUDE.md | INTRODUCED |
| 18 | Five stack-specific CLAUDE.md examples (Next.js, FastAPI, Spring Boot, Rails, Go) | Worked examples | 11.3 | Stack-specific CLAUDE.md | INTRODUCED |
| 19 | Stack-specific TCEF examples | Applied technique | 11.4 | TCEF (M04), Stack adaptation | INTRODUCED |
| 20 | Constraint specification for stack | Technique | 11.4 | TCEF Format component (M04) | INTRODUCED |
| 21 | Stack-specific skill files | Artifact | 11.4 | Skill files (M07), Stack adaptation | INTRODUCED |
| 22 | Organizational deployment checklist | Checklist | 11.5 | All M07-M11 concepts | INTRODUCED |
| 23 | CLAUDE.md completeness audit | Checklist section | 11.5 | Stack-specific CLAUDE.md | INTRODUCED |
| 24 | Permission configuration review | Checklist section | 11.5 | settings.json (M02, M10) | INTRODUCED |
| 25 | Secrets management audit | Checklist section | 11.5 | Secrets management (M10) | INTRODUCED |
| 26 | MCP server verification | Checklist section | 11.5 | MCP architecture (M05-06) | INTRODUCED |
| 27 | Skill library verification | Checklist section | 11.5 | Skills (M07) | INTRODUCED |
| 28 | Approval gate verification | Checklist section | 11.5 | Approval gates (M10) | INTRODUCED |
| 29 | Observability verification | Checklist section | 11.5 | (Forward reference to M12) | INTRODUCED |
| 30 | Two-person checklist review process | Practice | 11.5 | Deployment checklist | INTRODUCED |
| 31 | SSE transport deprecated (replaced by Streamable HTTP) | Fact | 11.5 | MCP transports (M05) | INTRODUCED |

### Module 12: Capstone and Production Deployment

| # | Concept | Type | Section | Dependencies | First/Referenced |
|---|---------|------|---------|--------------|-----------------|
| 1 | Integrated pipeline view | Mental model | 12.1 | All M01-M11 concepts | INTRODUCED (integration) |
| 2 | Eight composing components (PRAO, TCEF, MCP, Skills, Multi-agent, Permissions, Secrets, Stack adaptation) | Enumeration | 12.1 | Every prior module | REFERENCED (all) |
| 3 | Five pipeline components: Trigger, Context gathering, Decision logic, Action scope, Output delivery | Framework | 12.1 | Integrated pipeline view | INTRODUCED |
| 4 | Trigger types: human-initiated, event-triggered, schedule-triggered, threshold-triggered | Taxonomy | 12.1 | Five pipeline components | INTRODUCED |
| 5 | Context gathering phase (Perceive phase mapped) | Design component | 12.1 | PRAO loop (M01), MCP servers (M05) | INTRODUCED (maps to M01) |
| 6 | Decision logic phase (TCEF mapped) | Design component | 12.1 | TCEF (M04) | INTRODUCED (maps to M04) |
| 7 | Action scope as both design and security question | Design insight | 12.1 | Permissions (M10), Action phase (M01) | INTRODUCED |
| 8 | Output delivery mechanisms | Design component | 12.1 | Five pipeline components | INTRODUCED |
| 9 | Pipeline archetypes: PR Review, Doc Sync, Incident Triage, Onboarding Assistant, Data Quality Monitor | Pattern catalog | 12.1 | Five pipeline components | INTRODUCED |
| 10 | Five-phase capstone design process | Process | 12.2 | All prior concepts | INTRODUCED |
| 11 | Phase 1: Problem scoping (three questions) | Phase | 12.2 | Design process | INTRODUCED |
| 12 | Trigger specification (precise, not vague) | Technique | 12.2 | Problem scoping, Trigger types | INTRODUCED |
| 13 | Measurable success definition | Principle | 12.2 | Problem scoping | INTRODUCED |
| 14 | Value chain tracing (output to beneficiary) | Technique | 12.2 | Problem scoping, Output delivery | INTRODUCED |
| 15 | Phase 2: Pipeline architecture (three artifacts) | Phase | 12.2 | Design process | INTRODUCED |
| 16 | Component diagram | Artifact type | 12.2 | Pipeline architecture | INTRODUCED |
| 17 | Agent allocation decision | Design decision | 12.2 | Multi-agent decision framework (M09) | REFERENCED (M09) |
| 18 | Interface specifications | Artifact type | 12.2 | Inter-agent schema (M09) | REFERENCED (M09) |
| 19 | Phase 3: Prompt and skill design | Phase | 12.2 | TCEF (M04), Skills (M07) | REFERENCED (M04, M07) |
| 20 | Core TCEF prompt design | Technique | 12.2 | TCEF (M04) | REFERENCED (M04) |
| 21 | Skill identification (extract from prompt to skill) | Technique | 12.2 | Skills (M07) | REFERENCED (M07) |
| 22 | Output schema design (JSON with M09 fields) | Technique | 12.2 | Inter-agent schema (M09) | REFERENCED (M09) |
| 23 | Phase 4: Safety and production design | Phase | 12.2 | Security (M10) | REFERENCED (M10) |
| 24 | Permission audit | Checklist | 12.2 | settings.json (M02, M10) | REFERENCED (M10) |
| 25 | Secrets audit | Checklist | 12.2 | Secrets management (M10) | REFERENCED (M10) |
| 26 | Approval gate placement | Technique | 12.2 | "Show me the plan" (M10) | REFERENCED (M10) |
| 27 | Blast radius analysis | Technique | 12.2 | Blast radius (M10), Permissions | INTRODUCED (extends M10) |
| 28 | Phase 5: Observability design | Phase | 12.2 | Observability (M11 forward ref) | INTRODUCED |
| 29 | Session ID schema | Design decision | 12.2 | Observability design | INTRODUCED |
| 30 | Production deployment checklist (full) | Checklist | 12.3 | Organizational deployment checklist (M11) | INTRODUCED (extends M11) |
| 31 | Technical accuracy verification (20+ real inputs) | Checklist section | 12.3 | Testing | INTRODUCED |
| 32 | Scope testing (out-of-scope action testing) | Checklist section | 12.3 | Scope creep (M09-10) | INTRODUCED |
| 33 | Failure mode testing (timeout, malformed, contradictory) | Checklist section | 12.3 | Failure modes (M09) | REFERENCED (M09) |
| 34 | Cost projection | Checklist section | 12.3 | Token economics | INTRODUCED |
| 35 | Structured logging for agentic systems | Pattern | 12.4 | Observability design | INTRODUCED |
| 36 | Non-deterministic execution paths (observability challenge) | Challenge | 12.4 | PRAO loop (M01) | INTRODUCED |
| 37 | Multi-step sessions (observability challenge) | Challenge | 12.4 | PRAO loop (M01) | INTRODUCED |
| 38 | Minimum required log fields (timestamp, session_id, pipeline, event_type, tool, tokens, duration, error) | Specification | 12.4 | Structured logging | INTRODUCED |
| 39 | Event types to log (8 types: session_start, tool_call, agent_dispatch, etc.) | Taxonomy | 12.4 | Structured logging | INTRODUCED |
| 40 | Trace correlation (session_id + agent_id across logs) | Pattern | 12.4 | Structured logging, Multi-agent (M09) | INTRODUCED |
| 41 | Alerting thresholds (error rate, timeout rate, cost spike, duration spike) | Specification | 12.4 | Observability | INTRODUCED |
| 42 | Incident response playbook (5-minute containment) | Process | 12.4 | Observability, Security (M10) | INTRODUCED |
| 43 | Root cause analysis (RCA) requirement | Process | 12.4 | Incident response | INTRODUCED |
| 44 | Skill versioning (major.minor convention) | Convention | 12.5 | Skills (M07), Skill version field (M07) | INTRODUCED (extends M07) |
| 45 | Major vs. minor version semantics (breaking change vs. clarification) | Framework | 12.5 | Skill versioning | INTRODUCED |
| 46 | Prompt drift | Concept | 12.5 | Prompts (M04), CLAUDE.md (M02) | INTRODUCED |
| 47 | Maintenance cadence (monthly, at upgrades, at arch decisions, quarterly) | Schedule | 12.5 | Prompt drift | INTRODUCED |
| 48 | Model update compatibility testing | Process | 12.5 | Model updates | INTRODUCED |
| 49 | Regression test set (20-50 inputs with known-good outputs) | Artifact | 12.5 | Model update testing | INTRODUCED |
| 50 | Behavioral comparison (format, reasoning, verbosity, tool patterns) | Technique | 12.5 | Model update testing | INTRODUCED |
| 51 | Staged rollout (staging → production) | Process | 12.5 | Model update testing | INTRODUCED |
| 52 | Skill library growth process (proposal → review → test → publish → maintenance ownership) | Process | 12.5 | Skills (M07), Skill template library (M08) | INTRODUCED (extends M07+M08) |
| 53 | Maintenance ownership for skills | Organizational pattern | 12.5 | Skill library growth | INTRODUCED |

---

## Concept Relationship Graph (ASCII)

```
                           MODULE DEPENDENCY CHAINS
                           ========================

M01: PRAO Loop ──────────────────────────────────────────────┐
  │                                                          │
  ├──> M03: Reasoning Traces (read PRAO in practice)         │
  │                                                          │
M02: CLAUDE.md + settings.json + claude -p + MCP intro ──────┤
  │                                                          │
  ├─────────────────┐                                        │
  │                 │                                        │
M04: TCEF ──────────┼────────────────────────────────────────┤
  │                 │                                        │
  │    M05: MCP Architecture ──> M06: MCP Building           │
  │         │                        │                       │
  │         │                        │                       │
  ▼         ▼                        ▼                       ▼
M07: Skills & Commands ◄──── Uses TCEF body structure        │
  │                              │                           │
  │  ┌───────────────────────────┘                           │
  │  │                                                       │
  ▼  ▼                                                       │
M08: Meta-Prompting ── extends ──> M07 (generates skills)    │
  │                                                          │
  ├────────────────────────────────┐                          │
  │                                │                         │
  ▼                                ▼                         │
M09: Multi-Agent ◄───── M05/M06 (MCP tools for agents)      │
  │    │                                                     │
  │    ├── Fan-out/Fan-in                                    │
  │    ├── Pipeline                                          │
  │    ├── Conditional Routing                               │
  │    ├── Inter-agent JSON Schema                           │
  │    └── Failure Modes                                     │
  │                                                          │
  ▼                                                          │
M10: Security & Sandboxing ◄── M02 (settings.json deepened)  │
  │    │                   ◄── M05 (MCP tool scoping)        │
  │    ├── Least Privilege                                   │
  │    ├── Secrets Management                                │
  │    ├── Prompt Injection                                  │
  │    ├── Trust Hierarchy                                   │
  │    └── Approval Gates + Audit Trail                      │
  │                                                          │
  ▼                                                          │
M11: Tech Stack Adaptation ◄── M02 (CLAUDE.md deepened)      │
  │    │                   ◄── M04 (TCEF adapted to stacks)  │
  │    │                   ◄── M05-06 (Context7 is MCP)      │
  │    │                   ◄── M07 (stack-specific skills)    │
  │    ├── Context7                                          │
  │    ├── Stack-Specific CLAUDE.md                          │
  │    ├── Stack-Specific Skills                             │
  │    └── Deployment Checklist (draft)                      │
  │                                                          │
  ▼                                                          ▼
M12: Capstone ◄──── ALL MODULES CONVERGE ────────────────────┘
       │
       ├── Integrated Pipeline View (M01-M11)
       ├── Five Pipeline Components
       ├── Five-Phase Design Process
       ├── Production Deployment Checklist (full)
       ├── Observability (logging, traces, alerting)
       ├── Incident Response
       └── Maintenance & Evolution (skill versioning, prompt drift)
```

---

## Concept Density Analysis

| Module | New Concepts | Referenced from Earlier | Back-References to M01-06 | Density (new/section) |
|--------|-------------|------------------------|--------------------------|----------------------|
| M07: Skills & Commands | 35 | 2 (TCEF, CLAUDE.md) | 2 (M02: CLAUDE.md, M04: TCEF) | 7.0/section |
| M08: Meta-Prompting | 23 | 4 (TCEF, Skills, YAML, claude -p) | 2 (M02: claude -p, M04: TCEF) | 4.6/section |
| M09: Multi-Agent | 38 | 3 (PRAO, context window, MCP) | 3 (M01: PRAO, M02: context window, M05: MCP) | 7.6/section |
| M10: Security | 30 | 5 (PRAO, settings.json, CLAUDE.md, MCP, tool calls) | 4 (M01: PRAO, M02: settings.json+CLAUDE.md, M05: MCP) | 6.0/section |
| M11: Stack Adaptation | 31 | 7 (CLAUDE.md, TCEF, Skills, MCP, settings.json, transports) | 4 (M02: CLAUDE.md, M04: TCEF, M05-06: MCP) | 6.2/section |
| M12: Capstone | 53 | 18+ (all prior modules) | 6+ (M01: PRAO, M02: CLAUDE.md/settings.json, M04: TCEF, M05: MCP, M06: MCP building) | 10.6/section |

**Density Observations:**
- Module 12 has the highest absolute concept count (53), reflecting its integration role
- Module 09 has the highest density of *new* architectural patterns (7.6/section)
- Module 07 introduces the most new *artifact types* (skills, commands, compositions)
- Modules 10-11 are the most reference-heavy, building extensively on M02's foundations

---

## Back-Reference Analysis

| Source Concept (M01-06) | Referenced In | Context |
|------------------------|---------------|---------|
| **PRAO loop** (M01) | M09 (overview: "one chain of PRAO cycles"), M10 (10.1: non-deterministic PRAO), M12 (12.1: pipeline component, 12.4: observability) | Core reasoning model referenced as architectural foundation |
| **Context window** (M02) | M09 (9.1: context isolation motivation), M10 (10.3: secrets in context) | Constraint that motivates multi-agent and security patterns |
| **CLAUDE.md** (M02) | M07 (7.1: skills vs. CLAUDE.md), M10 (10.3: secrets anti-pattern, 10.4: trust hierarchy Tier 1), M11 (11.3: stack encoding), M12 (12.1: pipeline component, 12.2: phase 3, 12.3: checklist) | Most referenced M01-06 concept; deepened in every module |
| **settings.json allow/deny** (M02) | M10 (10.2: deep dive), M11 (11.5: checklist), M12 (12.2: phase 4, 12.3: permission audit) | Introduced briefly in M02, expanded substantially in M10 |
| **claude -p (non-interactive mode)** (M02) | M08 (8.3: automated evaluation CLI pipeline), M12 (12.1: trigger type) | Used as building block for meta-prompting automation |
| **Interactive mode (claude)** (M02) | M07 (implicit: session context for skills) | Implicitly referenced via skill loading at session start |
| **TCEF pattern** (M04) | M07 (7.2: TCEF body structure for skills), M08 (8.1-8.4: meta-prompting generates TCEF), M11 (11.4: stack-specific TCEF examples), M12 (12.1: decision logic component, 12.2: phase 3) | Second most referenced M01-06 concept; applied to new artifact types |
| **GCCF pattern** (M04) | M11 (implicit contrast: TCEF supersedes GCCF for production) | Implicitly referenced as the simpler predecessor |
| **MCP architecture (three primitives)** (M05) | M09 (9.1: specialization with different MCP configs), M10 (10.3: MCP config secrets, 10.4: MCP tool scoping), M11 (11.2: Context7 as MCP server, 11.5: MCP verification), M12 (12.1: pipeline component) | MCP is the extensibility mechanism used throughout M07-12 |
| **MCP transports (stdio, Streamable HTTP)** (M05) | M11 (11.5: SSE deprecated, correct transports), M12 (implicit: pipeline connectivity) | Transport details surface in deployment considerations |
| **MCP tool schemas** (M05-06) | M09 (9.4: structured output similar to tool schemas), M10 (10.4: tool scoping defense) | Schema discipline from MCP informs inter-agent communication |
| **Prompt engineering basics** (M04) | M08 (8.1: meta-prompting extends prompt engineering), M11 (11.4: stack-specific prompts) | Foundation that meta-prompting and stack adaptation build upon |
| **Tool call sequences** (M03) | M10 (10.1: audit challenge), M12 (12.4: logging every tool call) | Reasoning traces inform observability design |
| **Reasoning traces** (M03) | M10 (10.1: audit reconstruction), M12 (12.4: non-deterministic paths) | Transparency concept applied to production debugging |

---

## Dependency Chain Analysis

### Critical Path

The critical path is the longest prerequisite chain from foundational concepts to the capstone:

```
M01: PRAO loop
  → M02: CLAUDE.md + settings.json + claude -p
    → M04: TCEF prompt pattern
      → M07: Skills & Commands (TCEF becomes skill body)
        → M08: Meta-Prompting (generates skills at scale)
          → M09: Multi-Agent (composes skills via orchestration)
            → M10: Security (bounds everything with permissions + approval)
              → M11: Stack Adaptation (grounds everything in real tech stack)
                → M12: Capstone (integrates all into production pipeline)
```

**Length**: 10 modules (M01 → M12), nearly the full course is on the critical path.

**Bottleneck concepts**: TCEF (M04) and CLAUDE.md (M02) are the two concepts with the highest downstream dependency count. If a learner does not internalize these, M07-M12 become increasingly difficult.

### Convergence Points (multiple threads merging)

1. **Module 07 (Skills)**: Converges TCEF (M04) + CLAUDE.md (M02) into a new artifact type (skill files)
2. **Module 09 (Multi-Agent)**: Converges PRAO (M01) + MCP (M05) + Skills (M07) into orchestration patterns
3. **Module 10 (Security)**: Converges settings.json (M02) + MCP (M05) + CLAUDE.md (M02) into security framework
4. **Module 11 (Stack Adaptation)**: Converges CLAUDE.md (M02) + TCEF (M04) + Skills (M07) + MCP (M05-06) into organizational deployment
5. **Module 12 (Capstone)**: Grand convergence of all threads into integrated pipeline design

### Forward References

| From | To | Concept | Nature |
|------|----|---------|--------|
| M07 (7.5) | M09 | Parallel composition uses "Agent tool" | Forward reference to multi-agent patterns |
| M09 (9.5) | M10 | Scope creep | Introduced in M09, deepened as security concern in M10 |
| M11 (11.5) | M12 | Observability verification | Checklist item that foreshadows full observability design in M12 |
| M08 (8.5) | M10 | Confabulation risk | Foreshadows prompt injection and trust hierarchy |

### Orphan Concepts

| Concept | Module | Observation |
|---------|--------|-------------|
| Instructor vs. student environments | M10 (10.2) | Mentioned once, never revisited in M11-12. Relevant to course delivery but not to the production pipeline narrative. |
| $ARGUMENTS template variable | M07 (7.4) | Introduced but no complex worked example. Used only in simple pass-through scenarios. |
| SSE transport deprecation | M11 (11.5) | Mentioned as a checklist item but not explained in depth. Relies on M05 for context. |
| Regression test set (20-50 inputs) | M12 (12.5) | Introduced late with no worked example of creating one. High-value concept with minimal guidance. |
| Data Quality Monitor archetype | M12 (12.1) | Listed as an archetype but not elaborated beyond a paragraph. |

---

## Capstone Integration Analysis (Module 12)

Module 12 explicitly integrates concepts from every prior module. Here is the convergence map:

| M12 Component | Draws From | Specific Concepts Converging |
|---------------|-----------|------------------------------|
| **Integrated pipeline view** | M01-M11 | PRAO, TCEF, MCP, Skills, Multi-agent, Permissions, Secrets, Stack adaptation |
| **Five pipeline components** | M01, M02, M04, M05, M10 | Trigger (PRAO Perceive), Context gathering (CLAUDE.md + MCP), Decision logic (TCEF), Action scope (Permissions), Output delivery (new) |
| **Phase 1: Problem scoping** | New + M02 | Trigger specification, success criteria, value chain (new concepts grounded in M02 foundations) |
| **Phase 2: Pipeline architecture** | M09, M05 | Agent allocation (M09 decision framework), Interface specs (M09 schema design), Component diagram (new) |
| **Phase 3: Prompt and skill design** | M04, M07 | Core TCEF prompt (M04), Skill identification (M07), Output schema (M09 JSON fields) |
| **Phase 4: Safety design** | M10 | Permission audit, Secrets audit, Approval gate placement, Blast radius analysis |
| **Phase 5: Observability** | New (M11 foreshadowed) | Session ID, Structured logging, Trace correlation, Alerting, Incident response |
| **Deployment checklist** | M10, M11 | Extended from M11's organizational checklist with M10's security audits |
| **Maintenance & evolution** | M07, M08, M04 | Skill versioning (extends M07), Prompt drift (extends M04), Library growth (extends M08) |

**Concepts NOT explicitly referenced in M12** (potential gaps):
- Reasoning traces (M03) — not explicitly mentioned in the capstone design process, though implicitly assumed
- Extended thinking (M03) — not referenced
- GCCF pattern (M04) — superseded by TCEF, appropriately absent
- MCP primitive selection framework (M06) — assumed rather than re-invoked in pipeline design

---

## Concept Gaps Between Modules

| Gap Location | Missing Transition | Impact |
|-------------|-------------------|--------|
| **M07 → M08** | No explicit bridge from "writing skills manually" to "why you might want to generate them programmatically" | The transition is abrupt; M08's opener assumes the learner already sees the scaling problem with manual skill authoring |
| **M08 → M09** | Meta-prompting and multi-agent are largely independent threads; no explicit connection | Learners may not see that meta-prompting can generate the prompts that multi-agent orchestrators use. M08's skill generator could naturally feed M09's sub-agent prompt design. |
| **M09 → M10** | Scope creep is introduced in M09.5 as a failure mode and then re-introduced in M10.1 as a risk category without acknowledging the M09 introduction | Minor redundancy; a cross-reference would strengthen the lattice |
| **M10 → M11** | No transition from "security as constraint" to "adaptation as context" | M10 ends with audit trails; M11 opens with "why demos fail in production" — these are both about production readiness but from completely different angles. A bridging sentence would help. |
| **M11 → M12** | M11's deployment checklist (11.5) is a subset of M12's deployment checklist (12.3) with no explicit acknowledgment | Learners may wonder if these are the same checklist or different. M12 should explicitly state it extends M11's checklist. |
| **All modules** | No explicit concept map or dependency visualization for learners | Learners have no way to see the full knowledge lattice. Each module only links to the previous and next module. |

---

## Worked Example Coverage

| Concept | Has Worked Example? | Module | Quality |
|---------|-------------------|--------|---------|
| Skill file (complete security review) | Yes | M07 (7.2) | Distinguished — complete YAML + body |
| Skill quality spectrum (4 levels) | Yes | M07 (7.3) | Good — shows progression from vague to complete |
| Ship-feature pipeline (3-composition) | Yes | M07 (7.5) | Good — combines sequential + parallel + conditional |
| Slash command with $ARGUMENTS | Yes | M07 (7.4) | Adequate — basic example only |
| Meta-prompt for skill generation | Yes | M08 (8.2) | Good — complete meta-prompt shown |
| Automated evaluation CLI pipeline | Yes | M08 (8.3) | Good — full bash pipeline with 4 steps |
| Skill generator meta-prompt | Yes | M08 (8.4) | Distinguished — meta-skill as a skill file |
| Inter-agent JSON schema | Yes | M09 (9.4) | Good — complete with all 5 required fields |
| Decomposition worksheet | Yes | M09 (9.3) | Good — complete template |
| Contradictory findings escalation JSON | Yes | M09 (9.5) | Good — complete JSON structure |
| Fan-out/fan-in ASCII diagram | Yes | M09 (9.2) | Adequate — clear but simple |
| settings.json (3 profiles: dev, read-only, CI) | Yes | M10 (10.2) | Distinguished — three complete, production-grade configs |
| Prompt injection examples (file + web) | Yes | M10 (10.4) | Good — two concrete attack scenarios |
| Trust hierarchy in CLAUDE.md | Yes | M10 (10.4) | Good — complete CLAUDE.md section |
| "Show me the plan" approval gate | Yes | M10 (10.5) | Good — complete CLAUDE.md instruction |
| Audit trail JSON record | Yes | M10 (10.5) | Good — complete JSON with all fields |
| .env protocol | Yes | M10 (10.3) | Adequate — basic but clear |
| Context7 pre-loading workflow | Yes | M11 (11.2) | Good — 3-step workflow with prep script |
| Stack-specific CLAUDE.md (5 stacks) | Yes | M11 (11.3) | Distinguished — five complete, realistic configs |
| Stack-specific TCEF example (FastAPI) | Yes | M11 (11.4) | Good — concrete before/after |
| Go error handling skill | Yes | M11 (11.4) | Good — complete skill with code examples |
| Organizational deployment checklist | Yes | M11 (11.5) | Good — 7 categories of checkboxes |
| Pipeline archetypes (5 types) | Partial | M12 (12.1) | Adequate — described in prose, no full specifications |
| Structured log event JSON | Yes | M12 (12.4) | Good — complete JSON with all fields |
| Incident response playbook | Yes | M12 (12.4) | Good — 5-minute timeline |
| Skill versioning YAML | Yes | M12 (12.5) | Adequate — brief example |
| Skill contribution workflow | No | M12 (12.5) | Described in prose; no concrete example of proposal/review/test cycle |
| Regression test set creation | No | M12 (12.5) | Concept introduced without example of what a test set looks like |
| Model update behavioral comparison | No | M12 (12.5) | Process described without a concrete comparison example |
| Full capstone pipeline design | No | M12 (12.2) | The five phases are described but no worked-through example of all five phases applied to one problem |

---

## Meta-Observation (duplicate)

### Observation Quality Assessment

**What went well in this observation:**

1. **Module structure was highly parse-able.** Every module follows a consistent pattern (Overview → Learning Objectives → numbered sections → Lab Connection → Do/Don't → Further Reading), making concept extraction systematic rather than interpretive.

2. **Concepts were overwhelmingly explicit.** Unlike many course materials where key ideas are buried in prose, this course names its concepts clearly: TCEF, PRAO, "Show me the plan" pattern, fan-out/fan-in. This made the registry construction straightforward.

3. **Back-references were trackable.** When M07 references TCEF from M04, it names it explicitly. When M10 deepens settings.json from M02, the connection is clear. The knowledge lattice is not hidden.

**Where concepts were implicit rather than explicit:**

1. **Module 12's integration assumption.** M12 assumes learners can mentally compose all prior concepts but provides no visual concept map or dependency diagram. The "eight composing components" are listed but their interdependencies are not shown.

2. **The PRAO → observability connection.** M12's observability design (logging tool calls, tracing sessions) is directly derived from M01's PRAO model (each tool call is an Act phase, each observation is logged), but this connection is never made explicit.

3. **Meta-prompting's relationship to multi-agent.** M08 and M09 are presented as independent modules, but meta-prompting could generate the system prompts for sub-agents in M09's orchestrator patterns. This composition is never stated.

**Concepts used before formal introduction:**

1. **Agent tool** is referenced in M07 (7.5, parallel composition) before multi-agent systems are formally covered in M09. The concept works in context but is not formally defined until M09.

2. **Scope creep** appears in M09 (9.5) as a multi-agent failure mode and then in M10 (10.1) as a security risk category. Both treatments are valid but neither acknowledges the other.

**Tightness of coupling between M07-12 and M01-06:**

The coupling is **strong and well-structured**. M07-12 cannot stand alone without M01-06:
- M07 requires TCEF (M04) and CLAUDE.md (M02) as absolute prerequisites
- M08 requires TCEF (M04) as the generation target
- M09 requires PRAO (M01), MCP (M05), and context window (M02)
- M10 requires settings.json (M02) and MCP (M05)
- M11 requires CLAUDE.md (M02), TCEF (M04), MCP (M05-06), and Skills (M07)
- M12 requires every prior module

The two most referenced concepts from M01-06 are **CLAUDE.md** (M02) and **TCEF** (M04). These are the twin pillars that M07-12 build upon. A learner who doesn't internalize these two concepts will struggle with every subsequent module.

**Observations about the observation itself:**

- The concept count may be slightly inflated in M12 because integration concepts (which recombine prior concepts) are counted as new introductions. A stricter counting would reduce M12's count by approximately 15-20 concepts that are primarily recombinations.
- The "orphan concepts" identified are genuinely orphaned — they appear once and don't contribute to subsequent module content. However, some (like instructor/student environments) serve the course delivery use case rather than the conceptual narrative, so their orphan status is intentional.
- The most significant finding is the **absence of a capstone worked example**. M12 describes a five-phase design process but never walks through all five phases applied to one concrete problem. This is the single largest pedagogical gap in M07-12.
