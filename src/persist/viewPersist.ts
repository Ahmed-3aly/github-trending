import { IPersistingState } from '../state';
import { Persist } from './IPersist';

const key = 'view';

export const viewPersist =
	new Persist<IPersistingState>
(
	key
);
