import { GenericState } from '@audiob/web/shared/data-access/models';
import { DataStore } from './data.store';

interface Profile {
  name: string;
  age: number;
}

interface UserState extends GenericState<Profile> {
  id: number
}

class UserDataStore extends DataStore<UserState> {}

describe('DataStore', () => {
  let dataStore: UserDataStore;

  beforeEach(() => {
    dataStore = new UserDataStore({
      id: 1,
      status: 'loading',
      error: null,
      data: {
        name: '',
        age: 0,
      },
    })
  });

  it('should create an instance', () => {
    expect(dataStore).toBeTruthy();
  });
});
