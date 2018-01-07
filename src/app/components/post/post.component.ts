import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

import { Dish } from '../../_models/index';
import { DishService } from '../../_services/index';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
})

export class PostComponent implements OnInit {

    private model: any = {};
    private dishes: Dish[] = [];

    constructor(private dishService: DishService) {

    }

    ngOnInit() {
        this.loadPosts();
    }

    onScroll() {
        $('#div1').append('<p>hadjalj</p>');
    }

    loadPosts() {
        this.dishService.getAll().subscribe(dishes => { this.dishes = dishes; });
    }

    mouseover() {
        alert('hi');
    }
}
