
// Save data to local storage
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage', error);
    return false;
  }
};

// Load data from local storage
export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage', error);
    return defaultValue;
  }
};

// Clear all journal data from local storage
export const clearJournalData = () => {
  try {
    localStorage.removeItem('journalEntry');
    localStorage.removeItem('interestingThing');
    localStorage.removeItem('socialInteractions');
    localStorage.removeItem('routineTasks');
    return true;
  } catch (error) {
    console.error('Error clearing localStorage', error);
    return false;
  }
};
