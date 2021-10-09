import { RootState } from './../Store/index';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

export const useTypedSelector :TypedUseSelectorHook<RootState> = useSelector

