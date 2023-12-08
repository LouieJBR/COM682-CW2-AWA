// import {Component, OnInit} from "@angular/core";
// import {ImageService} from "../../services/ImageService";
// import {Router} from "@angular/router";
// import {RecentlyViewedService} from "../../services/RecentlyViewedService";
//
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   constructor(public router: Router, public imageService: ImageService, public recentlyViewedService: RecentlyViewedService) {}
//
//   imageList: any[] = [];
//   recentlyViewedProducts: any[] = [];
//
//
//   ngOnInit() {
//     this.getImages()
//   }
//
//   getImages(): void {
//     this.imageService.getImages().subscribe(data => {
//       this.imageList = data;
//       this.recentlyViewedProducts = this.recentlyViewedService.getRecentlyViewed()
//       this.createCardList(); // Call function to create card grid after data retrieval
//     });
//   }
//
//   redirectToImage(image: any) {
//     this.recentlyViewedService.addToRecentlyViewed(image);
//     this.recentlyViewedProducts = this.recentlyViewedService.getRecentlyViewed();
//     window.location.href = `/images/${image.id}`;
//   }
//
//   submitNewAsset(formData: FormData): void {
//     this.imageService.submitNewAsset(formData).subscribe(() => {
//       this.getImages();
//     }, error => {
//       console.error(error);
//     });
//   }
//
//   createCard(image: any) {
//     const container = document.createElement('div');
//     container.classList.add('container', 'my-3'); // Apply Bootstrap classes or your own styles
//
//     const card = document.createElement('div');
//     card.classList.add('card', 'mb-3', 'mx-auto'); // Adjust card classes based on your design
//     card.style.maxWidth = '50rem'; // Set max-width inline style
//
//     const row = document.createElement('div');
//     row.classList.add('row');
//
//     const colImg = document.createElement('div');
//     colImg.classList.add('col-md-4');
//
//     const img = document.createElement('img');
//     img.src = this.imageService.getImageURL(image.filePath); // Set image source dynamically
//     img.alt = 'Loading';
//     img.classList.add('img-fluid', 'rounded-start');
//
//     colImg.appendChild(img);
//
//     const colContent = document.createElement('div');
//     colContent.classList.add('col-md-8');
//
//     const cardBody = document.createElement('div');
//     cardBody.classList.add('card-body');
//
//     const cardTitle = document.createElement('h5');
//     cardTitle.classList.add('card-title');
//     cardTitle.textContent = image.userName; // Assign the 'userName' property
//
//     const cardText = document.createElement('p');
//     cardText.classList.add('card-text');
//     cardText.textContent = image.caption; // Assign the 'caption' property
//
//
//     cardBody.appendChild(cardTitle);
//     cardBody.appendChild(cardText);
//     colContent.appendChild(cardBody);
//
//     row.appendChild(colImg);
//     row.appendChild(colContent);
//     card.appendChild(row);
//
//     // Add click event
//     card.addEventListener('click', () => {
//       this.redirectToImage(image.id); // Call your function with the provided ID
//     });
//
//     container.appendChild(card);
//     console.log(card)
//     return container;
//   }
//
//
//   createCardList() {
//     const container = document.getElementById('cardContainer');
//     this.imageList.forEach((image: any) => { // Assuming this is your array of images
//       const cardElement = this.createCard(image); // Pass the image object to createCard
//       container?.appendChild(cardElement);
//     });
//   }
//
//
// }
//

import { Component, OnInit } from "@angular/core";
import { ImageService } from "../../services/ImageService";
import { Router } from "@angular/router";
import { RecentlyViewedService } from "../../services/RecentlyViewedService";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    public router: Router,
    public imageService: ImageService,
    public recentlyViewedService: RecentlyViewedService
  ) {}

  imageList: any[] = [];
  recentlyViewedProducts: any[] = [];

  ngOnInit() {
    this.getImages();
  }

  getImages(): void {
    this.imageService.getImages().subscribe((data: any[]) => {
      this.imageList = data.map((image) => ({
        id: image.id,
        userName: image.userName,
        caption: image.caption,
        filePath: this.imageService.getImageURL(image.filePath)
      }));

      this.recentlyViewedProducts = this.recentlyViewedService.getRecentlyViewed();
      this.createCardList(); // Call function to create card grid after data retrieval
    });
  }

  redirectToImage(id: string) {
    const image = this.imageList.find((img) => img.id === id);
    if (image) {
      this.recentlyViewedService.addToRecentlyViewed(image);
      this.recentlyViewedProducts = this.recentlyViewedService.getRecentlyViewed();
      this.router.navigate([`/images/${id}`]);
    }
  }

  createCard(image: any) {
    const container = document.createElement('div');
    container.classList.add('container', 'my-3');

    const card = document.createElement('div');
    card.classList.add('card', 'mb-3', 'mx-auto');
    card.style.maxWidth = '50rem';

    const row = document.createElement('div');
    row.classList.add('row');

    const colImg = document.createElement('div');
    colImg.classList.add('col-md-4');

    const img = document.createElement('img');
    img.src = image.filePath;
    img.alt = 'Loading';
    img.classList.add('img-fluid', 'rounded-start');

    colImg.appendChild(img);

    const colContent = document.createElement('div');
    colContent.classList.add('col-md-8');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = image.userName;

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = image.caption;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    colContent.appendChild(cardBody);

    row.appendChild(colImg);
    row.appendChild(colContent);
    card.appendChild(row);

    card.addEventListener('click', () => {
      this.redirectToImage(image.id);
    });

    container.appendChild(card);
    return container;
  }

  createCardList() {
    const container = document.getElementById('cardContainer');
    const cardContainer = document.createElement('div'); // Create a div to hold the cards
    cardContainer.classList.add('row'); // Apply Bootstrap row class

    this.imageList.forEach((image: any) => {
      const cardElement = this.createCard(image);
      cardContainer.appendChild(cardElement); // Append each card to the container
    });

    // Clear previous content in the cardContainer and append the new cards
    container!.innerHTML = '';
    container!.appendChild(cardContainer);
  }
}
