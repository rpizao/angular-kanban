import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/modelos/card';
import { CardService } from 'src/app/servicos/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  private _data: Card | undefined;

  formulario: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private cardService: CardService) {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      conteudo: ['', Validators.required]
    });
  }

  exibirDicasMarkdown() {
    this.dialog.open(DicasPreenchimentoDialog);
  }

  ngOnInit(): void {
  }

  @Input()
  set data(data: Card | undefined) {
    this._data = data;
    this.formulario.patchValue({data});
  }

  get data(): Card| undefined {
    return this._data;
  }

  criarCard(){
    this.cardService.criar()
  }

}


@Component({
  selector: 'dicas-preenchimento-dialog',
  template: `
    <h1 mat-dialog-title>Dicas de formatação</h1>
    <div class="side-by-side" mat-dialog-content>
      <pre>{{dicas}}</pre>
    </div>
  `,
})
export class DicasPreenchimentoDialog {
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
