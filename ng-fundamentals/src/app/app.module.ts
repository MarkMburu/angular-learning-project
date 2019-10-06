import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent ,
  EventRouteActivator,
  EventListResolver, 
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe

} from './events/index'

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';
import { AuthService } from './user/auth.service';
import { CollapsableWellComponent,TOASTR_TOKEN,Toastr,JQ_TOKEN,SimpleModalComponent, ModalTriggerDirective} from './common/index';

let toastr:Toastr = window['toastr']
let jQuery: Object = window['$']

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsableWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EventService,
    {provide:TOASTR_TOKEN,useValue:toastr},
    {provide:JQ_TOKEN,useValue: jQuery },
    EventRouteActivator,
    EventListResolver,
    AuthService,
  {provide:'canDeactivateCreateEvent',useValue: checkDirtyState}
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent){
 if(component.isDirtyState){
   return window.confirm('You have not saved this event,do you really want to cancel?')
 }
 return true
}