export interface Chapter {
  chapterName: string;
  videoUrl?: string;
  subChapters?: Chapter[],
}
