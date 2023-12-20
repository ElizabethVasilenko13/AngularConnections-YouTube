import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@shared/ui/button/button.component';
import { videoCreated } from '@redux/actions/videos.actions';
import { FormControlComponent } from '@shared/components/form-control/form-control.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AdminPageComponent } from './admin-page.component';

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;
  let store: MockStore;

  const mockVideoData = {
    title: 'Title',
    description: 'Description',
    img: 'Image',
    videoLink: 'Video Link',
    creationDate: 'Date',
    tags: [{ tag: 'Tag 1' }]
  };

  const mockVideoDataReset = {
    title: null,
    description: null,
    img: null,
    videoLink: null,
    creationDate: null,
    tags: [{ tag: '' }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageComponent, FormControlComponent],
      imports: [ButtonComponent, ReactiveFormsModule],
      providers: [FormBuilder, provideMockStore()],
    });

    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    fixture.detectChanges();
    const tagsArray = component.createCardForm.get('tags') as FormArray;

    expect(component.createCardForm.get('title')?.value).toEqual('');
    expect(component.createCardForm.get('description')?.value).toEqual('');
    expect(component.createCardForm.get('img')?.value).toEqual('');
    expect(component.createCardForm.get('videoLink')?.value).toEqual('');
    expect(component.createCardForm.get('creationDate')?.value).toEqual('');
    expect(component.createCardForm.get('description')?.value).toEqual('');
    expect(tagsArray.controls[0].get('tag')?.value).toEqual('');
  });

  it('should add a tag to the form', () => {
    component.addTag();
    expect(component.tags.controls.length).toBe(2);
  });

  it('should reset the form', () => {
    component.createCardForm.setValue(mockVideoData);
    component.resetForm();
    expect(component.createCardForm.value).toEqual(mockVideoDataReset);
  });

  it('should dispatch "Video Created" action on form submit', () => {
    const storeSpy = jest.spyOn(store, 'dispatch');
    component.createCardForm.setValue(mockVideoData);
    component.onSubmit();

    expect(storeSpy).toHaveBeenCalledWith(videoCreated({ video: mockVideoData }));
    expect(component.createCardForm.value).toEqual(mockVideoDataReset);
  });
});