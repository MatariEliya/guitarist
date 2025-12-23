import React from 'react';
import { useContext } from "react";
import { GlobalContext } from "../../globalsIndex";

const About = () => {
    const { isAdmin, setIsAdmin } = useContext(GlobalContext);

  return (
    <div>
      <button onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin ? "Admin Mode" : "User Mode"}
      </button>
      <h1>About Page</h1>
      <p>ברוך הבא לעמוד אודות!</p>
    </div>
  );
};

export default About;
