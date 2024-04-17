import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { BrowserModule } from '@angular/platform-browser'
import { NgxMatBirthdayInputComponent } from '../../../ngx-mat-birthday-input/src/lib/ngx-mat-birthday-input.component'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,

    // Mat
    MatIconModule,
    MatButtonModule,

    // Vendors
    NgxMatBirthdayInputComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
