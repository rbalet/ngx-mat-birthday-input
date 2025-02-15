import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent {
  filledDateForm = this._formBuilder.group({
    date: [new Date(), [Validators.max]],
  })

  emptyDateForm = this._formBuilder.group({
    date: ['', [Validators.max]],
  })

  today = new Date()

  constructor(private _formBuilder: FormBuilder) {}
}
