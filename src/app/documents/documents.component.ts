import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  documents: any[];
  content: string;

  form: any = {};
  isUploaded = false;
  isUploadFailed = false;
  errorMessage = '';

  constructor(private userService: UserService) { }

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

  onSubmit(): void {
    this.userService.postDocument(this.form).subscribe(
      data => {
        this.isUploadFailed = false;
        this.isUploaded = true;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isUploadFailed = true;
        this.isUploaded = false;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
