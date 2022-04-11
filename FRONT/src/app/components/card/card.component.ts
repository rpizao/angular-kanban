import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/models/card';
import { MessageService } from 'src/app/services/message/message.service';
import { FormUtils } from 'src/app/utils/form.utils';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  private _data: Card = {} as Card;

  formulario: FormGroup;

  constructor(private dialog: MatDialog, private fb: FormBuilder, private messageService: MessageService) {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      conteudo: ['', Validators.required]
    });
  }

  showMarkdownTips() {
    this.dialog.open(MarkdownTipsDialog);
  }

  ngOnInit(): void {
  }

  @Input()
  set data(data: Card) {
    this._data = data;
    this.formulario.patchValue({ ...this._data });
  }

  confirm(){
    if(FormUtils.isInvalid(this.formulario)) return;

    const updated = {...this.formulario.value, lista: this._data.lista, id: this._data.id};
    this.messageService.addOrUpdate({...updated});
  }

  cancel(){
    this.messageService.cancel(this._data);
  }

}


@Component({
  selector: 'markdown-tips-dialog',
  template: `
    <h1 mat-dialog-title>Dicas de formatação</h1>
    <div class="side-by-side" mat-dialog-content>
      <pre>{{dicas}}</pre>
    </div>
  `,
})
export class MarkdownTipsDialog {
  dicas = `
  Cabeçalho
  1.1: Preparação
  ----------------

  Negrito
  Quebre os ovos **cuidadosamente**.

  Ênfase
  Bata os ovos *vigorosamente*.

  Listas
  Ingredientes:
  - Ovos
  - Óleo
  - *Opcional*: leite

  Links
  Para fazer download de uma versão em PDF da receita,
  [clique aqui](https://example.com/scrambled-eggs.pdf).

  Imagens
  ![O Prato Terminado](https://example.com/eggs.png)

  Códigos fonte
  \`\`\` javascript
  const language = 'typescript';
  \`\`\` `
}
