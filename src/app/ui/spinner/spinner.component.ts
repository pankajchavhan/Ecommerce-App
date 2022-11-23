import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SpinnerService } from 'src/app/service/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  constructor(private spinnerService: SpinnerService) {}

  loading$: Observable<boolean>;

  ngOnInit(): void {
    this.loading$ = this.spinnerService.getIsLoadingValue();
  }
}
