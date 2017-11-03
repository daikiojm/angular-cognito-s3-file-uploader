import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from './../../service/cognito.service';
import { S3Service } from './../../service/s3.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  public remoteFiles: any[];

  constructor(
    private router: Router,
    private cognito: CognitoService,
    private s3: S3Service
  ) { }

  ngOnInit() {
    this.s3.getFileList().then((data) => {
      if (data) {
        this.remoteFiles = data.Contents;
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  onClickLogout() {
    this.cognito.logout();
    this.router.navigate(['/login']);
  }

  onClickFile(item: any) {
    this.s3.getFile(item.Key).then((data) => {
      const blob = new Blob([data.Body], { type: data.ContentType });
      const url = window.URL.createObjectURL(blob);
      const linkElement = document.createElement('a');
      linkElement.download = item.Key;
      linkElement.href = url;
      linkElement.click();
    }).catch((err) => {
      console.log(err);
    });
  }
}
