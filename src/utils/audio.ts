// Utility for playing sounds throughout the application

class AudioManager {
  private static instance: AudioManager;
  private sounds: Record<string, HTMLAudioElement> = {};
  private initialized = false;
  private soundEnabled = true;

  private constructor() {
    // Private constructor for singleton pattern
     // Load sound setting from localStorage
     this.soundEnabled = localStorage.getItem("pixelQuizSound") !== "false";
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public init(): void {
    if (this.initialized) return;

    // Load all sounds
    this.sounds = {
      buttonClick: new Audio("/assets/buttonclick.mp3"),
      pageTransition: new Audio("/assets/Enter & Back.mp3"),
    };

    // Preload sounds
    Object.values(this.sounds).forEach((audio) => {
      audio.load();
    });

    this.initialized = true;
  }

  public setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
  }

  public playButtonClick(): void {
    this.playSound("buttonClick");
  }

  public playPageTransition(): void {
    this.playSound("pageTransition");
  }

  private playSound(soundName: keyof typeof this.sounds): void {
    if (!this.soundEnabled) return;
    try {
      const sound = this.sounds[soundName];
      if (sound) {
        // Clone and play to allow overlapping sounds
        const soundClone = sound.cloneNode() as HTMLAudioElement;
        soundClone.volume = 0.5; // Set volume to 50%
        soundClone.play().catch((err) => {
          console.error(`Error playing sound: ${err.message}`);
        });
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }
}

export const audioManager = AudioManager.getInstance();

// Initialize at module level
audioManager.init();

export default audioManager;
