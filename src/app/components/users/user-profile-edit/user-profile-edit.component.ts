import { Component, OnDestroy, OnInit } from '@angular/core';
import { FullnameValidationComponent } from '../../common/fullname-validation/fullname-validation.component';
import { MobileValidationComponent } from '../../common/mobile-validation/mobile-validation.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUserRes } from '../../../core/models/interfaces/users';
import { selectUserDetails } from '../../../core/states/users/user.selector';
import { Store, select } from '@ngrx/store';
import { validateByTrimming, validateDOB } from '../../../core/helpers/validation';
import { mobileValidators, nameValidators } from '../../../shared/validators';
import { UserService } from '../../../core/services/user.service';
import { dateToString } from '../../../core/helpers/date';
import { environment } from '../../../../environments/environment'; // Adjust the relative path as needed
import { saveUserOnStore } from '../../../core/states/users/user.actions';
import { Router } from '@angular/router';
import { DobValidationComponent } from '../../common/dob-validation/dob-validation.component';
import { ProfileDpComponent } from '../../common/profile-dp/profile-dp.component';
import { Visibility } from '../../../core/models/enums/privacy';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [
    FullnameValidationComponent,
    MobileValidationComponent,
    ReactiveFormsModule,
    DobValidationComponent,
    ProfileDpComponent,
  ],
  templateUrl: './user-profile-edit.component.html',
  styleUrl: './user-profile-edit.component.css',
})
export class UserProfileEditComponent implements OnInit,OnDestroy {
  userDetails$ = this.store.pipe(select(selectUserDetails));
  user: IUserRes | null = null;
  userId = '';
  profileForm!: FormGroup;
  isSubmitted = false;
  addressUpdateMode = true;
  selectedFile!: File;
  dpUrl = '';
  isPrivate = false;
  private userDetailsSubscription: Subscription | null = null;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.profileForm = this.formBuilder.group(
      {
        fullname: ['', [validateByTrimming(nameValidators)]],
        mobile: ['', [validateByTrimming(mobileValidators)]],
        dob: [''],
        bio: [''],
        visibility: [false],
      },
      {
        validators: validateDOB,
      }
    );

    this.userDetailsSubscription = this.userDetails$.subscribe((user) => {
      this.user = user ?? this.user;
      if (this.user !== null && this.user !== undefined) {
        this.userId = this.user._id;
        this.profileForm.get('fullname')?.setValue(this.user.fullname);
        this.profileForm.get('mobile')?.setValue(this.user.mobile != null ? String(this.user.mobile) : '');

        if (this.user.dob) {
          this.profileForm.get('dob')?.patchValue(dateToString(new Date(this.user.dob)));
        }
        if (this.user.bio) {
          this.profileForm.get('bio')?.setValue(this.user.bio != null ? String(this.user.bio) : '');
        }
        if (this.user.profilePic !== undefined) this.dpUrl = environment.backendUrl + `images/${this.user.profilePic}`;

        const isPrivate = this.user.visibility === Visibility.Private;

        this.profileForm.get('visibility')?.setValue(isPrivate);
      }
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.profileForm.valid) {
      const userData = this.profileForm.getRawValue();

      const user: any = {
        fullname: userData.fullname,
        mobile: userData.mobile,
        dob: userData.dob,
        bio: userData.bio,
        visibility: userData.visibility ? Visibility.Private : Visibility.Public,
      };
      this.userService.updateUserDetails(this.userId, user).subscribe({
        next: (res) => {
          void this.router.navigate(['/user/profile']);
          if (res.data != null) this.store.dispatch(saveUserOnStore({ userDetails: res.data }));
        },
      });
    }
  }

  imageReady(blob: Blob): void {
    console.log(blob, 'image ready event in edit user profile');

    const formData = new FormData();
    formData.append('image', blob, this.user?.fullname + '.jpg');
    this.userService.updateUserProfile(this.userId, formData).subscribe({
      next: (res) => {
        console.log('image upload complete');
        if (res.data != null) {
          this.dpUrl = environment.backendUrl + `images/${res.data.profilePic}`;
          this.store.dispatch(saveUserOnStore({ userDetails: res.data }));
        }
      },
      error: () => {
        this.dpUrl = '';
      },
    });
  }

  deleteProfilePic(): void {
    console.warn('deleting dp');
    this.userService.deleteUserProfile(this.userId).subscribe({
      next: (res) => {
        this.dpUrl = '';
        console.warn('profile deleted successfully', res.data.profilePic, 'see, its undefined');
        if (res.data != null) this.store.dispatch(saveUserOnStore({ userDetails: res.data }));
      },
    });
  }

  onPrivacyChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isPrivate = input.checked;
    const privacyControl = this.profileForm.get('visibility');
    if (privacyControl) {
      privacyControl.setValue(this.isPrivate);
    } else {
      console.warn('No control named "privacy" found in the form group.');
    }
  }

  ngOnDestroy() {
    if (this.userDetailsSubscription) {
      this.userDetailsSubscription.unsubscribe();
    }
  }
}
