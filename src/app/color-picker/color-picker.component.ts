import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {
  @Input() color: string;
  @Output() colorChange = new EventEmitter<string>();

  public defaultColors = ['#f7e8f0', '#f1c6de', '#e89da2', '#ecb390', '#fcf8e8', '#ccedd2', '#b9cced', '#e1ccec', '#ececec', '#c7b198'];

  constructor() {
  }

  public changeColor(color: string): void {
    this.color = color;
    this.colorChange.emit(this.color);
  }

  changeColorManual(color: string): void {
    const isValid = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);

    if (isValid) {
      this.color = color;
      this.colorChange.emit(this.color);
    }
  }
}
