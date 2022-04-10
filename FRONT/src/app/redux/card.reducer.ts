import { createReducer, Action } from 'typed-reducer';
import { Card } from '../models/card';
import { AddCardAction, DeleteCardAction, UpdateCardAction } from './card.actions';

class CardReducer {
    @Action
    public add(state: Card[], action: AddCardAction): Card[] {
        return [ ...state, action.payload ];
    }

    @Action
    public update(state: Card[], action: UpdateCardAction): Card[] {
        return state.map(card => {
          return card.codigo === action.payload.codigo ? action.payload : card;
        });
    }

    @Action
    public delete(state: Card[], action: DeleteCardAction): Card[] {
        return state.filter(card => card.codigo !== action.payload.codigo);
    }
}

const state:Card[] = []; // initial state
export const todos = createReducer(CardReducer)(state);
