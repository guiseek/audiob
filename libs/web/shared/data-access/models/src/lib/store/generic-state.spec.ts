import { GenericState, GenericStoreStatus } from './generic-state';

class TestStateStore implements GenericState<string> {
  status: GenericStoreStatus = 'loaded';
  error: string | null = null;
  data = 'test'
}

describe('GenericState', () => {
  it('should create an instance', () => {
    expect(new TestStateStore()).toBeTruthy();
  });
});
