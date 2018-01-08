import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService, LocationService } from '../_services/index';
import { Location, User } from '../_models/index';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {

  public model: any = {};
  public locations = [];
  public query = '';
  public filteredList = [];
  public elementRef;
  public userLoggedIn: User;
  public location: Location;
  public loading = false;

  constructor(
    public router: Router,
    public userService: UserService,
    public alertService: AlertService,
    public myElement: ElementRef,
    public locationService: LocationService) {
        this.elementRef = myElement;
  }

    filter() {
      if (this.query !== '') {
          this.filteredList = this.locations.filter(function(el){
              return el != null  && el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          }.bind(this));
      }else {
          this.filteredList = [];
      }
  }

  select(item) {
      this.query = item;
      this.filteredList = [];
  }

  handleClick(event) {
      let clickedComponent = event.target;
      let inside = false;
      do {
          if (clickedComponent === this.elementRef.nativeElement) {
              inside = true;
          }
          clickedComponent = clickedComponent.parentNode;
      } while (clickedComponent);
          if (!inside) {
              this.filteredList = [];
      }
  }

  ngOnInit() {
    this.loadLocations();
    this.userLoggedIn = JSON.parse(localStorage.getItem('currentUser'));
    this.loaduserToEdit();
  }

  loadLocations() {
    this.locationService.getLocations()
      .subscribe(
          data => {
              for (const loc of data)
              {
                  this.locations.push(loc.name);
              }
          },
          err => { console.log(err); });
  }

  loaduserToEdit() {
    this.model.id = this.userLoggedIn.id;
    this.model.email = this.userLoggedIn.email;
    this.model.name = this.userLoggedIn.name;
    this.query = this.userLoggedIn.location;
    this.model.location = this.query;
  }

  updateProfile() {
    this.loading = true;
    this.userService.update(this.model)
      .subscribe(
        data => {
          localStorage.setItem('currentUser',
            JSON.stringify({ id: this.model.id, email: this.model.email, password: this.model.password,
              name: this.model.name, location: this.model.location }));
            // set success message and pass true paramater to persist the message after redirecting to the login page
          this.alertService.success('Update successful', true);
        },
        error => {
            switch (error.status) {
              case 404:
                this.alertService.error('User could not be found.');
                break;
              default:
                this.alertService.error(error);
                break;
            }
        });
    this.loading = false;
  }

}
