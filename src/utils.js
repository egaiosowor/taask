export const getProjects = () => {
    try {
      const serializedState = localStorage.getItem("projects");
      if (serializedState === null) {
        return []; // Return an empty projects array if nothing is in localStorage
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error("Could not load state", err);
      return []; // Return an empty projects array in case of an error
    }
  };


  export const updateProjects = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("projects", serializedState);
    } catch (err) {
      console.error("Could not save state", err);
    }
  };