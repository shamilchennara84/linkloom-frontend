import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GoogleMapsModule } from '@angular/google-maps';

export interface PlaceSearchResult {
  name?: string;
}
@Component({
  selector: 'app-place-autocomplete',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, GoogleMapsModule],
  templateUrl: './place-autocomplete.component.html',
  styles: [],
})
export class PlaceAutocompleteComponent {
  @ViewChild('inputField') inputField!: ElementRef;

  @Input() placeHolder = 'enter your location';

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();
  autocomplete: google.maps.places.Autocomplete | undefined;
  selectedPlaceName: string | null = null;

  ngAfterViewInit() {
    if (typeof google !== 'undefined' && typeof google.maps.places !== 'undefined') {
      this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);

      this.autocomplete.addListener('place_changed', () => {

      
        const place = this.autocomplete?.getPlace();
        this.selectedPlaceName = place?.name || null;

        const result: PlaceSearchResult = {
          name: place?.name,
          // address: this.inputField.nativeElement.value,
          // location: place?.geometry?.location,
          // iconUrl: place?.icon,
        };
        console.log(this.selectedPlaceName);
        this.placeChanged.emit(result);
      });
    } else {
      console.error('Google Maps Places API is not loaded');
    }
  }
}
