export default (state = {}, action) => {
  const notesById = {};
  switch (action.type) {
    case 'RECEIVE_RESULTS':
      action.payload.results
        .map((caseResult) => caseResult.notes)
        .forEach((notes) => 
          notes.forEach((note) => 
            notesById[note.id] = {
              ...(state[note.id] || {}),
              ...note
            }
          )
        );
      return {
        ...state,
        ...notesById
      };
    case 'RECEIVE_CASE':
      action.payload.notes
        .forEach((note) => 
          notesById[note.id] = {
            ...(state[note.id] || {}),
            ...note
          }
        );
      return {
        ...state,
        ...notesById
      };
    default:
      return state;
  }
};