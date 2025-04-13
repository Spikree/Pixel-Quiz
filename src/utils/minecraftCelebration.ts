// Minecraft style celebration effect utility

const minecraftCelebration = {
    canvas: null as HTMLCanvasElement | null,
    context: null as CanvasRenderingContext2D | null,
    particles: [] as Array<{
      color: string;
      x: number;
      y: number;
      size: number;
      velocityY: number;
      velocityX: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      fadeRate: number;
    }>,
    // Minecraft-inspired color palette
    colors: [
      '#61b14d', // grass green
      '#8a5c43', // dirt brown
      '#3d85c6', // water blue
      '#d5a336', // gold
      '#df6c33', // orange/redstone
      '#323232', // dark grey/stone
      '#7e3e97', // purple/amethyst
      '#696969', // grey/iron
      '#158788', // teal/diamond
      '#9fc5e8', // light blue/diamond
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
      const centerX = this.canvas!.width / 2;
      
      // Create fountain-like eruption of particles from bottom center
      for (let i = 0; i < 200; i++) {
        const size = Math.random() * 10 + 5; // 5-15px blocks
        
        this.particles.push({
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          x: centerX + (Math.random() - 0.5) * 100, // center with small spread
          y: this.canvas!.height + size, // start just below screen
          size: size,
          velocityY: -(Math.random() * 5 + 5), // upward speed
          velocityX: (Math.random() - 0.5) * 3, // slight side-to-side movement
          rotation: Math.random() * Math.PI * 2, // random initial rotation
          rotationSpeed: (Math.random() - 0.5) * 0.1, // slow rotation
          opacity: 1,
          fadeRate: 0.005 + Math.random() * 0.01, // randomized fade out rate
        });
      }
    },
    
    drawBlock(x: number, y: number, size: number, color: string, rotation: number, opacity: number) {
      if (!this.context) return;
      
      this.context.save();
      this.context.translate(x, y);
      this.context.rotate(rotation);
      
      // Main block face (top)
      this.context.fillStyle = color;
      this.context.globalAlpha = opacity;
      this.context.fillRect(-size/2, -size/2, size, size);
      
      // Left side (darker)
      this.context.fillStyle = this.darkenColor(color, 0.7);
      this.context.beginPath();
      this.context.moveTo(-size/2, -size/2);
      this.context.lineTo(-size/2, size/2);
      this.context.lineTo(-size/2 - size/4, size/2 - size/4);
      this.context.lineTo(-size/2 - size/4, -size/2 - size/4);
      this.context.closePath();
      this.context.fill();
      
      // Bottom side (darkest)
      this.context.fillStyle = this.darkenColor(color, 0.5);
      this.context.beginPath();
      this.context.moveTo(-size/2, size/2);
      this.context.lineTo(size/2, size/2);
      this.context.lineTo(size/2 - size/4, size/2 - size/4);
      this.context.lineTo(-size/2 - size/4, size/2 - size/4);
      this.context.closePath();
      this.context.fill();
      
      this.context.restore();
    },
    
    // Helper function to darken a color by a factor
    darkenColor(color: string, factor: number): string {
      const hex = color.replace('#', '');
      let r = parseInt(hex.substr(0, 2), 16);
      let g = parseInt(hex.substr(2, 2), 16);
      let b = parseInt(hex.substr(4, 2), 16);
      
      r = Math.floor(r * factor);
      g = Math.floor(g * factor);
      b = Math.floor(b * factor);
      
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    },
    
    loop() {
      if (!this.context || !this.canvas) return;
      
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      let stillActive = false;
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        
        // Update position
        p.x += p.velocityX;
        p.y += p.velocityY;
        
        // Slow down (gravity effect)
        p.velocityY += 0.1;
        
        // Rotate
        p.rotation += p.rotationSpeed;
        
        // Fade out
        p.opacity -= p.fadeRate;
        
        // Draw the block
        if (p.opacity > 0) {
          this.drawBlock(p.x, p.y, p.size, p.color, p.rotation, p.opacity);
          stillActive = true;
        }
        
        // Add minecraft-style physics - bounce when hitting the bottom
        if (p.y > this.canvas.height - p.size/2 && p.velocityY > 0) {
          p.y = this.canvas.height - p.size/2;
          p.velocityY = -p.velocityY * 0.6; // bounce with energy loss
          
          // Stop bouncing if too slow
          if (Math.abs(p.velocityY) < 0.5) {
            p.velocityY = 0;
          }
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
  
  export default minecraftCelebration;