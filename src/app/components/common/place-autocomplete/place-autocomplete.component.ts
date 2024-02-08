import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GoogleMapsModule } from '@angular/google-maps';

export interface PlaceSearchResult {
  address: string;
  location?: google.maps.LatLng;
  iconUrl?: string;
  name?: string;
}
@Component({
  selector: 'app-place-autocomplete',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, GoogleMapsModule],
  templateUrl: "./place-autocomplete.component.html",
  styles: [],
})
export class PlaceAutocompleteComponent {
  @ViewChild('inputField') inputField!: ElementRef;

  @Input() placeHolder = 'enter your location';

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();
  autocomplete: google.maps.places.Autocomplete | undefined;

  ngAfterViewInit() {
    if (typeof google !== 'undefined' && typeof google.maps.places !== 'undefined') {
      this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);

      this.autocomplete.addListener('place_change', () => {
        const place = this.autocomplete?.getPlace();
        const result: PlaceSearchResult = {
          address: this.inputField.nativeElement.value,
          name: place?.name,
          location: place?.geometry?.location,
          iconUrl: place?.icon,
        };

        this.placeChanged.emit(result);
      });
    } else {
      console.error('Google Maps Places API is not loaded');
    }
  }
}
