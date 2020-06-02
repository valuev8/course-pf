import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import videojs from 'video.js';
import { Player } from 'Videojs';
import {PlayerOptions} from './player-options.interface';

@Component({
  selector: 'course-pf-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('player', {static: true}) playerElem: ElementRef;
  @Input() src: string;
  options: PlayerOptions = {
    fill: true,
    autoplay: false,
    muted: false,
    sources: {
      src: `${this.src}#t=0.5`,
      type: 'video/mp4'
    },
  };
  player: Player;

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngAfterViewInit() {
    this.options.sources.src = this.src;
    this.player = videojs(this.playerElem.nativeElement, this.options);
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

}
