import { Suggestion } from '@/types/data';
import { produce } from 'immer';
import { SearchAction } from './../../types/store.d';

type SearchState = {
  suggestion: Suggestion
}

const initialState: SearchState = {
  suggestion: []
}

const search = produce((draft, action: SearchAction) => {
  switch (action.type) {
    case 'search/suggestion':
      draft.suggestion = action.payload
      break;

    default:
      break;
  }

}, initialState)

export default search