
// A simple confetti effect utility

const confetti = {
  canvas: null as HTMLCanvasElement | null,
  context: null as CanvasRenderingContext2D | null,
  particles: [] as Array<{
    color: string;
    x: number; 
    y: number;
    diameter: number;
    tilt: number;
    tiltAngle: number;
    tiltAngleIncrement: number;
  }>,
  colors: [
    'rgba(255,182,185,0.9)', 
    'rgba(250,227,217,0.9)', 
    'rgba(187,222,214,0.9)',
    'rgba(138,198,209,0.9)',
    'rgba(255,222,125,0.9)',
    'rgba(127,255,212,0.9)',
  ],
  animationId: 0,
  
  start() {
    this.init();
    this.createParticles();
    this.loop();
  },
  
  init() {
    if (this.canvas) {
      document.body.removeChild(this.canvas);
    }
    
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);
    
    window.addEventListener('resize', () => {
      if (this.canvas) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
    });
  },
  
  createParticles() {
    this.particles = [];
    for (let i = 0; i < 150; i++) {
      this.particles.push({
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        x: Math.random() * this.canvas!.width,
        y: Math.random() * this.canvas!.height - this.canvas!.height,
        diameter: Math.random() * 10 + 5,
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
        tiltAngleIncrement: Math.random() * 0.07 + 0.05
      });
    }
  },
  
  loop() {
    if (!this.context || !this.canvas) return;
    
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    let stillActive = false;
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      this.context.beginPath();
      this.context.lineWidth = p.diameter;
      this.context.strokeStyle = p.color;
      this.context.moveTo(p.x + p.tilt, p.y);
      this.context.lineTo(p.x + p.tilt + 10, p.y);
      this.context.stroke();
      
      p.tiltAngle += p.tiltAngleIncrement;
      p.y += (Math.cos(p.tiltAngle) + 1) + p.diameter / 2;
      p.tilt = Math.sin(p.tiltAngle) * 12;
      
      if (p.y < this.canvas.height) {
        stillActive = true;
      }
    }
    
    if (stillActive) {
      this.animationId = window.requestAnimationFrame(this.loop.bind(this));
    } else {
      this.stop();
    }
  },
  
  stop() {
    window.cancelAnimationFrame(this.animationId);
    if (this.canvas) {
      document.body.removeChild(this.canvas);
      this.canvas = null;
    }
  }
};

export default confetti;
