export interface Chapter {
  chapterName: string;
  videoUrl?: string;
  chapters?: Chapter[];
  id: string;
}
