"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── Virtual filesystem ──────────────────────────────────────────────
interface FSNode {
  type: "file" | "dir";
  content?: string;
  children?: Record<string, FSNode>;
}

const FILESYSTEM: FSNode = {
  type: "dir",
  children: {
    home: {
      type: "dir",
      children: {
        shiva: {
          type: "dir",
          children: {
            "about.txt": {
              type: "file",
              content:
                "Name: Shiva\nRole: Software Engineer\nLocation: San Francisco, CA\nShell: fish\nEditor: Emacs / Neovim\n\n\"Any sufficiently advanced technology is indistinguishable from magic.\"",
            },
            ".secret": {
              type: "file",
              content:
                "You found a hidden file! Here's a cookie: 🍪\n\nTry running: matrix, hack, or wisdom",
            },
            projects: {
              type: "dir",
              children: {
                "nexus.txt": {
                  type: "file",
                  content:
                    "Nexus - A modern project management tool\nStack: Go, React, PostgreSQL",
                },
                "hush.txt": {
                  type: "file",
                  content:
                    "Hush - Privacy-first messaging\nStack: Elixir, Phoenix, E2EE",
                },
                "rmbg.txt": {
                  type: "file",
                  content:
                    "RMBG - AI background removal\nStack: Python, PyTorch, FastAPI",
                },
              },
            },
            music: {
              type: "dir",
              children: {
                "playlist.txt": {
                  type: "file",
                  content:
                    "Now playing: Lo-fi beats to code to\n\n1. Nujabes - Feather\n2. J Dilla - So Far to Go\n3. Tame Impala - Let It Happen\n4. Khruangbin - Time (You and I)\n5. Bonobo - Kerala",
                },
              },
            },
            games: {
              type: "dir",
              children: {
                "README.md": {
                  type: "file",
                  content:
                    'Games available in this terminal:\n\n- Type "snake" to play Snake\n- Type "quiz" for a tech trivia quiz\n- Type "rps" for Rock Paper Scissors\n- Type "8ball" to ask the magic 8-ball\n- Type "flip" to flip a coin',
                },
              },
            },
          },
        },
      },
    },
    etc: {
      type: "dir",
      children: {
        "motd": {
          type: "file",
          content:
            "Welcome to shiva.computer\n\nThis is an interactive terminal playground.\nType 'help' to see available commands.\nType 'ls' to explore the filesystem.\n\nHave fun!",
        },
      },
    },
  },
};

function resolvePath(cwd: string, target: string): string {
  if (target === "/") return "/";
  if (target === "~") return "/home/shiva";
  if (target.startsWith("~/")) target = "/home/shiva/" + target.slice(2);
  const base = target.startsWith("/") ? [] : cwd.split("/").filter(Boolean);
  const parts = target.split("/").filter(Boolean);
  for (const p of parts) {
    if (p === "..") base.pop();
    else if (p !== ".") base.push(p);
  }
  return "/" + base.join("/");
}

function getNode(path: string): FSNode | null {
  if (path === "/") return FILESYSTEM;
  const parts = path.split("/").filter(Boolean);
  let node: FSNode = FILESYSTEM;
  for (const p of parts) {
    if (!node.children || !node.children[p]) return null;
    node = node.children[p];
  }
  return node;
}

// ── ASCII art ───────────────────────────────────────────────────────
const BANNER = `
┌─────────────────────────────────────────────────────┐
│                                                     │
│   ███████╗██╗  ██╗██╗██╗   ██╗ █████╗              │
│   ██╔════╝██║  ██║██║██║   ██║██╔══██╗             │
│   ███████╗███████║██║██║   ██║███████║             │
│   ╚════██║██╔══██║██║╚██╗ ██╔╝██╔══██║             │
│   ███████║██║  ██║██║ ╚████╔╝ ██║  ██║             │
│   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝             │
│                                                     │
│   Interactive Terminal Playground                    │
│   Type 'help' to get started                        │
│                                                     │
└─────────────────────────────────────────────────────┘`;

const HELP_TEXT = `
Available commands:

  Navigation
    ls [path]        List directory contents
    cd <path>        Change directory
    cat <file>       Read file contents
    pwd              Print working directory
    tree [path]      Show directory tree

  Info
    whoami           Display current user
    hostname         Show hostname
    date             Show current date/time
    uptime           Show how long you've been here
    uname            System information
    history          Show command history
    clear            Clear the terminal

  Fun & Games
    snake            Play Snake in the terminal
    quiz             Tech trivia quiz
    rps              Rock Paper Scissors
    8ball <question>  Ask the magic 8-ball
    flip             Flip a coin
    roll [NdN]       Roll dice (e.g. roll 2d6)
    fortune          Random fortune cookie
    cowsay <text>    Make a cow say things
    ascii <text>     Big ASCII text
    weather          Current "weather" report

  Easter Eggs
    matrix           Enter the Matrix
    hack             Hack the mainframe
    wisdom           Ancient wisdom
    sudo <cmd>       Try it. I dare you.
    rm -rf /         What could go wrong?
    exit             Try to leave

  Type any command to begin...
`;

