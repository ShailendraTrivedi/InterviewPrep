import { createStore, combineReducers, applyMiddleware } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { contentReducer } from '../reducer/contentReducer';
import { contentSaga } from '../saga/contentSaga';

const rootReducer = combineReducers({ content: contentReducer });
export type RootState = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(contentSaga);
