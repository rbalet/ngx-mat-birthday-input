import { FocusMonitor } from '@angular/cdk/a11y'
import { coerceBooleanProperty } from '@angular/cdk/coercion'
import { NgIf } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Optional,
  Output,
  Self,
  ViewChild,
  booleanAttribute,
} from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgControl,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms'
import { ErrorStateMatcher, _AbstractConstructor, mixinErrorState } from '@angular/material/core'
import {
  MatFormFieldAppearance,
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Subject, takeUntil } from 'rxjs'

class ngxMatBirthdayInputBase {
  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl,
  ) {}
}

const _ngxMatBirthdayInputMixinBase: typeof ngxMatBirthdayInputBase = mixinErrorState(
  ngxMatBirthdayInputBase as _AbstractConstructor<any>,
)

@Component({
  standalone: true,
  selector: 'ngx-mat-birthday-input',
  templateUrl: './ngx-mat-birthday-input.component.html',
  styleUrls: ['./ngx-mat-birthday-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: NgxMatBirthdayInputComponent,
    },
  ],
  imports: [
    NgIf,

    // Forms
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class NgxMatBirthdayInputComponent
  extends _ngxMatBirthdayInputMixinBase
  implements OnDestroy, DoCheck
{
  static nextId = 0

  @ViewChild('monthInput', { static: false }) monthInput!: ElementRef
  @ViewChild('yearInput', { static: false }) yearInput!: ElementRef

  @HostBinding()
  id = `ngx-mat-birthday-input-${NgxMatBirthdayInputComponent.nextId++}`

  itemForm = this._createItemForm()
  private _controls = {
    day: this.itemForm.get('day'),
    month: this.itemForm.get('month'),
    year: this.itemForm.get('year'),
  }

  today = new Date()

  @Input() autocomplete: 'on' | 'off' = 'on'
  @Input() errorStateMatcher: ErrorStateMatcher = this._defaultErrorStateMatcher
  @Input() labels: [string, string, string] = ['DD', 'MM', 'YYYY']
  @Input() placeholders: [string, string, string] = ['', '', '']
  @Input() name?: string
  @Input() appearance: MatFormFieldAppearance = 'fill'

  @Output() dateChanged: EventEmitter<Date> = new EventEmitter<Date>()

  private _unsubscribe$: Subject<void> = new Subject()
  private _placeholder?: string
  private _required = false
  private _disabled = false
  stateChanges = new Subject<void>()
  focused = false
  describedBy = ''
  value?: any

  private _formerValues = {
    day: '',
    month: '',
    year: '',
  }

  onTouched = () => {}

  propagateChange = (_: any) => {}

  @HostBinding('class.ngx-floating')
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty
  }

  @Input()
  get placeholder(): string {
    return this._placeholder || ''
  }

  set placeholder(value: string) {
    this._placeholder = value
    this.stateChanges.next(undefined)
  }

  @Input({ transform: booleanAttribute })
  get required(): boolean {
    return this._required
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value)
    this.stateChanges.next(undefined)
  }

  @Input()
  get disabled(): boolean {
    return this._disabled
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value)
    this.stateChanges.next(undefined)
  }

  private errorState?: boolean
  private _isEmpty = true

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fm: FocusMonitor,
    private _elRef: ElementRef<HTMLElement>,
    private _formBuilder: FormBuilder,
    @Optional() @Self() _ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher,
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, _ngControl)

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this
    }

    this._subscribe()
  }

  private _subscribe() {
    this._fm.monitor(this._elRef, true).subscribe((origin) => {
      if (this.focused && !origin) {
        this.onTouched()
      }
      this.focused = !!origin
      this.stateChanges.next()
    })

    this.itemForm.valueChanges.pipe(takeUntil(this._unsubscribe$)).subscribe((value) => {
      this._isEmpty = !value.day && !value.month && !value.year ? true : false

      if (
        value?.day?.length &&
        value.day.length >= 2 &&
        value?.month?.length &&
        value.month.length >= 2 &&
        value?.year?.length &&
        value.year.length >= 4
      ) {
        this.propagateChange(new Date(+value.year, +value.month, +value.day).toISOString())
        this._changeDetectorRef.markForCheck()
      }
    })

    this.itemForm
      .get('day')
      ?.valueChanges.pipe(takeUntil(this._unsubscribe$))
      .subscribe((value) => {
        if (value.includes('00')) {
          this._controls.day?.setValue(this._formerValues.day)
          return
        }
        if (!this._controlValue(value, 'day')) return

        if (+value > 31) this._controls.day?.setValue('31')
        else if (typeof value === 'number' && value < 0) this._controls.day?.setValue('01')

        if ((+value >= 10 && +value <= 31) || +value > 3 || value.length >= 2) {
          if (+value < 10 && !value.toString().includes('0'))
            this._controls.day?.setValue(`0${value}`)

          this.monthInput?.nativeElement.focus()
        }
      })

    this.itemForm
      .get('month')
      ?.valueChanges.pipe(takeUntil(this._unsubscribe$))
      .subscribe((value) => {
        if (value.includes('00')) {
          this._controls.month?.setValue(this._formerValues.month)
          return
        }
        if (!this._controlValue(value, 'month')) return

        if (+value > 12) this._controls.month?.setValue('12')
        else if (typeof value === 'number' && value < 0) this._controls.month?.setValue('01')

        if ((+value >= 2 && +value <= 12) || value.length >= 2) {
          if (+value < 10 && !value.toString().includes('0'))
            this._controls.month?.setValue(`0${value}`)

          this.yearInput?.nativeElement.focus()
        }
      })

    this.itemForm
      .get('year')
      ?.valueChanges.pipe(takeUntil(this._unsubscribe$))
      .subscribe((value) => {
        if (!this._controlValue(value, 'year')) return
        if (value.startsWith('0')) {
          this._controls.year?.setValue('')
        }

        if (+value > this.today.getFullYear())
          this._controls.year?.setValue(this.today.getFullYear().toString())
        else if (+value < 0 || (+value > 1000 && +value < this.today.getFullYear() - 120))
          this._controls.year?.setValue((+this.today.getFullYear() - 120).toString())
      })
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      const oldState = this.errorState
      const newState = this.errorStateMatcher.isErrorState(this.ngControl.control, this._parentForm)

      this.errorState =
        (newState && (!this.ngControl.control?.value || this.ngControl.control?.touched)) ||
        (!this.focused ? newState : false)

      if (oldState !== newState) {
        this.errorState = newState
        this.stateChanges.next()
      }
    }
  }

  private _createItemForm(): FormGroup<{
    day: FormControl<string>
    month: FormControl<string>
    year: FormControl<string>
  }> {
    return this._formBuilder.group({
      day: new FormControl('', { nonNullable: true }),
      month: new FormControl('', { nonNullable: true }),
      year: new FormControl('', { nonNullable: true }),
    })
  }

  private _updateItemForm(birthday?: string): void {
    let day = ''
    let month = ''
    let year = ''

    if (birthday) {
      const tempBDay = new Date(birthday)
      day = tempBDay.getDate().toString()
      month = tempBDay.getMonth().toString()
      year = tempBDay.getFullYear().toString()
    }

    this.itemForm.patchValue({
      day: this._addZero(day),
      month: this._addZero(month),
      year: year,
    })
  }

  registerOnChange(fn: any): void {
    console.log('registerOnChange')
    this.propagateChange = fn
  }

  registerOnTouched(fn: any): void {
    console.log('registerOnTouched')
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
    this._changeDetectorRef.markForCheck()
    this.stateChanges.next(undefined)
  }

  writeValue(value: any): void {
    console.log('writeValue')
    this._updateItemForm(value)

    // Value is set from outside using setValue()
    this._changeDetectorRef.markForCheck()
    this.stateChanges.next(undefined)
  }
  get empty(): boolean {
    return this._isEmpty
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ')
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      // tslint:disable-next-line:no-non-null-assertion
      this._elRef.nativeElement.querySelector('input')!.focus()
    }
  }

  reset() {
    this.itemForm.reset()
    this.propagateChange(null)

    this._changeDetectorRef.markForCheck()
    this.stateChanges.next(undefined)
  }

  ngOnDestroy() {
    this.stateChanges.complete()
    this._fm.stopMonitoring(this._elRef)

    this._unsubscribe$.next()
    this._unsubscribe$.complete()
  }

  /**
   * @do Avoid being able to enter incorrect values like e, 0.3, ...
   */
  private _controlValue(value: string, target: 'day' | 'month' | 'year'): boolean {
    if (isNaN(+value) || value.includes('.')) {
      this._controls[target]?.setValue(this._formerValues[target])
      return false
    }

    this._formerValues[target] = value
    return true
  }

  private _addZero(number: string) {
    if (number.length === 1) return '0' + number
    return number
  }
}