const WISDOMS = [
  '"Programs must be written for people to read, and only incidentally for machines to execute." — Abelson & Sussman',
  '"Simplicity is prerequisite for reliability." — Dijkstra',
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
  '"The best error message is the one that never shows up." — Thomas Fuchs',
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
  '"Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"The most disastrous thing that you can ever learn is your first programming language." — Alan Kay',
  '"Computers are good at following instructions, but not at reading your mind." — Donald Knuth',
];

const FORTUNES = [
  "You will mass-refactor and everything will pass on the first try.",
  "A segfault in your future, there is. But also enlightenment.",
  "The bug you seek is on line 42. It's always line 42.",
  "npm install will complete without warnings today. Just kidding.",
  "Your PR will be approved with no comments. (In a parallel universe.)",
  "You will finally understand monads. (Narrator: they did not.)",
  "The deployment will succeed. Trust the process.",
  "A wild race condition appears! You have +5 caffeine to deal with it.",
  "Your code will run perfectly in production. On the second try.",
  "The answer you seek is in the documentation you didn't read.",
];

const EIGHT_BALL = [
  "It is certain.",
  "Without a doubt.",
  "You may rely on it.",
  "Yes, definitely.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
];

const QUIZ_QUESTIONS = [
  {
    q: "What does HTML stand for?",
    choices: [
      "A) Hyper Text Markup Language",
      "B) High Tech Modern Language",
      "C) Hyper Transfer Markup Language",
    ],
    answer: "a",
    explanation: "HTML = Hyper Text Markup Language, created by Tim Berners-Lee in 1993.",
  },
  {
    q: "Which language was created by Yukihiro Matsumoto?",
    choices: ["A) Python", "B) Ruby", "C) Perl"],
    answer: "b",
    explanation: 'Ruby was created by Matz in 1995. He wanted a language that was "more powerful than Perl and more object-oriented than Python."',
  },
  {
    q: "What year was the first version of Linux released?",
    choices: ["A) 1989", "B) 1991", "C) 1993"],
    answer: "b",
    explanation: "Linux 0.01 was released September 17, 1991 by Linus Torvalds.",
  },
  {
    q: "What does REST stand for?",
    choices: [
      "A) Representational State Transfer",
      "B) Remote Execution Service Technology",
      "C) Reliable Endpoint Service Transport",
    ],
    answer: "a",
    explanation: "REST was defined by Roy Fielding in his 2000 PhD dissertation.",
  },
  {
    q: "Which company created the Go programming language?",
    choices: ["A) Microsoft", "B) Apple", "C) Google"],
    answer: "c",
    explanation: "Go was designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson.",
  },
  {
    q: "What is the time complexity of binary search?",
    choices: ["A) O(n)", "B) O(log n)", "C) O(n log n)"],
    answer: "b",
    explanation: "Binary search halves the search space each step, giving O(log n).",
  },
  {
    q: "Which protocol does HTTPS use for encryption?",
    choices: ["A) SSH", "B) TLS/SSL", "C) IPSec"],
    answer: "b",
    explanation: "HTTPS uses TLS (Transport Layer Security), the successor to SSL.",
  },
  {
    q: "Who is known as the father of computer science?",
    choices: ["A) Alan Turing", "B) John von Neumann", "C) Charles Babbage"],
    answer: "a",
    explanation: "Alan Turing formalized computation with the Turing machine in 1936.",
  },
];

// ── Snake game ──────────────────────────────────────────────────────
const SNAKE_WIDTH = 30;
const SNAKE_HEIGHT = 15;

interface SnakeState {
  snake: { x: number; y: number }[];
  food: { x: number; y: number };
  dir: { x: number; y: number };
  score: number;
  gameOver: boolean;
  intervalId?: ReturnType<typeof setInterval>;
}

function initSnake(): SnakeState {
  const mid = { x: Math.floor(SNAKE_WIDTH / 2), y: Math.floor(SNAKE_HEIGHT / 2) };
  return {
    snake: [mid, { x: mid.x - 1, y: mid.y }, { x: mid.x - 2, y: mid.y }],
    food: spawnFood([mid, { x: mid.x - 1, y: mid.y }, { x: mid.x - 2, y: mid.y }]),
    dir: { x: 1, y: 0 },
    score: 0,
    gameOver: false,
  };
}

