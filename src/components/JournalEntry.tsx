
import React, { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';

const JournalEntry = () => {
  const [journalText, setJournalText] = useState('');
  const [dayRating, setDayRating] = useState(5);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = loadFromLocalStorage('journalEntry', { text: '', rating: 5 });
    setJournalText(savedData.text);
    setDayRating(savedData.rating);
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage('journalEntry', { text: journalText, rating: dayRating });
  }, [journalText, dayRating]);

  return (
    <section className="section-card">
      <h2 className="text-xl font-semibold mb-4">Today's Reflection</h2>
      
      <div className="mb-6">
        <label htmlFor="journalEntry" className="subtle-heading">
          How was your day?
        </label>
        <textarea
          id="journalEntry"
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="Write about your day..."
          className="w-full min-h-[150px] p-4 rounded-lg border border-border bg-white/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        />
      </div>
      
      <div>
        <div className="flex justify-between mb-2">
          <span className="subtle-heading">Rate your day</span>
          <span className="text-lg font-medium">{dayRating}/10</span>
        </div>
        
        <input
          type="range"
          min="1"
          max="10"
          value={dayRating}
          onChange={(e) => setDayRating(parseInt(e.target.value))}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Challenging</span>
          <span>Neutral</span>
          <span>Excellent</span>
        </div>
      </div>
    </section>
  );
};

export default JournalEntry;
