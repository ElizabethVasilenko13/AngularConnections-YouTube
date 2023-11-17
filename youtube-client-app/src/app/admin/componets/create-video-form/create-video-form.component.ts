import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { futureDate } from 'src/app/shared/validators/future-date';

@Component({
  selector: 'app-create-video-form',
  templateUrl: './create-video-form.component.html',
  styleUrls: ['./create-video-form.component.scss']
})
export class CreateCardFormComponent {
  constructor(private fb: FormBuilder) {}

  createCardForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(255)]],
    img: ['', [Validators.required]],
    videoLink: ['', [Validators.required]],
    creationDate: ['', [Validators.required, futureDate()]],
    tags: this.fb.array([this.createTag()]),
  });

  isInvalid(controlName: string): boolean {
    const control = this.createCardForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.createCardForm.get(controlName);
    return !!control && control.hasError(error);
  }

  get tags(): FormArray {
    return this.createCardForm.get('tags') as FormArray
  }

  isInvalidTag(i: number): boolean {
    const tagControl = this.tags.at(i).get('tag');
    return !!tagControl && tagControl.invalid && (tagControl.dirty || tagControl.touched);
  }

  hasTagError(i: number, error: string): boolean {
    const tagControl = this.tags.at(i).get('tag');
    return !!tagControl && tagControl.hasError(error);
  }

  onSubmit(): void {
    console.log('video created');
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
}
