import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeerService } from '../beer.service';

@Component({
  selector: 'app-beer-info',
  templateUrl: './beer-info.component.html',
  styleUrls: ['./beer-info.component.scss']
})
export class BeerInfoComponent implements OnInit {
  beer: any;
  beers: any[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private beerService: BeerService,
    private router: Router
  ) {}

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.beerService.getBeerById(id).subscribe(beer => {
        this.beer = beer[0];
        this.loading = false;
      });
    });
    
    this.beerService.getRandomBeers().subscribe(beers => {
      this.beers = beers;
      this.loading = false;
    });
  }

  redirectToHome(event: any) {
    if (event.target.classList.contains('container')) {
        this.router.navigate(['/']);
    }
}
}
