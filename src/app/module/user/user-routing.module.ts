import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {FriendNearbyComponent} from "./friend-nearby/friend-nearby.component";
import {NewsfeedComponent} from "./newsfeed/newsfeed.component";
import {FriendRequestComponent} from "./friend-request/friend-request.component";
import {EditPasswordComponent} from "./edit-password/edit-password.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {NewsfeedDetailComponent} from "./newsfeed-detail/newsfeed-detail.component";
import {PeopleDetailComponent} from "./people-detail/people-detail.component";
import {TimelineAboutComponent} from "./user-detail/timeline-about/timeline-about.component";
import {TimelineFriendsComponent} from "./user-detail/timeline-friends/timeline-friends.component";
import {FriendListComponent} from "./friend-list/friend-list.component";
import {ShortNewsAllComponent} from "./short-news-all/short-news-all.component";
import {MyGroupComponent} from "./my-group/my-group.component";
import {MyImageComponent} from "./my-image/my-image.component";
import {MessengerComponent} from "./messenger/messenger.component";
import {MyPostComponent} from "./my-post/my-post.component";
import {MyShortNewComponent} from "./my-short-new/my-short-new.component";
import {GroupSharedComponent} from "./group-shared/group-shared.component";
import {GroupCreateComponent} from "./group-create/group-create.component";
import {GroupDetailComponent} from "./group-detail/group-detail.component";
import {GarbageComponent} from "./garbage/garbage.component";
import {MessengerDetailComponent} from "./messenger-detail/messenger-detail.component";

const routes: Routes = [
  {
    path: 'newsfeed', component: NewsfeedComponent,
  },
  {
    path: 'detailNewsfeed/:id', component: NewsfeedDetailComponent
  },
  {
    path: 'people-nearby', component: FriendNearbyComponent
  },
  {
    path: 'requests', component: FriendRequestComponent
  },
  {
    path: 'listFriend/:id', component: FriendListComponent
  },
  {
    path: 'listShortNew', component: ShortNewsAllComponent
  },
  {
    path: 'listImage/:id', component: MyImageComponent
  },
  {
    path: 'messengerDetail/:id', component: MessengerDetailComponent
  },
  {
    path: 'messenger', component: MessengerComponent
  },
  {
    path: 'group', component: MyGroupComponent
  },
  {
    path: 'post', component: MyPostComponent
  },
  {
    path: 'short', component: MyShortNewComponent
  },
  {
    path: 'groupShare', component: GroupSharedComponent
  },
  {
    path: 'groupCreate', component: GroupCreateComponent
  },
  {
    path: 'groupDetail/:id', component: GroupDetailComponent
  },
  {
    path: 'trash', component: GarbageComponent
  },
  {
    path: 'edit', component: EditProfileComponent
  },
  {
    path: 'password', component: EditPasswordComponent
  },
  {
    path: 'user-detail', component: UserDetailComponent,
    children: [{
      path: 'timeline', component: TimelineAboutComponent
    },
      {
        path: 'timeline-friends', component: TimelineFriendsComponent
      }]
  },
  {
    path: 'people-detail/:id', component: PeopleDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
