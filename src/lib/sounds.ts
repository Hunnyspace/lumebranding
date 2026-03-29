const SOUND_URLS = {
  tap: 'https://actions.google.com/sounds/v1/foley/button_click.mp3',
  hover: 'https://actions.google.com/sounds/v1/foley/button_click.mp3',
  success: 'https://actions.google.com/sounds/v1/foley/success_fanfare_trumpet.mp3',
  transition: 'https://actions.google.com/sounds/v1/foley/whoosh.mp3',
  typing: 'https://actions.google.com/sounds/v1/foley/keyboard_typing.mp3',
  ambient: 'https://actions.google.com/sounds/v1/ambiences/rain_on_roof.mp3'
};

const AMBIENT_MUSIC_URL = '/mala-fama.mp3';

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private bgMusic: HTMLAudioElement | null = null;
  private enabled: boolean = true;
  private musicEnabled: boolean = false;
  private fadeInterval: any = null;
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    if (this.initialized) return;
    
    // Initialize SFX
    Object.entries(SOUND_URLS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      audio.volume = 0.2;
      this.sounds.set(key, audio);
    });

    // Initialize Ambient Music
    this.bgMusic = new Audio();
    this.bgMusic.src = AMBIENT_MUSIC_URL;
    this.bgMusic.loop = true;
    this.bgMusic.volume = 0;
    this.bgMusic.preload = 'auto';
    
    this.bgMusic.addEventListener('canplaythrough', () => {
      console.log("Ambient music loaded and ready");
    });

    this.bgMusic.addEventListener('error', (e) => {
      console.error("Audio loading error. Ensure mala-fama.mp3 is in the public folder:", e);
    });

    this.initialized = true;
  }

  play(key: keyof typeof SOUND_URLS) {
    if (!this.enabled) return;
    const sound = this.sounds.get(key);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(err => console.warn(`SFX ${key} play blocked:`, err));
    }
  }

  private fade(targetVolume: number, duration: number = 1000) {
    if (!this.bgMusic) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const startVolume = this.bgMusic.volume;
    const steps = 30;
    const stepValue = (targetVolume - startVolume) / steps;
    let currentStep = 0;
    
    this.fadeInterval = setInterval(() => {
      if (!this.bgMusic) return;
      currentStep++;
      const newVolume = startVolume + (stepValue * currentStep);
      this.bgMusic.volume = Math.max(0, Math.min(1, newVolume));
      
      if (currentStep >= steps) {
        this.bgMusic.volume = targetVolume;
        clearInterval(this.fadeInterval);
        if (targetVolume === 0) {
          this.bgMusic.pause();
          console.log("Music paused after fade out");
        }
      }
    }, duration / steps);
  }

  startMusic() {
    if (!this.bgMusic) this.init();
    if (this.bgMusic) {
      console.log("Attempting to start music...");
      this.musicEnabled = true;
      
      // Reset volume to 0 before playing for fade in
      this.bgMusic.volume = 0;
      
      const playPromise = this.bgMusic.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Music playback started successfully");
          this.fade(0.25, 2000); // Slower fade in
        }).catch(error => {
          console.error("Music playback failed:", error);
          this.musicEnabled = false;
        });
      }
    }
  }

  stopMusic() {
    if (this.bgMusic && this.musicEnabled) {
      console.log("Stopping music...");
      this.musicEnabled = false;
      this.fade(0, 800); 
    }
  }

  toggleMusic() {
    if (this.musicEnabled) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
    return this.musicEnabled;
  }

  isMusicPlaying() {
    return this.musicEnabled;
  }

  toggle(enabled: boolean) {
    this.enabled = enabled;
  }
}

export const soundManager = new SoundManager();
