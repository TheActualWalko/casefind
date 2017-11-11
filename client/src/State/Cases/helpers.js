export const mapCaseResult = (result) => ({
  ...result,
  notes: result.notes.map(({id}) => id)
});