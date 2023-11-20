import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { futureDate } from 'src/app/shared/validators/future-date';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  constructor(private fb: FormBuilder) {}

  createCardForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(255)]],
    img: ['', [Validators.required]],
    videoLink: ['', [Validators.required]],
    creationDate: ['', [Validators.required, futureDate()]],
    tags: this.fb.array([this.createTag()]),
  });

  get tags(): FormArray {
    return this.createCardForm.get('tags') as FormArray;
  }

  createTag(): FormGroup {
    return this.fb.group({
      tag: ['', [Validators.required]],
    });
  }

  addTag(): void {
    if (this.tags.controls.length < 5) {
      this.tags.push(this.createTag());
    }
  }

  resetForm(): void {
    this.createCardForm.reset();
    this.createCardForm.setControl('tags', this.fb.array([this.createTag()]));
  }

  onSubmit(): void {
    console.log('video created');
    this.resetForm();
  }
}
