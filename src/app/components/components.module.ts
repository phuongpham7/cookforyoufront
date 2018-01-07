import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InfiniteScrollModule} from 'ngx-infinite-scroll';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AlertComponent } from './alert/alert.component';
import { SearchComponent } from './search/search.component';
import { PostComponent } from './post/post.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    InfiniteScrollModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AlertComponent,
    SearchComponent,
    PostComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AlertComponent,
    SearchComponent,
    PostComponent,
  ]
})
export class ComponentsModule { }
