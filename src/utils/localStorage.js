export const loadState = () => {
  try {
    const serializedSate = localStorage.getItem('state');
    if (serializedSate === null) {
      return undefined;
    }
    return JSON.parse(serializedSate);
  } catch (error) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedSate = JSON.stringify(state);
    localStorage.setItem('state', serializedSate);
  } catch (error) {
    //
  }
}