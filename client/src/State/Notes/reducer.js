export default (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_RESULTS':
      const notesById = {};
      action.payload.results
        .map((caseResult) => caseResult.notes)
        .forEach((notes) => 
          notes.forEach((note) => notesById[note.id] = note)
        );
      return {
        ...state,
        ...notesById
      };
    default:
      return state;
  }
};