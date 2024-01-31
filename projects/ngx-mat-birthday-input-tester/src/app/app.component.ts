import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {
  birthdayForm = this._formBuilder.group({
    birthday: [new Date(), [Validators.max]],
  })

  tomorrow = new Date().getDate() + 1

  constructor(private _formBuilder: FormBuilder) {}
}
