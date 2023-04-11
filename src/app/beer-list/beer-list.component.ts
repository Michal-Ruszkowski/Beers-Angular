import { Component, OnInit, HostListener } from '@angular/core';
import { BeerService } from './../beer.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {
  beers: any[] = [];
  loading: boolean = false;

  constructor(private beerService: BeerService) { }

  ngOnInit(): void {
    this.loadMore();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= (docHeight - 2) && this.beers.length % 20 === 0) {
      this.loadMore();
    }
  }

  private loadMore() {
    if (!this.loading) {
      this.loading = true;
      this.beerService.getBeers().subscribe((data) => {
        this.beers = [...this.beers, ...data];
        this.loading = false;
      });
    }
  }

}
