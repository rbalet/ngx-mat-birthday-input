import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent {
  filledBirthdayForm = this._formBuilder.group({
    birthday: [new Date(), [Validators.max]],
  })

  emptyBirthdayForm = this._formBuilder.group({
    birthday: ['', [Validators.max]],
  })

  today = new Date()

  constructor(private _formBuilder: FormBuilder) {}
}
