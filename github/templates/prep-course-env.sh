#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# prep-course-env.sh
# Agentic AI Engineering Course — Environment Preparation Script
#
# Prepares a class environment with:
#   1. Validated Claude Code installation
#   2. Tech-stack-specific Context7 documentation pre-loading
#   3. Sandbox directory structure
#   4. settings.json permission configuration
#   5. CLAUDE.md seeded with org context
#
# Usage:
#   ./prep-course-env.sh [OPTIONS]
#
# Options:
#   --stack STACK         Comma-separated tech stacks to pre-load (required)
#   --env ENV             Environment type: student | instructor (default: student)
#   --org-name NAME       Organization name for CLAUDE.md header
#   --work-dir DIR        Working directory to set up (default: ./course-workspace)
#   --dry-run             Show what would be done without doing it
#   --help                Show this help message
#
# Examples:
#   ./prep-course-env.sh --stack "nextjs,postgres,docker" --org-name "Acme Corp"
#   ./prep-course-env.sh --stack "fastapi,sqlalchemy,redis" --env instructor
#   ./prep-course-env.sh --stack "spring-boot,postgresql" --dry-run
#
# Supported stacks (Context7 library IDs):
#   nextjs, react, typescript, nodejs, express
#   fastapi, pydantic, sqlalchemy, python
#   spring-boot, java
#   rails, ruby
#   go (stdlib)
#   postgres, mysql, mongodb, redis
#   docker, kubernetes
#   terraform
#   model-context-protocol, claude-code
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

# ─── Defaults ─────────────────────────────────────────────────────────────────
STACKS=""
ENV_TYPE="student"
ORG_NAME="Your Organization"
WORK_DIR="./course-workspace"
DRY_RUN=false
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COURSE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# ─── Colors ───────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

# ─── Helpers ──────────────────────────────────────────────────────────────────
log_step()  { echo -e "${BLUE}${BOLD}▶${RESET} $1"; }
log_ok()    { echo -e "${GREEN}  ✓${RESET} $1"; }
log_warn()  { echo -e "${YELLOW}  ⚠${RESET} $1"; }
log_error() { echo -e "${RED}  ✗${RESET} $1" >&2; }
log_info()  { echo -e "${CYAN}  →${RESET} $1"; }
dry_run()   { echo -e "${YELLOW}  [DRY RUN]${RESET} $1"; }

run() {
  if [ "$DRY_RUN" = true ]; then
    dry_run "$*"
  else
    "$@"
  fi
}

# ─── Argument Parsing ─────────────────────────────────────────────────────────
usage() {
  grep '^#' "$0" | grep -v '^#!/' | sed 's/^# \{0,2\}//'
  exit 0
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --stack)     STACKS="$2"; shift 2 ;;
    --env)       ENV_TYPE="$2"; shift 2 ;;
    --org-name)  ORG_NAME="$2"; shift 2 ;;
    --work-dir)  WORK_DIR="$2"; shift 2 ;;
    --dry-run)   DRY_RUN=true; shift ;;
    --help|-h)   usage ;;
    *) log_error "Unknown option: $1"; exit 1 ;;
  esac
done

if [ -z "$STACKS" ]; then
  log_error "Required: --stack <stack1,stack2,...>"
  echo "Example: ./prep-course-env.sh --stack \"nextjs,postgres,docker\""
  exit 1
fi

# ─── Stack → Context7 Library ID Mapping ─────────────────────────────────────
declare -A CTX7_IDS=(
  ["nextjs"]="/vercel/next.js"
  ["react"]="/facebook/react"
  ["typescript"]="/microsoft/typescript"
  ["nodejs"]="/nodejs/node"
  ["express"]="/expressjs/express"
  ["fastapi"]="/tiangolo/fastapi"
  ["pydantic"]="/pydantic/pydantic"
  ["sqlalchemy"]="/sqlalchemy/sqlalchemy"
  ["python"]="/python/cpython"
  ["spring-boot"]="/spring-projects/spring-boot"
  ["rails"]="/rails/rails"
  ["go"]="/golang/go"
  ["postgres"]="/postgres/postgres"
  ["redis"]="/redis/redis"
  ["docker"]="/docker/cli"
  ["kubernetes"]="/kubernetes/kubernetes"
  ["terraform"]="/hashicorp/terraform"
  ["model-context-protocol"]="/modelcontextprotocol/specification"
  ["claude-code"]="anthropic/claude-code"
)

# ─── Validation ───────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}Agentic AI Engineering Course — Environment Preparation${RESET}"
echo -e "${CYAN}────────────────────────────────────────────────────────${RESET}"
echo ""

log_step "Validating prerequisites..."

# Check Claude Code
if ! command -v claude &>/dev/null; then
  log_error "Claude Code not found. Install: https://claude.ai/code"
  exit 1
