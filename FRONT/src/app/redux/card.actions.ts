import { Card } from "../modelos/card";

const ADD_CARD = 'ADD';
const UPDATE_CARD = 'UPD';
const DELETE_CARD = 'DEL';

export class AddCardAction {
    public type = ADD_CARD;

    constructor(public payload: Card) {}
}

export class UpdateCardAction {
  public type = UPDATE_CARD;

  constructor(public payload: Card) {}
}

export class DeleteCardAction {
  public type = DELETE_CARD;

  constructor(public payload: Card) {}
}
