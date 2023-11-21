# NgxMatBirthdayInput
An Angular Material package for entering a birthday. 
I split a date into 3 input fields, day, month and year, then reassemble and save them into a given formControl

The UI is based on the [Vitaly Friedman](https://www.smashingmagazine.com/author/vitaly-friedman/) article, [Designing Birthday Picker UX: Simpler Is Better](https://www.smashingmagazine.com/2021/05/frustrating-design-patterns-birthday-picker/#designing-a-better-birthday-input)


![Input example](/assets/example.png)

**Supports:**
- Angular >=15
- Angular Material >=15

 ## Installation

 `npm i ngx-mat-birthday-input`

 ## Usage

 ### Import

Add `NgxMatBirthdayInputComponent` to your component file:

```ts
imports: [NgxMatBirthdayInputComponent];
```

## Example
*  Add `floatLabel` to your `mat-form-field`
*  Use a preset `formControlName`
*  This `formControlName` will be automatically updated, therefore giving you the possibility to add your own `mat-error` _see the comment_

```html
<form #f="ngForm" [formGroup]="birthdayForm">
  <mat-form-field
    floatLabel="always"
  >
    <!-- <mat-label>Birthday</mat-label> -->

    <ngx-mat-birthday-input
      formControlName="birthday"
      id="birthday"
    >
    </ngx-mat-birthday-input>

    <!-- <mat-icon matSuffix>event</mat-icon>
    <mat-error *ngIf="authRegistrationService.itemForm?.get('birthday').invalid">
      {{ Invalide error message }}
    </mat-error> -->
  </mat-form-field>
</form>
```

## Options

| Options         | Type            | Default                | Description                      |
| --------------- | --------------- | ---------------------- | -------------------------------- |
| formControlName | `FormControl`   | `undefined`            | Value to be updated              |
| autocomplete    | `"on" or "off"` | `"on"`                 | Use the default browser autofill |
| labels          | `string[]`      | `["DD", "MM", "YYYY"]` | Label used by the mat-input      |
| placeholders    | `string[]`      | `undefined`            | @TODO                            |
| required        | `boolean`       | `undefined`            | @TODO                            |
| disabled        | `boolean`       | `undefined`            | @TODO                            |

## Css variable
| Name                           | Default | Explanation                       |
| ------------------------------ | ------- | --------------------------------- |
| `--ngx-mat-birthday-input-gap` | `16px`  | Change the gap between the inputs |
