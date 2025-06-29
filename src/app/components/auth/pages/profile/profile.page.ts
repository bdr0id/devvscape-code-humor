import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import {
  Auth,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from '@angular/fire/auth';
import { ImageService } from 'src/app/core/services/image.service';
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
} from '@angular/fire/firestore';
import { Image } from 'src/app/core/models/data/image.interface';
import { UserProfile } from 'src/app/core/models/data/user.interface';
import { Comment } from 'src/app/core/models/data/comment.interface.ts';
import { AdMobService } from 'src/app/core/services/ad-mob.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnDestroy, OnInit {
  maxLength = 200;
  currentUser: any;
  selectedSegment: string = 'comments';
  images$!: Observable<Image[]>;
  comments: Comment[] = [];
  user: any;
  userPostsComments$!: Observable<Comment[]>;
  starredImages$!: Observable<Image[]>;
  fullNames: string = '';
  imageLoaded: boolean = false;
  isTextTruncated: boolean = true;
  commentsSubscription!: Subscription;
  errorMessage: string = '';
  showError: boolean = false;

  constructor(
    private auth: Auth,
    private authService: AuthService,
    private imageService: ImageService,
    private adMobService: AdMobService,
    private router: Router,
    private profileService: ProfileService,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
    this.fetchImages();
    this.fetchUserPostComments();
    this.fetchStarredImages();
    this.profileService
      .getUserProfile()
      .subscribe((userProfile: UserProfile) => {
        this.fullNames = userProfile.fullName;
      });
  }

  ngOnDestroy(): void {
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.adMobService.hideBannerAd('home-banner-ad');
  }

  ionViewWillLeave() {
    this.adMobService.showBannerAd(
      'home-banner-ad',
      'ca-app-pub-6424707922606590/3709250809'
    );
  }

  refresh(ev: any) {
    this.fetchImages();
    this.fetchUserPostComments();
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  changeDP() {}

  openProfile(author: string) {
    // console.log removed for production
  }

  generateAvatarUrl(name: string): string {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('');
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&format=svg`;
  }

  async updateDisplayName(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { type: 'text', name: 'username', placeholder: 'Your new username' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: async data => {
            const newDisplayName = data.username;
            const user = this.auth.currentUser;
            if (user) {
              try {
                await updateProfile(user, { displayName: newDisplayName });
                const toast = await this.toastCtrl.create({
                  message: 'Display name updated successfully',
                  duration: 3000,
                  position: 'bottom',
                  color: 'success',
                });
                await toast.present();
                this.user.displayName = newDisplayName;
              } catch (error) {
                const toast = await this.toastCtrl.create({
                  message: 'Error updating display name',
                  duration: 3000,
                  position: 'bottom',
                  color: 'danger',
                });
                await toast.present();
                console.error('Error updating display name:', error);
              }
            }
          },
        },
      ],
    });
    return await alert.present();
  }

  async updateEmail(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { type: 'text', name: 'newEmail', placeholder: 'Your new email' },
        { name: 'password', placeholder: 'Your password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: async data => {
            const newEmail = data.newEmail;
            const password = data.password;
            const user = this.auth.currentUser;
            if (user && user.email) {
              const credential = EmailAuthProvider.credential(
                user.email,
                password
              );
              try {
                await reauthenticateWithCredential(user, credential);
                await updateEmail(user, newEmail);
                const toast = await this.toastCtrl.create({
                  message: 'Email updated successfully',
                  duration: 3000,
                  position: 'bottom',
                  color: 'success',
                });
                await toast.present();
                this.user.email = newEmail;
              } catch (error) {
                const toast = await this.toastCtrl.create({
                  message: 'Error updating email',
                  duration: 3000,
                  position: 'bottom',
                  color: 'danger',
                });
                await toast.present();
                console.error('Error updating email:', error);
              }
            }
          },
        },
      ],
    });
    return await alert.present();
  }

  openImage(id: string): void {
    this.router.navigate(['image', id]);
  }

  async logOut() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging out...',
      duration: 3000, // Adjust the duration as needed
    });
    await loading.present();

    await Preferences.remove({ key: 'lang' });

    this.authService.logout().subscribe({
      next: async () => {
        await loading.dismiss();
        this.router.navigate(['/login']);
      },
      error: async error => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Error logging out',
          duration: 3000,
          position: 'bottom',
          color: 'danger',
        });
        await toast.present();
        console.error('Logout error', error);
      },
    });
  }

  segmentChanged() {}

  async fetchImages() {
    if (this.selectedSegment === 'posts') {
      const loading = await this.loadingCtrl.create({});
      await loading.present();
      this.images$ = this.imageService.getUserPosts();
      this.images$.subscribe({
        next: () => loading.dismiss(),
        error: () => loading.dismiss(),
        complete: () => loading.dismiss(),
      });
    } else if (this.selectedSegment === 'comments') {
      this.fetchUserPostComments();
    } else if (this.selectedSegment === 'stars') {
      this.fetchStarredImages();
    }
  }

  async fetchUserPostComments() {
    const loading = await this.loadingCtrl.create({});
    await loading.present();
    this.userPostsComments$ = this.imageService.getUserPostsComments(
      this.currentUser?.uid
    );
    this.commentsSubscription = this.userPostsComments$.subscribe({
      next: comments => {
        this.comments = comments;
        loading.dismiss();
      },
      error: () => loading.dismiss(),
      complete: () => loading.dismiss(),
    });
  }

  async fetchStarredImages() {
    const loading = await this.loadingCtrl.create({});
    await loading.present();
    this.starredImages$ = this.imageService.getStarredImages(
      this.currentUser?.uid
    );
    this.starredImages$.subscribe({
      next: () => loading.dismiss(),
      error: () => loading.dismiss(),
      complete: () => loading.dismiss(),
    });
  }

  async commentAction(comment: Comment) {
    //// console.log removed for production
    this.router.navigate(['image', comment.postId]);
  }

  async deleteComment(comment: Comment) {
    if (this.currentUser?.uid === comment.postedBy) {
      const confirm = await this.alertCtrl.create({
        header: 'Delete',
        message: 'Are you sure you want to delete this comment?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {},
          },
          {
            text: 'Delete',
            role: 'exit',
            handler: async () => {
              try {
                if (comment.postId && comment.id) {
                  await this.imageService.deleteComment(
                    comment.postId,
                    comment.id
                  );

                  const toast = await this.toastCtrl.create({
                    message:
                      'Your comment has been deleted from the app repository!',
                    duration: 5000,
                    position: 'bottom',
                    color: 'danger',
                  });
                  await toast.present();

                  await this.fetchUserPostComments();
                } else {
                  await this.presentErrorToast(
                    'Error: Comment or post ID is missing.'
                  );
                }
              } catch (error) {
                console.error('Error deleting comment:', error);
                await this.presentErrorToast('Error deleting comment');
              }
            },
          },
        ],
      });
      await confirm.present();
    } else {
      await this.presentErrorToast(
        'You are not authorized to delete this comment.'
      );
    }
  }

  async presentErrorToast(message: string): Promise<void> {
    this.errorMessage = message;
    this.showError = true;
  }

  dismissError() {
    this.showError = false;
    this.errorMessage = '';
  }

  async deleteImage(image: Image) {
    const confirm = this.alertCtrl.create({
      header: 'Delete',
      message: 'About to delete a post. 🤠 Ready to hit `delete` on that post?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Delete',
          role: 'exit',
          handler: async () => {
            const user = this.auth.currentUser;
            const userId = user?.uid;
            try {
              if (image.postedBy === userId) {
                const firestore = getFirestore();
                const postsCollection = collection(firestore, 'posts');
                const postRef = doc(postsCollection, image.id);

                await deleteDoc(postRef);
                this.fetchImages();

                const toast = this.toastCtrl.create({
                  message:
                    'Your post has been deleted from the app repository!',
                  duration: 5000,
                  position: 'bottom',
                  color: 'success',
                });
                (await toast).present();
              }
            } catch (error) {
              console.error('Error deleting post:', error);
              throw error;
            }
          },
        },
      ],
    });
    (await confirm).present();
  }

  formatCardSubtitle(image: any): string {
    const displayName = image.displayName || 'devvscape_user';
    let formattedText = image.postText;

    if (this.isTextTruncated && image.postText.length > this.maxLength) {
      formattedText = image.postText.substring(0, this.maxLength) + '...';
    }

    formattedText = formattedText.replace(
      /#(\w+)/g,
      `<a class="hashtag" style="
        color: blue;
        text-decoration: none;
        cursor: pointer;
      ">#$1</a>`
    );

    const formattedTextWithLineBreaks = formattedText.replace(/\\n/g, '<br>');

    return `<b>${displayName}</b> ${formattedTextWithLineBreaks}`;
  }

  toggleText(): void {
    this.isTextTruncated = !this.isTextTruncated;
  }

  async unstarImage(image: Image) {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await this.imageService.likeImage(image.id, user.uid);
        // Refresh the starred images list
        this.fetchStarredImages();
        const toast = await this.toastCtrl.create({
          message: 'Image unstarred successfully',
          duration: 2000,
          position: 'bottom',
          color: 'success',
        });
        await toast.present();
      } catch (error) {
        await this.presentErrorToast(`Error unstarring image: ${error}`);
      }
    }
  }
}