fi
log_ok "Claude Code: $(claude --version 2>/dev/null | head -1 || echo 'installed')"

# Check Node.js (for MCP servers)
if command -v node &>/dev/null; then
  log_ok "Node.js: $(node --version)"
else
  log_warn "Node.js not found — some MCP demo servers won't run"
fi

# Check Python
if command -v python3 &>/dev/null; then
  log_ok "Python: $(python3 --version)"
else
  log_warn "Python 3 not found — Python-based examples won't run"
fi

echo ""

# ─── Step 1: Create Directory Structure ───────────────────────────────────────
log_step "Creating workspace structure at $WORK_DIR..."

DIRS=(
  "$WORK_DIR"
  "$WORK_DIR/sandbox/experiments"
  "$WORK_DIR/sandbox/outputs"
  "$WORK_DIR/sandbox/mcp-servers"
  "$WORK_DIR/logs"
  "$WORK_DIR/.claude/skills"
  "$WORK_DIR/.claude/commands"
)

for dir in "${DIRS[@]}"; do
  run mkdir -p "$dir"
  log_info "Created: $dir"
done

# ─── Step 2: Copy Sandbox Config ──────────────────────────────────────────────
log_step "Configuring sandbox permissions ($ENV_TYPE environment)..."

CONFIG_FILE="$COURSE_ROOT/sandbox/config/${ENV_TYPE}.yaml"
if [ ! -f "$CONFIG_FILE" ] && [ "$ENV_TYPE" != "student" ]; then
  CONFIG_FILE="$COURSE_ROOT/sandbox/config/restricted.yaml"
  log_warn "Config for '$ENV_TYPE' not found, using restricted.yaml"
fi

if [ -f "$CONFIG_FILE" ]; then
  run cp "$CONFIG_FILE" "$WORK_DIR/.claude/sandbox-config.yaml"
  log_ok "Sandbox config copied from $CONFIG_FILE"
else
  log_warn "No sandbox config found at $CONFIG_FILE — using defaults"
fi

# Generate settings.json from config
SETTINGS_FILE="$WORK_DIR/.claude/settings.json"

if [ "$ENV_TYPE" = "instructor" ]; then
  SETTINGS_CONTENT='{
  "permissions": {
    "allow": ["Read", "Write(demo/**)", "Write(src/**)", "Bash(git *)", "Bash(node *)", "Bash(python3 *)", "Bash(npm *)"],
    "deny": ["Bash(rm -rf *)", "Write(*.env)", "Write(**/secrets/**)"]
  }
}'
else
  SETTINGS_CONTENT='{
  "permissions": {
    "allow": ["Read", "Write(sandbox/experiments/**)", "Write(sandbox/outputs/**)", "Bash(git status)", "Bash(git diff *)", "Bash(cat *)", "Bash(ls *)", "Bash(node *)", "Bash(python3 *)", "Bash(npm test)"],
    "deny": ["Bash(rm *)", "Bash(curl *)", "Bash(git push *)", "Write(*.env)", "Write(package.json)"]
  }
}'
fi

if [ "$DRY_RUN" = true ]; then
  dry_run "Write settings.json to $SETTINGS_FILE"
else
  echo "$SETTINGS_CONTENT" > "$SETTINGS_FILE"
  log_ok "settings.json written ($ENV_TYPE profile)"
fi

# ─── Step 3: Seed CLAUDE.md ───────────────────────────────────────────────────
log_step "Seeding CLAUDE.md with org context..."

CLAUDE_MD="$WORK_DIR/CLAUDE.md"
STACKS_LIST=$(echo "$STACKS" | tr ',' ', ')

if [ "$DRY_RUN" = false ]; then
cat > "$CLAUDE_MD" << EOF
# $ORG_NAME — Agentic AI Engineering Course Workspace

## Context
This is the course workspace for $ORG_NAME's Agentic AI Engineering training.
Tech stack: $STACKS_LIST

## Environment
- Sandbox directory: sandbox/ (your safe working area)
- Experiments: sandbox/experiments/
- Outputs: sandbox/outputs/

## Stack Context
EOF

# Append stack-specific context
IFS=',' read -ra STACK_ARRAY <<< "$STACKS"
for stack in "${STACK_ARRAY[@]}"; do
  stack=$(echo "$stack" | tr -d ' ')
  case "$stack" in
    nextjs)   echo "- Framework: Next.js (App Router) with TypeScript strict mode" >> "$CLAUDE_MD" ;;
    fastapi)  echo "- Framework: FastAPI with Pydantic v2, async/await throughout" >> "$CLAUDE_MD" ;;
    spring*)  echo "- Framework: Spring Boot 3.x with Java 21 records and virtual threads" >> "$CLAUDE_MD" ;;
    rails)    echo "- Framework: Rails 7 with Hotwire (Turbo + Stimulus)" >> "$CLAUDE_MD" ;;
    postgres) echo "- Database: PostgreSQL — raw SQL preferred over ORM where possible" >> "$CLAUDE_MD" ;;
    redis)    echo "- Cache: Redis — use for session storage and rate limiting" >> "$CLAUDE_MD" ;;
    docker)   echo "- Containers: Docker + docker-compose for local development" >> "$CLAUDE_MD" ;;
    *)        echo "- $stack: see official documentation" >> "$CLAUDE_MD" ;;
  esac
