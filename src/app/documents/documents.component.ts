import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  documents: any[];
  content: string;

  myForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  isUploaded = false;
  isUploadFailed = false;
  errorMessage = '';

  constructor(private userService: UserService) { }

  get f(){
    return this.myForm.controls;
  }

  ngOnInit(): void {
    this.documents = []
    this.content = ""

    this.userService.getDocuments().subscribe(
      data => {
        try{
          // this.content = JSON.parse(data);
          this.documents = JSON.parse(data).documents
        }catch(e){
          this.content = "Parsing error"
        }
      },
      err => {
        try{
          this.content = JSON.parse(err.error).message;
        }catch(e){
          this.content = "Parsing error"
        }
      }
    )
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.get('fileSource').setValue(file);
    }
  }



  submit(): void {

    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource').value);
    formData.append('title', this.myForm.get('title').value);


    this.userService.postDocument(formData).subscribe(
      data => {
        this.isUploadFailed = false;
        this.isUploaded = true;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error;
        this.isUploadFailed = true;
        this.isUploaded = false;
      }
    );
  }

  deleteDocument(document_id): void{
    this.userService.deleteDocument(document_id).subscribe(
      data => {
        this.reloadPage();
      },err => {
        this.errorMessage = err.error;
      }
    )
  }

  authenticateDocument(document_id): void{
    this.userService.authenticateDocument(document_id).subscribe(
      data => {
        this.reloadPage();
      },err => {
        this.errorMessage = err.error;
      }
    )
  }


  reloadPage(): void {
    window.location.reload();
  }

}
