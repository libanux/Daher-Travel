import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subtitles-table',
  templateUrl: './subtitles-table.component.html',
  styleUrls: ['./subtitles-table.component.css']
})
export class SubtitlesTableComponent {

  @Input() showform = false;
  status: string = "ACCEPTED"

  dropTitle1: string = 'SPEAKERS';
  dropTitle2: string = 'TYPE';
  dropTitle3: string = 'STATUS';
  dropOptions1: string[] = ["All", "1-2", "3 or more"];
  dropOptions2: string[] = ["All", "Human", "AI"];
  dropOptions3: string[] = ["All", "ACCEPTED", "IN PROGRESS"];

  transcriptionArray: any[] = [
    {id:1, USERNAME: 'user1', VIDEOURL: 'https://example.com/video1.mp4', DURATION: 120, COST: 50, NUMBEROFSPEAKERS: '1-2', TRANSCRIPTIONTYPE: 'Human', TURNAROUNDTIME: '24 hours', STATUS: 'DECLINED' },
    {id:2, USERNAME: 'user2', VIDEOURL: 'https://example.com/video2.mp4', DURATION: 90, COST: 40, NUMBEROFSPEAKERS: '1-2', TRANSCRIPTIONTYPE: 'AI', TURNAROUNDTIME: '12 hours', STATUS: 'ACCEPTED' },
    {id:3, USERNAME: 'user3', VIDEOURL: 'https://example.com/video3.mp4', DURATION: 180, COST: 60, NUMBEROFSPEAKERS: '3 & more', TRANSCRIPTIONTYPE: 'Human', TURNAROUNDTIME: '48 hours', STATUS: 'PENDING' },
    {id:4, USERNAME: 'user4', VIDEOURL: 'https://example.com/video4.mp4', DURATION: 150, COST: 70, NUMBEROFSPEAKERS: '1-2', TRANSCRIPTIONTYPE: 'AI', TURNAROUNDTIME: '36 hours', STATUS: 'DECLINED' },
    {id:5, USERNAME: 'user5', VIDEOURL: 'https://example.com/video5.mp4', DURATION: 200, COST: 80, NUMBEROFSPEAKERS: '1-2', TRANSCRIPTIONTYPE: 'Human', TURNAROUNDTIME: '24 hours', STATUS: 'ACCEPTED' },
    {id:6, USERNAME: 'user6', VIDEOURL: 'https://example.com/video6.mp4', DURATION: 210, COST: 90, NUMBEROFSPEAKERS: '3 & more', TRANSCRIPTIONTYPE: 'AI', TURNAROUNDTIME: '48 hours', STATUS: 'PENDING' },
    {id:7, USERNAME: 'user7', VIDEOURL: 'https://example.com/video7.mp4', DURATION: 130, COST: 55, NUMBEROFSPEAKERS: '1-2', TRANSCRIPTIONTYPE: 'Human', TURNAROUNDTIME: '12 hours', STATUS: 'DECLINED' },
    {id:8, USERNAME: 'user8', VIDEOURL: 'https://example.com/video8.mp4', DURATION: 170, COST: 65, NUMBEROFSPEAKERS: '1-2', TRANSCRIPTIONTYPE: 'AI', TURNAROUNDTIME: '24 hours', STATUS: 'ACCEPTED' },
    {id:9, USERNAME: 'user9', VIDEOURL: 'https://example.com/video9.mp4', DURATION: 140, COST: 75, NUMBEROFSPEAKERS: '3 & more', TRANSCRIPTIONTYPE: 'Human', TURNAROUNDTIME: '36 hours', STATUS: 'PENDING' },
    {id:10, USERNAME: 'user10', VIDEOURL: 'https://example.com/video10.mp4', DURATION: 160, COST: 85, NUMBEROFSPEAKERS: '1-2', TRANSCRIPTIONTYPE: 'AI', TURNAROUNDTIME: '48 hours', STATUS: 'DECLINED' }
  ];

  constructor(private cdr: ChangeDetectorRef, private router: Router) { }
  
  // function for viewing a specific item
  moveToRouteWithIndex(route: string, id: number) {
    this.router.navigate([route], { queryParams: { id: id } }).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
