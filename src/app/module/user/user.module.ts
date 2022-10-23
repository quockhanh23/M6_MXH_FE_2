import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FriendNearbyComponent} from './friend-nearby/friend-nearby.component';
import {NewsfeedComponent} from './newsfeed/newsfeed.component';
import {FriendRequestComponent} from "./friend-request/friend-request.component";
import {EditPasswordComponent} from './edit-password/edit-password.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {PeopleDetailComponent} from './people-detail/people-detail.component';
import {NewsfeedDetailComponent} from './newsfeed-detail/newsfeed-detail.component';
import {TimelineAboutComponent} from './user-detail/timeline-about/timeline-about.component';
import {TimelineFriendsComponent} from './user-detail/timeline-friends/timeline-friends.component';
import {MyPostComponent} from './my-post/my-post.component';
import {FriendListComponent} from "./friend-list/friend-list.component";
import {ShortNewComponent} from "./short-new/short-new.component";
import {ShortNewsAllComponent} from './short-news-all/short-news-all.component';
import {MaterialModule} from "../../material/material.module";
import {MyGroupComponent} from './my-group/my-group.component';
import {MyImageComponent} from "./my-image/my-image.component";
import {MessengerComponent} from './messenger/messenger.component';
import {MatMenuModule} from "@angular/material/menu";
import {MessengerDetailComponent} from './messenger-detail/messenger-detail.component';
import {MyShortNewComponent} from './my-short-new/my-short-new.component';
import {GarbageComponent} from './garbage/garbage.component';
import {GroupCreateComponent} from "./group-create/group-create.component";
import {GroupSharedComponent} from './group-shared/group-shared.component';
import {GroupDetailComponent} from './group-detail/group-detail.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ListImageDefaultComponent} from './list-image-default/list-image-default.component';
import {SavedListComponent} from './saved-list/saved-list.component';
import {LifeEventsDetailComponent} from './life-events-detail/life-events-detail.component';
import {MatDatepickerModule} from "@angular/material/datepicker";


@NgModule({
  declarations: [
    EditProfileComponent,
    EditPasswordComponent,
    FriendNearbyComponent,
    NewsfeedComponent,
    FriendRequestComponent,
    UserDetailComponent,
    PeopleDetailComponent,
    NewsfeedDetailComponent,
    TimelineAboutComponent,
    TimelineFriendsComponent,
    MyPostComponent,
    FriendListComponent,
    ShortNewComponent,
    ShortNewsAllComponent,
    MyGroupComponent,
    MyImageComponent,
    MessengerComponent,
    MessengerDetailComponent,
    MyShortNewComponent,
    GarbageComponent,
    GroupCreateComponent,
    GroupSharedComponent,
    GroupDetailComponent,
    ListImageDefaultComponent,
    SavedListComponent,
    LifeEventsDetailComponent,
  ],
  exports: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatDatepickerModule
  ]
})
export class UserModule {
}
