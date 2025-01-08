import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
    selector: 'app-root',
    styleUrl: './app.component.css',
    templateUrl: './app.component.html',
    standalone: false
})
export class AppComponent {
  emptyBirthdayForm = this._formBuilder.group({
    birthday: [new Date(), [Validators.max]],
  })

  filledBirthdayForm = this._formBuilder.group({
    birthday: ['', [Validators.max]],
  })

  tomorrow = new Date().getDate() + 1

  constructor(private _formBuilder: FormBuilder) {}
}
