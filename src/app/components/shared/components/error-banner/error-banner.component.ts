import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-banner',
  templateUrl: './error-banner.component.html',
  styleUrls: ['./error-banner.component.scss']
})
export class ErrorBannerComponent {
  @Input() errorMessage: string = '';
  @Input() showError: boolean = false;
  @Output() dismissError = new EventEmitter<void>();

  onDismiss() {
    this.dismissError.emit();
  }
} 