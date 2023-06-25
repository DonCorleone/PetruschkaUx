import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsletter-item',
  templateUrl: './newsletter-item.component.html',
  styleUrls: ['./newsletter-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterItemComponent {
  constructor(private router: Router) { }

  submitHandler(event: Event): void {
    event.preventDefault();
    const myForm = document.getElementById("contact-form") as HTMLFormElement;
    const formData = new FormData(myForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(<any>formData).toString(),
    })
    .then(() => this.router.navigate(['/success']))
    .catch((error) => alert(error));
  }
}
