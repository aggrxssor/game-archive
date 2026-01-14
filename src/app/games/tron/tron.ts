import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tron',
  standalone: false,
  templateUrl: './tron.html',
  styleUrl: './tron.css',
})
export class Tron implements AfterViewInit {

  /* ───────────────────── arena ───────────────────── */

  @ViewChild('gameCanvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  ctx!: CanvasRenderingContext2D;



  /* ───────────────────── hang ───────────────────── */

  soundInit = new Audio('assets/sounds/gameInitialize.wav');
  soundCountdown = new Audio('assets/sounds/matchStartCountdown.wav');
  soundTurn = new Audio('assets/sounds/turnSound.wav');
  soundDeath = new Audio('assets/sounds/deathSound.wav');
  soundWin = new Audio('assets/sounds/gameover.wav');
  soundNewRound = new Audio('assets/sounds/newRound.wav');

  setVolume() {
    this.soundInit.volume = 0.25;
    this.soundCountdown.volume = 0.25;
    this.soundDeath.volume = 0.5;
    this.soundTurn.volume = 0.75;
    this.soundWin.volume = 0.25;
    this.soundNewRound.volume = 0.5;
  }

  play(s: HTMLAudioElement) {
    s.currentTime = 0;
    s.play().catch(() => {});
  }



  /* ───────────────────── jatek tulajdonsagok stb ───────────────────── */

  GRID_W = 200;
  GRID_H = 200;
  CELL_SIZE = 4;

  ARENA_PADDING = 60;
  BORDER = 2;

  MOVE_RATE = 22;
  MOVE_INTERVAL = 1 / this.MOVE_RATE;

  DIR_UP = 0;
  DIR_RIGHT = 1;
  DIR_DOWN = 2;
  DIR_LEFT = 3;

  dx = [0, 1, 0, -1];
  dy = [-1, 0, 1, 0];



  /* ───────────────────── jatek allapotai ───────────────────── */

  phase: 'load' | 'newMatch' | 'countdown' | 'waiting' | 'running' | 'roundOver' | 'gameover' = 'load';

  winner = 0;
  score1 = 0;
  score2 = 0;

  matchOver = false;

  countdown = 0;
  countdownTimer: any;

  grid = new Uint8Array(this.GRID_W * this.GRID_H);

  player1 = {
    x: 30,
    y: 100,
    dir: -1,
    nextDir: -1,
    alive: true,
    started: false
  };

  player2 = {
    x: 170,
    y: 100,
    dir: -1,
    nextDir: -1,
    alive: true,
    started: false
  };



  /* ───────────────────── tick ───────────────────── */

  lastTime = 0;
  accumulator = 0;



  /* ───────────────────── rendereles ───────────────────── */

  ngAfterViewInit() {
    this.setVolume();

    this.canvas.nativeElement.focus();
    this.resizeCanvas();
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false;

    window.addEventListener('keydown', (e) => {

      if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === ' '
      ) {
        e.preventDefault();
      }

      if (e.key === ' ' && this.phase === 'roundOver' && !this.matchOver) {
        this.play(this.soundNewRound);
        this.restart();
        return;
      }

      if (e.key === 'w') this.queueDir(this.player1, this.DIR_UP);
      if (e.key === 'd') this.queueDir(this.player1, this.DIR_RIGHT);
      if (e.key === 's') this.queueDir(this.player1, this.DIR_DOWN);
      if (e.key === 'a') this.queueDir(this.player1, this.DIR_LEFT);

      if (e.key === 'ArrowUp') this.queueDir(this.player2, this.DIR_UP);
      if (e.key === 'ArrowRight') this.queueDir(this.player2, this.DIR_RIGHT);
      if (e.key === 'ArrowDown') this.queueDir(this.player2, this.DIR_DOWN);
      if (e.key === 'ArrowLeft') this.queueDir(this.player2, this.DIR_LEFT);
    });

    requestAnimationFrame(this.loop);
  }

  loop = (t: number) => {
    if (!this.lastTime) this.lastTime = t;
    const delta = (t - this.lastTime) / 1000;
    this.lastTime = t;
    this.accumulator += delta;

    while (this.accumulator >= this.MOVE_INTERVAL) {
      if (this.phase === 'running' && !this.matchOver) this.step();
      this.accumulator -= this.MOVE_INTERVAL;
    }

    this.render();
    requestAnimationFrame(this.loop);
  }

  /* ───────────────────── input ───────────────────── */

  queueDir(p: any, dir: number) {
    if (this.phase === 'roundOver' || this.phase === 'gameover') return;
    if (this.matchOver) return;

    if (!p.started) {
      p.started = true;
      p.dir = dir;
      this.play(this.soundTurn);
      p.nextDir = dir;

      if (this.player1.started && this.player2.started) {
        this.startCountdown();
      }
      return;
    }

    this.play(this.soundTurn);
    p.nextDir = dir;
  }