done

cat >> "$CLAUDE_MD" << 'EOF'

## Course Labs
Complete labs in order: Lab 01 → Lab 09
Open lab HTML files in your browser from: labs/day1/, labs/day2/, labs/day3/

## Important
- All your work goes in sandbox/experiments/ or sandbox/outputs/
- Never write to .env files
- Ask Claude Code questions — it's the tool you're learning to use
EOF

  log_ok "CLAUDE.md seeded with $ORG_NAME context and $STACKS_LIST stack"
fi

# ─── Step 4: Context7 Documentation Pre-loading ───────────────────────────────
log_step "Pre-loading Context7 documentation for: $STACKS..."

echo ""
echo -e "${CYAN}  Context7 library IDs for your stack:${RESET}"

IFS=',' read -ra STACK_ARRAY <<< "$STACKS"
MISSING_STACKS=()

for stack in "${STACK_ARRAY[@]}"; do
  stack=$(echo "$stack" | tr -d ' ')
  if [ -n "${CTX7_IDS[$stack]+_}" ]; then
    log_info "$stack → ${CTX7_IDS[$stack]}"
  else
    log_warn "$stack → (no Context7 mapping — add manually)"
    MISSING_STACKS+=("$stack")
  fi
done

echo ""
log_info "To pre-load in Claude Code, run these /ctx7 commands:"
echo ""

for stack in "${STACK_ARRAY[@]}"; do
  stack=$(echo "$stack" | tr -d ' ')
  if [ -n "${CTX7_IDS[$stack]+_}" ]; then
    echo -e "    ${CYAN}/ctx7 ${CTX7_IDS[$stack]}${RESET}"
  fi
done

echo ""
log_info "Always include model-context-protocol and claude-code:"
echo -e "    ${CYAN}/ctx7 /modelcontextprotocol/specification${RESET}"
echo -e "    ${CYAN}/ctx7 anthropic/claude-code${RESET}"
echo ""

# ─── Step 5: Copy Course Skills ───────────────────────────────────────────────
log_step "Installing course skills..."

SKILLS_SOURCE="$COURSE_ROOT/github/templates"
if [ -d "$SKILLS_SOURCE" ]; then
  for skill_file in "$SKILLS_SOURCE"/*.md; do
    if [ -f "$skill_file" ] && [[ "$(basename "$skill_file")" == *"-template.md" ]]; then
      # Templates stay as templates — don't copy to skills dir
      log_info "Template available: $(basename "$skill_file") (not copied — use as reference)"
    fi
  done
  log_ok "Skills directory ready at $WORK_DIR/.claude/skills/"
else
  log_warn "Skills source directory not found: $SKILLS_SOURCE"
fi

# ─── Step 6: Summary ──────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}✓ Environment ready${RESET}"
echo -e "${CYAN}────────────────────────────────────────────────────────${RESET}"
echo ""
echo -e "  ${BOLD}Workspace:${RESET}    $WORK_DIR"
echo -e "  ${BOLD}Environment:${RESET}  $ENV_TYPE"
echo -e "  ${BOLD}Org:${RESET}          $ORG_NAME"
echo -e "  ${BOLD}Stack:${RESET}        $STACKS_LIST"
echo ""
echo -e "  ${BOLD}Next steps:${RESET}"
echo -e "    1. ${CYAN}cd $WORK_DIR${RESET}"
echo -e "    2. ${CYAN}claude${RESET}  (start an interactive session)"
echo -e "    3. Run the /ctx7 commands shown above to load docs"
echo -e "    4. Open labs/day1/lab-01-paradigm-shift.html in your browser"
echo ""

if [ ${#MISSING_STACKS[@]} -gt 0 ]; then
  echo -e "  ${YELLOW}${BOLD}Missing stack mappings:${RESET} ${MISSING_STACKS[*]}"
  echo -e "  Add these to CTX7_IDS in this script or load docs manually."
  echo ""
fi

if [ "$DRY_RUN" = true ]; then
  echo -e "  ${YELLOW}${BOLD}DRY RUN — no files were modified.${RESET}"
  echo -e "  Remove --dry-run to apply changes."
  echo ""
fi
