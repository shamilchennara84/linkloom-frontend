import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { RootState } from './app.state';

export const hydrationMetaReducer = (reducer: ActionReducer<RootState>): ActionReducer<RootState> => {
  return (state, action) => {
    console.groupCollapsed(`hydrationMetaReducer: ${action.type}`);
    // console.log('Previous state:', state);
    // console.log('Action:', action);

    if (typeof window !== 'undefined' && (action.type === INIT || action.type === UPDATE)) {
      const storageValue = localStorage.getItem('state');
      if (storageValue != null) {
        try {
          const parsedState = JSON.parse(storageValue);
          // console.log('Rehydrating state from localStorage:', parsedState);
          return parsedState;
        } catch {
          console.warn('Failed to parse state from localStorage');
          localStorage.removeItem('state');
        }
      }
    }

    const nextState = reducer(state, action);
    // console.log('Next state:', nextState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('state', JSON.stringify(nextState));
    }
    console.groupEnd();
    return nextState;
  };
};