  startCountdown() {
    this.phase = 'countdown';
    this.countdown = 3;

    this.play(this.soundCountdown);

    this.countdownTimer = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(this.countdownTimer);
        this.phase = 'running';
      }
    }, 1390);
  }

  restart() {
    if (this.matchOver) {
      this.score1 = 0;
      this.score2 = 0;
      this.matchOver = false;
    }

    this.grid.fill(0);

    this.player1.x = 30;
    this.player1.y = 100;
    this.player1.dir = -1;
    this.player1.nextDir = -1;
    this.player1.started = false;
    this.player1.alive = true;

    this.player2.x = 170;
    this.player2.y = 100;
    this.player2.dir = -1;
    this.player2.nextDir = -1;
    this.player2.started = false;
    this.player2.alive = true;

    this.phase = 'waiting';
  }

  step() {
    this.movePlayer(this.player1, 1);
    this.movePlayer(this.player2, 2);
  }

  movePlayer(p: any, trailId: number) {
    if (!p.alive) return;

    if (p.nextDir !== p.dir) {
      const diff = Math.abs(p.nextDir - p.dir);
      if (diff !== 2) p.dir = p.nextDir;
    }

    const nx = p.x + this.dx[p.dir];
    const ny = p.y + this.dy[p.dir];

    if (nx < 0 || nx >= this.GRID_W || ny < 0 || ny >= this.GRID_H) {
      p.alive = false;
      this.endGame();
      return;
    }

    this.grid[this.idx(p.x, p.y)] = trailId;

    if (this.grid[this.idx(nx, ny)] !== 0) {
      p.alive = false;
      this.endGame();
      return;
    }

    p.x = nx;
    p.y = ny;
  }

  endGame() {
    this.play(this.soundDeath);
    this.phase = 'roundOver';

    if (this.player1.alive && !this.player2.alive) {
      this.winner = 1;
      this.score1++;
    }
    else if (this.player2.alive && !this.player1.alive) {
      this.winner = 2;
      this.score2++;
    }
    else {
      this.winner = 0;
    }

    if (this.score1 === 3 || this.score2 === 3) {
      this.matchOver = true;
      this.phase = 'gameover';
      this.play(this.soundWin);
    }

    this.player1.started = false;
    this.player2.started = false;
  }

  resizeCanvas() {
    const c = this.canvas.nativeElement;
    c.width = this.GRID_W * this.CELL_SIZE + this.ARENA_PADDING * 2;
    c.height = this.GRID_H * this.CELL_SIZE;
  }

  idx(x: number, y: number) {
    return y * this.GRID_W + x;
  }

  render() {
    const ctx = this.ctx;
    const cs = this.CELL_SIZE;

    const arenaX = this.ARENA_PADDING;
    const arenaW = this.GRID_W * cs;
    const arenaH = this.GRID_H * cs;

    ctx.fillStyle = 'rgb(10,10,10)';
    ctx.fillRect(0, 0, arenaW + this.ARENA_PADDING * 2, arenaH);

    ctx.fillStyle = 'rgb(15, 15, 15)';
    ctx.fillRect(arenaX, 0, arenaW, arenaH);

    for (let y = 0; y < this.GRID_H; y++) {
      for (let x = 0; x < this.GRID_W; x++) {
        const v = this.grid[this.idx(x, y)];
        if (v === 1) ctx.fillStyle = 'rgb(71, 201, 253, 0.5)';
        if (v === 2) ctx.fillStyle = 'rgb(255, 151, 71, 0.5)';
        if (v !== 0) ctx.fillRect(arenaX + x * cs, y * cs, cs, cs);
      }
    }

    if (this.player1.alive) {
      ctx.fillStyle = 'rgb(71, 201, 253)';
      ctx.fillRect(arenaX + this.player1.x * cs, this.player1.y * cs, cs, cs);
    }

    if (this.player2.alive) {
      ctx.fillStyle = 'rgb(255, 151, 71)';
      ctx.fillRect(arenaX + this.player2.x * cs, this.player2.y * cs, cs, cs);
    }

    ctx.strokeStyle = 'white';
    ctx.lineWidth = this.BORDER;
    ctx.strokeRect(arenaX, 0, arenaW, arenaH);

    ctx.fillStyle = 'white';
    ctx.font = '32px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(String(this.score1), this.ARENA_PADDING / 2, arenaH / 2);
    ctx.fillText(String(this.score2), arenaX + arenaW + this.ARENA_PADDING / 2, arenaH / 2);
  }


  bootGame() {
    if (this.phase !== 'load') return;
    this.phase = 'newMatch';
    this.play(this.soundInit);
  }

}
