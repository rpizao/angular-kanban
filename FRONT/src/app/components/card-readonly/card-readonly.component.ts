import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/modelos/card';

@Component({
  selector: 'app-card-readonly',
  templateUrl: './card-readonly.component.html',
  styleUrls: ['./card-readonly.component.scss']
})
export class CardReadonlyComponent implements OnInit {

  @Input()
  data: Card | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
