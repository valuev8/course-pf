export interface PlayerOptions {
  fill?: boolean;
  aspectRatio?: string;
  autoplay?: boolean;
  muted?: boolean;
  sources: {
    src: string;
    type: string;
  };
}
