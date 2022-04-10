import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-card-readonly',
  templateUrl: './card-readonly.component.html',
  styleUrls: ['./card-readonly.component.scss']
})
export class CardReadonlyComponent implements OnInit {

  @Input()
  data: Card | undefined;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

}
