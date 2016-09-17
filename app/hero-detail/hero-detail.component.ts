import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {HeroService} from '../hero.service';

import {Hero} from '../hero';

@Component({
    selector: 'my-hero-detail',
    styleUrls: [
        'app/hero-detail/hero-detail.component.css'
    ],
    templateUrl: 'app/hero-detail/hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
    
    @Input() hero: Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.heroService.getHero(id)
                .then(hero => this.hero = hero);
        });
    }

    save(): void {
        this.heroService.update(this.hero)
            .then(this.goBack);
    }

    goBack(): void {
        window.history.back();
    }
}
