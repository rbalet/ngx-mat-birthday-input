import { FocusMonitor } from "@angular/cdk/a11y";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { NgIf } from "@angular/common";
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
} from "@angular/core";
import {
  FormBuilder,
  FormGroupDirective,
  FormsModule,
  NgControl,
  NgForm,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  ErrorStateMatcher,
  _AbstractConstructor,
  mixinErrorState,
} from "@angular/material/core";
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Subject, takeUntil } from "rxjs";

class ngxMatBirthdayInputBase {
  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl
  ) {}
}

const _ngxMatBirthdayInputMixinBase: typeof ngxMatBirthdayInputBase =
  mixinErrorState(ngxMatBirthdayInputBase as _AbstractConstructor<any>);

@Component({
  standalone: true,
  selector: "ngx-mat-birthday-input",
  templateUrl: "./ngx-mat-birthday-input.component.html",
  styleUrls: ["./ngx-mat-birthday-input.component.scss"],
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
  static nextId = 0;

  @ViewChild("monthInput", { static: false }) monthInput!: ElementRef;
  @ViewChild("yearInput", { static: false }) yearInput!: ElementRef;

  @HostBinding()
  id = `ngx-mat-birthday-input-${NgxMatBirthdayInputComponent.nextId++}`;

  itemForm = this._createItemForm();
  today = new Date();

  @Input() autocomplete: "on" | "off" = "on";
  @Input() errorStateMatcher: ErrorStateMatcher =
    this._defaultErrorStateMatcher;
  @Input() labels: string[] = ["DD", "MM", "YYYY"];
  @Input() placeholders?: string[];
  @Input() name?: string;

  @Output() dateChanged: EventEmitter<Date> = new EventEmitter<Date>();

  private _unsubscribe$: Subject<void> = new Subject();
  private _placeholder?: string;
  private _required = false;
  private _disabled = false;
  stateChanges = new Subject<void>();
  focused = false;
  describedBy = "";
  value?: any;

  onTouched = () => {};

  propagateChange = (_: any) => {};

  private errorState?: boolean;
  private _isEmpty = true;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fm: FocusMonitor,
    private _elRef: ElementRef<HTMLElement>,
    private _formBuilder: FormBuilder,
    @Optional() @Self() _ngControl: NgControl,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    _defaultErrorStateMatcher: ErrorStateMatcher
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, _ngControl);

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this._subscribe();
  }

  private _subscribe() {
    this._fm.monitor(this._elRef, true).subscribe((origin) => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    this.itemForm.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((value) => {
        this._isEmpty = !value.day && !value.month && value.year ? true : false;

        if (
          typeof value.day === "number" &&
          value.day > -1 &&
          typeof value.month === "number" &&
          value.month > -1 &&
          typeof value.year === "number" &&
          value.year > -1
        ) {
          this.propagateChange(
            new Date(value.year, value.month, value.day).toISOString()
          );
          this._changeDetectorRef.markForCheck();
        }
      });

    this.itemForm
      .get("day")
      ?.valueChanges.pipe(takeUntil(this._unsubscribe$))
      .subscribe((value) => {
        if (typeof value !== "number") return;

        if (value > 31) this.itemForm.get("day")?.setValue(31);
        else if (typeof value === "number" && value < 0)
          this.itemForm.get("day")?.setValue(1);

        if (value >= 10 && value <= 31) {
          this.monthInput.nativeElement.focus();
        }
      });

    this.itemForm
      .get("month")
      ?.valueChanges.pipe(takeUntil(this._unsubscribe$))
      .subscribe((value) => {
        if (typeof value !== "number") return;

        if (value > 12) this.itemForm.get("month")?.setValue(12);
        else if (typeof value === "number" && value < 1)
          this.itemForm.get("month")?.setValue(1);

        if (value >= 2 && value <= 12) {
          this.yearInput.nativeElement.focus();
        }
      });

    this.itemForm
      .get("year")
      ?.valueChanges.pipe(takeUntil(this._unsubscribe$))
      .subscribe((value) => {
        if (typeof value !== "number") return;
        if (value > this.today.getFullYear())
          this.itemForm.get("year")?.setValue(this.today.getFullYear());
        else if (
          typeof value === "number" &&
          (value < 0 ||
            (value > 1000 && value < this.today.getFullYear() - 120))
        )
          this.itemForm.get("year")?.setValue(this.today.getFullYear() - 120);
      });
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      const isInvalide = this.errorStateMatcher.isErrorState(
        this.ngControl.control,
        this._parentForm
      );

      this.errorState =
        (isInvalide && !this.ngControl.control?.value) ||
        (!this.focused ? isInvalide : false);
    }
  }

  private _createItemForm(birthday?: Date) {
    let tempBDay;
    if (birthday) tempBDay = new Date(birthday);

    return this._formBuilder.group({
      day: tempBDay?.getDay() || null,
      month: tempBDay?.getMonth() || null,
      year: tempBDay?.getFullYear() || null,
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
    this.stateChanges.next(undefined);
  }

  writeValue(value: any): void {
    if (!value) this._createItemForm();
    else if (value === "string") this._createItemForm(new Date(value.query));
    else this._createItemForm(value as Date);

    // Value is set from outside using setValue()
    this._changeDetectorRef.markForCheck();
    this.stateChanges.next(undefined);
  }
  get empty(): boolean {
    return this._isEmpty;
  }

  @HostBinding("class.ngx-floating")
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  @Input()
  get placeholder(): string {
    return this._placeholder || "";
  }

  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next(undefined);
  }

  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next(undefined);
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next(undefined);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(" ");
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== "input") {
      // tslint:disable-next-line:no-non-null-assertion
      this._elRef.nativeElement.querySelector("input")!.focus();
    }
  }

  reset() {
    this.itemForm.reset();
    this.propagateChange(null);

    this._changeDetectorRef.markForCheck();
    this.stateChanges.next(undefined);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._fm.stopMonitoring(this._elRef);

    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
