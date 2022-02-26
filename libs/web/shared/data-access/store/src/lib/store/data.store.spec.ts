import { DataStore } from './data.store';

interface UserState {
  name: string;
  age: number;
}

class UserDataStore extends DataStore<UserState> {}

describe('DataStore', () => {
  let dataStore: UserDataStore;

  beforeEach(() => {
    dataStore = new UserDataStore({
      name: '',
      age: 0,
    });
  });

  it('should create an instance', () => {
    expect(dataStore).toBeTruthy();
  });
});