function spawnFood(snake: { x: number; y: number }[]): { x: number; y: number } {
  let pos: { x: number; y: number };
  do {
    pos = {
      x: Math.floor(Math.random() * SNAKE_WIDTH),
      y: Math.floor(Math.random() * SNAKE_HEIGHT),
    };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
}

function renderSnakeFrame(state: SnakeState): string {
  const grid: string[][] = [];
  for (let y = 0; y < SNAKE_HEIGHT; y++) {
    grid[y] = [];
    for (let x = 0; x < SNAKE_WIDTH; x++) {
      grid[y][x] = " ";
    }
  }
  // Food
  grid[state.food.y][state.food.x] = "●";
  // Snake body
  for (let i = 1; i < state.snake.length; i++) {
    const s = state.snake[i];
    if (s.y >= 0 && s.y < SNAKE_HEIGHT && s.x >= 0 && s.x < SNAKE_WIDTH)
      grid[s.y][s.x] = "○";
  }
  // Snake head
  const head = state.snake[0];
  if (head.y >= 0 && head.y < SNAKE_HEIGHT && head.x >= 0 && head.x < SNAKE_WIDTH)
    grid[head.y][head.x] = "█";

  const top = "┌" + "─".repeat(SNAKE_WIDTH) + "┐";
  const bottom = "└" + "─".repeat(SNAKE_WIDTH) + "┘";
  const rows = grid.map((row) => "│" + row.join("") + "│").join("\n");
  return `${top}\n${rows}\n${bottom}\n Score: ${state.score}  ${state.gameOver ? "GAME OVER! Press 'q' to quit." : "WASD/Arrows to move, 'q' to quit"}`;
}

// ── Output line type ────────────────────────────────────────────────
interface OutputLine {
  id: number;
  type: "input" | "output" | "error" | "system" | "accent" | "matrix";
  text: string;
}

// ── Weather ─────────────────────────────────────────────────────────
function getWeather(): string {
  const conditions = [
    { icon: "☀️", desc: "Clear skies", temp: "72°F" },
    { icon: "🌤", desc: "Partly cloudy", temp: "68°F" },
    { icon: "🌧", desc: "Light rain", temp: "58°F" },
    { icon: "⛈", desc: "Thunderstorm", temp: "55°F" },
    { icon: "🌫", desc: "Foggy (classic SF)", temp: "61°F" },
    { icon: "🌈", desc: "Rainbow after rain", temp: "65°F" },
  ];
  const c = conditions[Math.floor(Math.random() * conditions.length)];
  return `
  ${c.icon}  Weather Report for shiva.computer
  ─────────────────────────────
  Condition : ${c.desc}
  Temp      : ${c.temp}
  Humidity  : ${Math.floor(Math.random() * 40 + 40)}%
  Wind      : ${Math.floor(Math.random() * 20 + 2)} mph
  CPU Temp  : ${Math.floor(Math.random() * 20 + 55)}°C
  Vibe      : immaculate`;
}

// ── Cowsay ──────────────────────────────────────────────────────────
function cowsay(text: string): string {
  const maxLen = 40;
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if (cur.length + w.length + 1 > maxLen) {
      lines.push(cur);
      cur = w;
    } else {
      cur = cur ? cur + " " + w : w;
    }
  }
  if (cur) lines.push(cur);

  const width = Math.max(...lines.map((l) => l.length));
  const top = " " + "_".repeat(width + 2);
  const bottom = " " + "-".repeat(width + 2);
  const body =
    lines.length === 1
      ? `< ${lines[0].padEnd(width)} >`
      : lines
          .map((l, i) => {
            const pad = l.padEnd(width);
            if (i === 0) return `/ ${pad} \\`;
            if (i === lines.length - 1) return `\\ ${pad} /`;
            return `| ${pad} |`;
          })
          .join("\n");

  return `${top}\n${body}\n${bottom}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
}

// ── Simple ASCII big text ───────────────────────────────────────────
const MINI_FONT: Record<string, string[]> = {
  A: ["  █  ", " █ █ ", "█████", "█   █", "█   █"],
  B: ["████ ", "█   █", "████ ", "█   █", "████ "],
  C: [" ████", "█    ", "█    ", "█    ", " ████"],
  D: ["████ ", "█   █", "█   █", "█   █", "████ "],
  E: ["█████", "█    ", "████ ", "█    ", "█████"],
  F: ["█████", "█    ", "████ ", "█    ", "█    "],
  G: [" ████", "█    ", "█  ██", "█   █", " ████"],
  H: ["█   █", "█   █", "█████", "█   █", "█   █"],
  I: ["█████", "  █  ", "  █  ", "  █  ", "█████"],
  J: ["█████", "   █ ", "   █ ", "█  █ ", " ██  "],
  K: ["█   █", "█  █ ", "███  ", "█  █ ", "█   █"],
  L: ["█    ", "█    ", "█    ", "█    ", "█████"],
  M: ["█   █", "██ ██", "█ █ █", "█   █", "█   █"],
  N: ["█   █", "██  █", "█ █ █", "█  ██", "█   █"],
  O: [" ███ ", "█   █", "█   █", "█   █", " ███ "],
  P: ["████ ", "█   █", "████ ", "█    ", "█    "],
  Q: [" ███ ", "█   █", "█ █ █", "█  █ ", " ██ █"],
  R: ["████ ", "█   █", "████ ", "█  █ ", "█   █"],
  S: [" ████", "█    ", " ███ ", "    █", "████ "],
  T: ["█████", "  █  ", "  █  ", "  █  ", "  █  "],
  U: ["█   █", "█   █", "█   █", "█   █", " ███ "],
  V: ["█   █", "█   █", "█   █", " █ █ ", "  █  "],
  W: ["█   █", "█   █", "█ █ █", "██ ██", "█   █"],
  X: ["█   █", " █ █ ", "  █  ", " █ █ ", "█   █"],
  Y: ["█   █", " █ █ ", "  █  ", "  █  ", "  █  "],
  Z: ["█████", "   █ ", "  █  ", " █   ", "█████"],
  " ": ["     ", "     ", "     ", "     ", "     "],
  "!": ["  █  ", "  █  ", "  █  ", "     ", "  █  "],
  "?": [" ███ ", "█   █", "  ██ ", "     ", "  █  "],
};

function asciiArt(text: string): string {
  const chars = text.toUpperCase().split("");
  const rows: string[] = ["", "", "", "", ""];
  for (const c of chars) {
    const glyph = MINI_FONT[c] || MINI_FONT["?"];
    for (let i = 0; i < 5; i++) {
      rows[i] += glyph[i] + " ";
    }
  }
  return rows.join("\n");
}

// ── Tree ────────────────────────────────────────────────────────────
function buildTree(node: FSNode, name: string, prefix: string, isLast: boolean): string {
  const connector = isLast ? "└── " : "├── ";
  let result = prefix + connector + name + (node.type === "dir" ? "/" : "") + "\n";
  if (node.type === "dir" && node.children) {
    const entries = Object.entries(node.children);
    entries.forEach(([childName, childNode], idx) => {
      const childIsLast = idx === entries.length - 1;
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      result += buildTree(childNode, childName, newPrefix, childIsLast);
    });
  }
  return result;
}

// ── Main Component ──────────────────────────────────────────────────
export function Playground() {
  const [lines, setLines] = useState<OutputLine[]>([]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("/home/shiva");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [lineId, setLineId] = useState(0);
  const [startTime] = useState(Date.now());
  const [snakeState, setSnakeState] = useState<SnakeState | null>(null);
  const [quizState, setQuizState] = useState<{ idx: number; score: number; total: number } | null>(null);
  const [rpsActive, setRpsActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const snakeRef = useRef<SnakeState | null>(null);

  const nextId = useCallback(() => {
    setLineId((prev) => prev + 1);
    return lineId + 1;
  }, [lineId]);

  const addLines = useCallback(
    (newLines: Omit<OutputLine, "id">[]) => {
      setLines((prev) => {
        let id = prev.length > 0 ? prev[prev.length - 1].id : 0;
        return [
          ...prev,
          ...newLines.map((l) => ({ ...l, id: ++id })),
        ];
      });
    },
    []
  );

  const prompt = `visitor@shiva:${cwd === "/home/shiva" ? "~" : cwd}$`;

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, snakeState]);

  // Show banner on mount
  useEffect(() => {
    addLines([
      { type: "accent", text: BANNER },
      { type: "system", text: "\n  Type 'help' to see available commands.\n" },
    ]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Snake game loop
  useEffect(() => {
    if (!snakeState || snakeState.gameOver) return;
    snakeRef.current = snakeState;
    const id = setInterval(() => {
      setSnakeState((prev) => {
        if (!prev || prev.gameOver) return prev;
        const head = prev.snake[0];
        const newHead = { x: head.x + prev.dir.x, y: head.y + prev.dir.y };
        // Wall collision
        if (newHead.x < 0 || newHead.x >= SNAKE_WIDTH || newHead.y < 0 || newHead.y >= SNAKE_HEIGHT) {
          return { ...prev, gameOver: true };
        }
        // Self collision
        if (prev.snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
          return { ...prev, gameOver: true };
        }
        const ate = newHead.x === prev.food.x && newHead.y === prev.food.y;
        const newSnake = [newHead, ...prev.snake];
        if (!ate) newSnake.pop();
        return {
          ...prev,
          snake: newSnake,
          food: ate ? spawnFood(newSnake) : prev.food,
          score: ate ? prev.score + 10 : prev.score,
        };
      });
    }, 120);
    return () => clearInterval(id);
  }, [snakeState?.gameOver, snakeState !== null]); // eslint-disable-line react-hooks/exhaustive-deps

  // Snake keyboard handler
  useEffect(() => {
    if (!snakeState) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Q" || e.key === "Escape") {
        setSnakeState(null);
        addLines([{ type: "system", text: `Snake game ended. Final score: ${snakeRef.current?.score ?? 0}` }]);
        setTimeout(() => inputRef.current?.focus(), 50);
        return;
      }
      setSnakeState((prev) => {
        if (!prev || prev.gameOver) {
          if (prev?.gameOver) {
            setSnakeState(null);
            addLines([{ type: "system", text: `Snake game ended. Final score: ${prev.score}` }]);
            setTimeout(() => inputRef.current?.focus(), 50);
          }
          return prev;
        }
        let dir = prev.dir;
        if ((e.key === "w" || e.key === "ArrowUp") && prev.dir.y !== 1) dir = { x: 0, y: -1 };
        if ((e.key === "s" || e.key === "ArrowDown") && prev.dir.y !== -1) dir = { x: 0, y: 1 };
        if ((e.key === "a" || e.key === "ArrowLeft") && prev.dir.x !== 1) dir = { x: -1, y: 0 };
        if ((e.key === "d" || e.key === "ArrowRight") && prev.dir.x !== -1) dir = { x: 1, y: 0 };
        return { ...prev, dir };
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [snakeState !== null]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Command handler ─────────────────────────────────────────────
  const handleCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      setHistory((prev) => [...prev, trimmed]);
      setHistoryIdx(-1);
      addLines([{ type: "input", text: `${prompt} ${trimmed}` }]);

      // Handle quiz mode
      if (quizState) {
        const answer = trimmed.toLowerCase();
        const q = QUIZ_QUESTIONS[quizState.idx];
        if (answer === "q") {
          addLines([{ type: "system", text: `Quiz ended. Score: ${quizState.score}/${quizState.total}` }]);
          setQuizState(null);
          return;
        }
        if (["a", "b", "c"].includes(answer)) {
          const correct = answer === q.answer;
          const newScore = correct ? quizState.score + 1 : quizState.score;
          const newTotal = quizState.total + 1;
          addLines([
            {
              type: correct ? "accent" : "error",
              text: correct ? `  ✓ Correct!` : `  ✗ Wrong! Answer was ${q.answer.toUpperCase()})`,
            },
            { type: "system", text: `  ${q.explanation}` },
          ]);
          // Next question or end
          const nextIdx = quizState.idx + 1;
          if (nextIdx < QUIZ_QUESTIONS.length) {
            const next = QUIZ_QUESTIONS[nextIdx];
            setQuizState({ idx: nextIdx, score: newScore, total: newTotal });
            addLines([
              { type: "output", text: `\n  Question ${nextIdx + 1}/${QUIZ_QUESTIONS.length}:` },
              { type: "accent", text: `  ${next.q}` },
              ...next.choices.map((c) => ({ type: "output" as const, text: `    ${c}` })),
              { type: "system", text: `\n  Type A, B, or C (or Q to quit):` },
            ]);
          } else {
            addLines([
              { type: "accent", text: `\n  Quiz complete! Final score: ${newScore}/${newTotal}` },
              {
                type: "system",
                text:
                  newScore === newTotal
                    ? "  Perfect score! You're a true hacker."
                    : newScore >= newTotal / 2
                    ? "  Not bad! Keep studying."
                    : "  Room for improvement. Hit the docs!",
              },
            ]);
            setQuizState(null);
          }
          return;
        }
        addLines([{ type: "error", text: "  Please answer A, B, C, or Q to quit." }]);
        return;
      }

      // Handle RPS mode
      if (rpsActive) {
        const choice = trimmed.toLowerCase();
        if (choice === "q") {
          addLines([{ type: "system", text: "  RPS ended." }]);
          setRpsActive(false);
          return;
        }
        if (["rock", "paper", "scissors", "r", "p", "s"].includes(choice)) {
          const map: Record<string, string> = { r: "rock", p: "paper", s: "scissors" };
          const player = map[choice] || choice;
          const options = ["rock", "paper", "scissors"];
          const cpu = options[Math.floor(Math.random() * 3)];
          let result: string;
          if (player === cpu) result = "It's a tie!";
          else if (
            (player === "rock" && cpu === "scissors") ||
            (player === "paper" && cpu === "rock") ||
            (player === "scissors" && cpu === "paper")
          )
            result = "You win!";
          else result = "You lose!";
          addLines([
            { type: "output", text: `  You: ${player}  vs  CPU: ${cpu}` },
            { type: result === "You win!" ? "accent" : result === "You lose!" ? "error" : "system", text: `  ${result}` },
            { type: "system", text: "\n  Play again? (rock/paper/scissors or Q to quit)" },
          ]);
          return;
        }
        addLines([{ type: "error", text: "  Type rock, paper, scissors (or r/p/s), or Q to quit." }]);
        return;
      }

      const [cmd, ...args] = trimmed.split(/\s+/);
      const arg = args.join(" ");

      switch (cmd.toLowerCase()) {
        case "help":
          addLines([{ type: "output", text: HELP_TEXT }]);
          break;

        case "clear":
          setLines([]);
          break;

        case "pwd":
          addLines([{ type: "output", text: `  ${cwd}` }]);
          break;

        case "whoami":
          addLines([{ type: "output", text: "  visitor" }]);
          break;

        case "hostname":
          addLines([{ type: "output", text: "  shiva.computer" }]);
          break;

        case "date":
          addLines([{ type: "output", text: `  ${new Date().toString()}` }]);
          break;

        case "uptime": {
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          const mins = Math.floor(elapsed / 60);
          const secs = elapsed % 60;
          addLines([{ type: "output", text: `  Session uptime: ${mins}m ${secs}s` }]);
          break;
        }

        case "uname":
          addLines([
            {
              type: "output",
              text: "  ShivaOS 4.2.0-playground #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux",
            },
          ]);
          break;

        case "history":
          addLines(
            history.length > 0
              ? history.map((h, i) => ({ type: "output" as const, text: `  ${(i + 1).toString().padStart(4)}  ${h}` }))
              : [{ type: "system", text: "  No history yet." }]
          );
          break;

        case "ls": {
          const target = arg ? resolvePath(cwd, arg) : cwd;
          const node = getNode(target);
          if (!node) {
            addLines([{ type: "error", text: `  ls: cannot access '${arg}': No such file or directory` }]);
          } else if (node.type === "file") {
            addLines([{ type: "output", text: `  ${arg}` }]);
          } else if (node.children) {
            const entries = Object.keys(node.children).sort();
            if (entries.length === 0) {
              addLines([{ type: "system", text: "  (empty directory)" }]);
            } else {
              addLines(
                entries.map((e) => ({
                  type: "output" as const,
                  text: `  ${node.children![e].type === "dir" ? `\x1b[1m${e}/\x1b[0m` : e}`,
                }))
              );
            }
          }
          break;
        }

        case "cd": {
          if (!arg || arg === "~") {
            setCwd("/home/shiva");
            break;
          }
          const target = resolvePath(cwd, arg);
          const node = getNode(target);
          if (!node) {
            addLines([{ type: "error", text: `  cd: no such file or directory: ${arg}` }]);
          } else if (node.type !== "dir") {
            addLines([{ type: "error", text: `  cd: not a directory: ${arg}` }]);
          } else {
            setCwd(target);
          }
          break;
        }

        case "cat": {
          if (!arg) {
            addLines([{ type: "error", text: "  cat: missing operand" }]);
            break;
          }
          const target = resolvePath(cwd, arg);
          const node = getNode(target);
          if (!node) {
            addLines([{ type: "error", text: `  cat: ${arg}: No such file or directory` }]);
          } else if (node.type === "dir") {
            addLines([{ type: "error", text: `  cat: ${arg}: Is a directory` }]);
          } else {
            addLines([{ type: "output", text: node.content || "" }]);
          }
          break;
        }

        case "tree": {
          const target = arg ? resolvePath(cwd, arg) : cwd;
          const node = getNode(target);
          if (!node) {
            addLines([{ type: "error", text: `  tree: '${arg}': No such directory` }]);
          } else if (node.type !== "dir") {
            addLines([{ type: "error", text: `  tree: '${arg}': Not a directory` }]);
          } else {
            const name = target === "/" ? "/" : target.split("/").pop() || "/";
            let result = "  " + name + "/\n";
            if (node.children) {
              const entries = Object.entries(node.children);
              entries.forEach(([childName, childNode], idx) => {
                result += buildTree(childNode, childName, "  ", idx === entries.length - 1);
              });
            }
            addLines([{ type: "output", text: result }]);
          }
          break;
        }

        // ── Fun commands ────────────────────────────────────────
        case "snake":
          setSnakeState(initSnake());
          addLines([{ type: "system", text: "  Starting Snake... WASD/Arrows to move, Q to quit." }]);
          break;

        case "quiz": {
          const q = QUIZ_QUESTIONS[0];
          setQuizState({ idx: 0, score: 0, total: 0 });
          addLines([
            { type: "accent", text: "\n  ╔═══════════════════════════════╗" },
            { type: "accent", text: "  ║       TECH TRIVIA QUIZ        ║" },
            { type: "accent", text: "  ╚═══════════════════════════════╝" },
            { type: "output", text: `\n  Question 1/${QUIZ_QUESTIONS.length}:` },
            { type: "accent", text: `  ${q.q}` },
            ...q.choices.map((c) => ({ type: "output" as const, text: `    ${c}` })),
            { type: "system", text: `\n  Type A, B, or C (or Q to quit):` },
          ]);
          break;
        }

        case "rps": {
          setRpsActive(true);
          addLines([
            { type: "accent", text: "\n  ╔═══════════════════════════════╗" },
            { type: "accent", text: "  ║     ROCK PAPER SCISSORS       ║" },
            { type: "accent", text: "  ╚═══════════════════════════════╝" },
            { type: "system", text: "\n  Type rock, paper, or scissors (or r/p/s). Q to quit." },
          ]);
          break;
        }

        case "8ball": {
          if (!arg) {
            addLines([{ type: "error", text: "  Usage: 8ball <your question>" }]);
          } else {
            const answer = EIGHT_BALL[Math.floor(Math.random() * EIGHT_BALL.length)];
            addLines([
              { type: "system", text: `  🎱 You asked: "${arg}"` },
              { type: "accent", text: `  🎱 ${answer}` },
            ]);
          }
          break;
        }

        case "flip":
          addLines([
            {
              type: "accent",
              text: `  🪙 ${Math.random() > 0.5 ? "Heads!" : "Tails!"}`,
            },
          ]);
          break;

        case "roll": {
          const match = arg.match(/^(\d+)d(\d+)$/i);
          const count = match ? parseInt(match[1]) : 1;
          const sides = match ? parseInt(match[2]) : 6;
          if (count > 100 || sides > 1000) {
            addLines([{ type: "error", text: "  Let's keep it reasonable here." }]);
            break;
          }
          const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
          const total = rolls.reduce((a, b) => a + b, 0);
          addLines([
            { type: "output", text: `  🎲 Rolling ${count}d${sides}: [${rolls.join(", ")}]` },
            { type: "accent", text: `  Total: ${total}` },
          ]);
          break;
        }

        case "fortune":
          addLines([
            { type: "accent", text: `  🥠 ${FORTUNES[Math.floor(Math.random() * FORTUNES.length)]}` },
          ]);
          break;

        case "cowsay":
          addLines([
            { type: "output", text: arg ? cowsay(arg) : cowsay("Moo! Give me something to say.") },
          ]);
          break;

        case "ascii":
          if (!arg) {
            addLines([{ type: "error", text: "  Usage: ascii <text>" }]);
          } else {
            addLines([{ type: "accent", text: asciiArt(arg.slice(0, 12)) }]);
          }
          break;

        case "weather":
          addLines([{ type: "output", text: getWeather() }]);
          break;

        case "wisdom":
          addLines([
            { type: "accent", text: `\n  ${WISDOMS[Math.floor(Math.random() * WISDOMS.length)]}\n` },
          ]);
          break;

        // ── Easter eggs ─────────────────────────────────────────
        case "matrix": {
          const matrixLines: Omit<OutputLine, "id">[] = [];
          for (let i = 0; i < 12; i++) {
            let line = "  ";
            for (let j = 0; j < 50; j++) {
              line += String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96));
            }
            matrixLines.push({ type: "matrix", text: line });
          }
          matrixLines.push({ type: "accent", text: "\n  Wake up, Neo... The Matrix has you.\n" });
          addLines(matrixLines);
          break;
        }

        case "hack": {
          const hackLines: Omit<OutputLine, "id">[] = [
            { type: "accent", text: "\n  [*] Initializing hack sequence..." },
            { type: "system", text: "  [*] Bypassing firewall... ████████████████ 100%" },
            { type: "system", text: "  [*] Cracking encryption... ██████████████ 100%" },
            { type: "system", text: "  [*] Accessing mainframe... ████████████ 100%" },
            { type: "system", text: "  [*] Downloading secrets... ██████████ 100%" },
            { type: "error", text: "  [!] ALERT: Just kidding. You're on a static website." },
            { type: "accent", text: "  [*] But you looked cool doing it.\n" },
          ];
          addLines(hackLines);
          break;
        }

        case "sudo":
          addLines([
            { type: "error", text: "  [sudo] password for visitor: " },
            { type: "error", text: "  Nice try. This incident will be reported." },
          ]);
          break;

        case "rm":
          if (arg.includes("-rf") && arg.includes("/")) {
            addLines([
              { type: "error", text: "  🔥 Deleting everything..." },
              { type: "error", text: "  Just kidding. I'm not going to let you do that." },
              { type: "system", text: '  "With great power comes great responsibility."' },
            ]);
          } else {
            addLines([{ type: "error", text: `  rm: permission denied` }]);
          }
          break;

        case "exit":
          addLines([
            { type: "system", text: "  There is no escape from shiva.computer." },
            { type: "accent", text: '  "You can check out any time you like, but you can never leave."' },
          ]);
          break;

        case "neofetch":
        case "fastfetch":
          addLines([
            { type: "accent", text: "  visitor@shiva.computer" },
            { type: "system", text: "  ─────────────────────────" },
            { type: "output", text: "  OS      : ShivaOS 4.2.0 Playground Edition" },
            { type: "output", text: "  Host    : shiva.computer" },
            { type: "output", text: "  Kernel  : WebAssembly 1.0" },
            { type: "output", text: "  Shell   : playground-sh 1.0" },
            { type: "output", text: "  Terminal: browser-term" },
            { type: "output", text: "  CPU     : Your Brain @ max GHz" },
            { type: "output", text: "  Memory  : ∞ / ∞ (vibes)" },
          ]);
          break;

        case "echo":
          addLines([{ type: "output", text: `  ${arg}` }]);
          break;

        case "ping":
          if (!arg) {
            addLines([{ type: "error", text: "  ping: usage: ping <host>" }]);
          } else {
            addLines([
              { type: "output", text: `  PING ${arg} (127.0.0.1): 56 data bytes` },
              { type: "output", text: `  64 bytes from ${arg}: time=${(Math.random() * 50 + 1).toFixed(1)}ms` },
              { type: "output", text: `  64 bytes from ${arg}: time=${(Math.random() * 50 + 1).toFixed(1)}ms` },
              { type: "output", text: `  64 bytes from ${arg}: time=${(Math.random() * 50 + 1).toFixed(1)}ms` },
              { type: "system", text: `  --- ${arg} ping statistics ---` },
              { type: "system", text: `  3 packets transmitted, 3 received, 0% packet loss` },
            ]);
          }
          break;

        case "curl":
          addLines([
            { type: "system", text: `  Fetching ${arg || "nothing"}...` },
            { type: "output", text: '  { "message": "Hello from the void", "status": "vibing" }' },
          ]);
          break;

        case "vim":
        case "nano":
        case "emacs":
          addLines([
            { type: "system", text: `  Starting ${cmd}...` },
            { type: "error", text: `  Error: This terminal is too cool for ${cmd}.` },
            { type: "accent", text: "  Real devs use butterflies. (xkcd #378)" },
          ]);
          break;

        default:
          addLines([
            {
              type: "error",
              text: `  ${cmd}: command not found. Type 'help' for available commands.`,
            },
          ]);
      }
    },
    [cwd, prompt, addLines, history, startTime, quizState, rpsActive]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (snakeState) return;

    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx !== -1) {
        const newIdx = historyIdx + 1;
        if (newIdx >= history.length) {
          setHistoryIdx(-1);
          setInput("");
        } else {
          setHistoryIdx(newIdx);
          setInput(history[newIdx]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple autocomplete for commands
      const cmds = [
        "help", "clear", "ls", "cd", "cat", "pwd", "tree", "whoami", "hostname",
        "date", "uptime", "uname", "history", "snake", "quiz", "rps", "8ball",
        "flip", "roll", "fortune", "cowsay", "ascii", "weather", "matrix",
        "hack", "wisdom", "sudo", "exit", "echo", "ping", "curl", "neofetch",
      ];
      const matches = cmds.filter((c) => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) setInput(matches[0]);
      else if (matches.length > 1) {
        addLines([
          { type: "input", text: `${prompt} ${input}` },
          { type: "system", text: `  ${matches.join("  ")}` },
        ]);
      }
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setLines([]);
    } else if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      addLines([{ type: "input", text: `${prompt} ${input}^C` }]);
      setInput("");
      if (quizState) setQuizState(null);
      if (rpsActive) setRpsActive(false);
    }
  };

  const lineColor = (type: OutputLine["type"]) => {
    switch (type) {
      case "input":
        return "text-foreground";
      case "output":
        return "text-foreground";
      case "error":
        return "text-red-400";
      case "system":
        return "text-muted";
      case "accent":
        return "text-accent";
      case "matrix":
        return "text-green-400/70";
    }
  };

  return (
    <div
      className="rounded-lg border border-border bg-card overflow-hidden flex flex-col"
      style={{ height: "calc(100vh - 180px)", minHeight: "400px" }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-card border-b border-border shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-muted ml-2">playground — visitor@shiva — bash</span>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 text-sm leading-relaxed cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Output lines */}
        {lines.map((line) => (
          <div key={line.id} className={`${lineColor(line.type)} whitespace-pre-wrap break-all`}>
            {line.text}
          </div>
        ))}

        {/* Snake game render */}
        {snakeState && (
          <div className="text-accent whitespace-pre font-mono text-xs sm:text-sm mt-2">
            {renderSnakeFrame(snakeState)}
          </div>
        )}

        {/* Input line */}
        {!snakeState && (
          <div className="flex items-center mt-1">
            <span className="text-accent shrink-0">{prompt}&nbsp;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-foreground caret-accent min-w-0"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
