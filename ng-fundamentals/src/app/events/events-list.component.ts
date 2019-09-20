import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service'
import { ToastrService } from '../common/toastr.service';

@Component({
    selector:'event-list',
    template:`
    <div>
    <h1>Upcming Angular Events</h1>
    <hr/>
    <div class="row">
    <div *ngFor="let event of events"  class="col-md-5">
    <event-thumbnail (click)="handleThumbnailEvent(event.name)" [event]="event"></event-thumbnail>
    </div>
    </div>
    </div>
    `

})
export class EventsListComponent implements OnInit {
    events: any[]
    constructor(private eventService:EventService,private toastr:ToastrService){

   }
   ngOnInit(){
       this.events = this.eventService.getEvents()
   }
   handleThumbnailEvent(eventName){
       this.toastr.success(eventName)
   }
}
