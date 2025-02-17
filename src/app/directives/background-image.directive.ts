import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBackgroundImage]'
})
export class BackgroundImageDirective  {



  constructor(private el: ElementRef, private renderer: Renderer2, private http: HttpClient) { }
  city!: string
  ngOnInit(): void {
    this.getLocation();



  }


  getLocation() {
    const apiUrl = `https://ipinfo.io/json?token=78212df9ecbea0`;
    this.http.get(apiUrl).subscribe({
      next: ((response: any) => {
        this.city = response.city;
        console.log(this.city)

        this.setBackgroundBasedOnLocation(this.city.toLowerCase())
      })
    })

  }
  private setBackgroundBasedOnLocation(city: string) {
    let imageUrl = '';
    switch (city) {
      case 'bahawalpur':
        imageUrl = 'url(/assets/Banners/bahawalpur.jpg)';
        break;
      case 'dubai':
        imageUrl = 'url(/assets/Banners/dubai.jpeg)';
        break;
      case 'landon':
        imageUrl = 'url(/assets/Banners/london.jpg)';
        break;
      default:
        imageUrl = 'url(https://media.istockphoto.com/id/1347665170/photo/london-at-sunset.jpg?s=612x612&w=0&k=20&c=MdiIzSNKvP8Ct6fdgdV3J4FVcfsfzQjMb6swe2ybY6I=)';
        break;
    }

    this.renderer.setStyle(this.el.nativeElement, 'background-image', imageUrl);
    this.renderer.setStyle(this.el.nativeElement, 'background-size', 'cover');
    this.renderer.setStyle(this.el.nativeElement, 'background-position', 'center');
  }
}

