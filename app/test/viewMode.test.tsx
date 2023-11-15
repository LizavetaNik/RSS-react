import viewModeReducer, { setViewModeResults, ViewModeState } from '../features/viewMode';

describe('viewMode reducer', () => {
  const initialState: ViewModeState = {
    result: {
      idDetail: '',
    },
  };

  it('should handle initial state', () => {
    expect(viewModeReducer(undefined, { type: 'unknown' })).toEqual({
      result: {
        idDetail: '',
      },
    });
  });

  it('should handle setViewModeResults', () => {
    const actual = viewModeReducer(initialState, setViewModeResults('test-id'));
    expect(actual.result.idDetail).toEqual('test-id');
  });
});
