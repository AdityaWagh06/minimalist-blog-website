
import React, { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';

const InterestingThing = () => {
  const [interestingThing, setInterestingThing] = useState('');
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = loadFromLocalStorage('interestingThing', '');
    setInterestingThing(savedData);
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage('interestingThing', interestingThing);
  }, [interestingThing]);

  return (
    <section className="section-card">
      <h2 className="text-xl font-semibold mb-4">Most Interesting Thing Today</h2>
      
      <div className="relative">
        <input
          type="text"
          value={interestingThing}
          onChange={(e) => setInterestingThing(e.target.value)}
          placeholder="What was the most interesting thing that happened today?"
          className="w-full p-4 rounded-lg border border-border bg-white/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        />
      </div>
    </section>
  );
};

export default InterestingThing;
