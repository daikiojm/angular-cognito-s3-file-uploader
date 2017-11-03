import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from './../../service/cognito.service';
import { S3Service } from './../../service/s3.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  private uploadFile: any;
  public uploadResult: string;

  constructor(
    private router: Router,
    private cognito: CognitoService,
    private s3: S3Service
  ) {
    this.uploadResult = '';
    this.cognito.isAuthenticated()
    .then(res => console.log(res))
    .catch((err) => {
      return console.log(err) || this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
  }

  onInputChange(event: any) {
    const files = event.target.files;
    this.uploadFile = files[0];
  }

  onClickUpload() {
    if (this.uploadFile) {
    this.s3.uploadFile(this.uploadFile).then((data) => {
      if (data) {
        this.uploadResult = 'アップロードが完了しました。';
      }
    }).catch((err) => {
      console.log(err);
    });
    } else {
      this.uploadResult = 'ファイルが選択されていません。';
    }
  }

  onClickLogout() {
    this.cognito.logout();
    this.router.navigate(['/login']);
  }
}
