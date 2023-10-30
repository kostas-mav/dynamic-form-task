import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroupComponent,
  Group,
} from 'src/app/shared/components/form-group/form-group.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from 'src/app/shared/components/inputs/text/text-input.component';
import { DateInputComponent } from 'src/app/shared/components/inputs/date/date-input.component';
import { ComboboxInputComponent } from 'src/app/shared/components/inputs/combobox/combobox-input.component';
import { MaterialModule } from 'src/app/shared/utils/material/material.module';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormControlComponent } from 'src/app/shared/components/form-control/form-control.component';
import { FormHeaderDirective } from 'src/app/shared/directives/form/form-header.directive';
import { FormFooterDirective } from 'src/app/shared/directives/form/form-footer.directive';

export interface Form {
  title: string;
  inline: number;
  groups: Group[];
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormGroupComponent,
    FormControlComponent,
    TextInputComponent,
    DateInputComponent,
    ComboboxInputComponent,
    ButtonComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) formPreview!: Form | null;
  @Input({ required: true }) formOutput!: {
    [key: string]: string | null;
  } | null;

  @ContentChild(FormHeaderDirective, { read: TemplateRef })
  headerTemplate!: TemplateRef<any>;

  @ContentChild(FormFooterDirective, { read: TemplateRef })
  footerTemplate!: TemplateRef<any>;
}
