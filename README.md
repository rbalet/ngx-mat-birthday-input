# NgxMatBirthdayInput
An Angular Material library for entering a birthday. 

![NPM](https://img.shields.io/npm/l/ngx-href)
[![npm version](https://img.shields.io/npm/v/ngx-mat-birthday-input.svg)](https://www.npmjs.com/package/ngx-mat-birthday-input)
![npm bundle size](https://img.shields.io/bundlephobia/min/ngx-mat-birthday-input)
![npm](https://img.shields.io/npm/dm/ngx-mat-birthday-input)

1. Split a date into 3 input fields, day, month and year, then reassemble and save them into a given formControl. 
2. **Automatically add `0`** in front of the day/month number.
3. **Remove `.` and `e`** from the possible input.
4. Does **automatically focus the next field** when needed. 
5. Based on the [Vitaly Friedman](https://www.smashingmagazine.com/author/vitaly-friedman/) article, [Designing Birthday Picker UX: Simpler Is Better](https://www.smashingmagazine.com/2021/05/frustrating-design-patterns-birthday-picker/#designing-a-better-birthday-input)


| fill                                                                                                      | outlined                                                                                                    |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ![Input example](https://raw.githubusercontent.com/rbalet/ngx-mat-birthday-input/main/assets/example.png) | ![Input example](https://raw.githubusercontent.com/rbalet/ngx-mat-birthday-input/main/assets/example-2.png) |

**Supports:**
- Angular >=15
- Angular Material >=15

## Demo
- https://stackblitz.com/~/github.com/rbalet/ngx-mat-birthday-input

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
    
    <!-- 
      <mat-datepicker-toggle matIconPrefix [for]="myDatePicker">
        <mat-icon matDatepickerToggleIcon>calendar_today</mat-icon>
      </mat-datepicker-toggle>
      <mat-datepicker touchUi #myDatePicker></mat-datepicker> 
    -->

    <ngx-mat-birthday-input
      formControlName="birthday"
      id="birthday"
    >
    <!-- [matDatepicker]="myDatePicker" -->
    </ngx-mat-birthday-input>

    <!-- <mat-icon matSuffix>event</mat-icon>
    <mat-error *ngIf="birthdayForm?.get('birthday').invalid">
      {{ Invalide error message }}
    </mat-error> -->
  </mat-form-field>
</form>
```

## Options

| Options         | Type            | Default                | Description                      |
| --------------- | --------------- | ---------------------- | -------------------------------- |
| formControlName | `FormControl`   | `undefined`            | Control to be updated            |
| autocomplete    | `"on" or "off"` | `"on"`                 | Use the default browser autofill |
| labels          | `string[]`      | `["DD", "MM", "YYYY"]` | Label used by the mat-input      |
| placeholders    | `string[]`      | `["", "", ""]`         | with an *s*                      |
| required        | `boolean`       | `undefined`            |                                  |
| disabled        | `boolean`       | `undefined`            |                                  |

## Css variable
| Name                           | Default | Explanation                       |
| ------------------------------ | ------- | --------------------------------- |
| `--ngx-mat-birthday-input-gap` | `16px`  | Change the gap between the inputs |


## Authors and acknowledgment
* maintainer [Raphaël Balet](https://github.com/rbalet)

[![BuyMeACoffee](https://www.buymeacoffee.com/assets/img/custom_images/purple_img.png)](https://www.buymeacoffee.com/widness)
