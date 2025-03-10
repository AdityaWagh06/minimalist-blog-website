
import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';

const SocialInteractions = () => {
  const [peopleCount, setPeopleCount] = useState(0);
  const [conversationNotes, setConversationNotes] = useState('');
  const [metNewPerson, setMetNewPerson] = useState(false);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = loadFromLocalStorage('socialInteractions', { 
      count: 0, 
      notes: '', 
      newPerson: false 
    });
    
    setPeopleCount(savedData.count);
    setConversationNotes(savedData.notes);
    setMetNewPerson(savedData.newPerson);
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage('socialInteractions', {
      count: peopleCount,
      notes: conversationNotes,
      newPerson: metNewPerson
    });
  }, [peopleCount, conversationNotes, metNewPerson]);

  const incrementCount = () => setPeopleCount(count => count + 1);
  const decrementCount = () => setPeopleCount(count => Math.max(0, count - 1));

  return (
    <section className="section-card">
      <h2 className="text-xl font-semibold mb-4">Social Interactions</h2>
      
      <div className="mb-6">
        <label className="subtle-heading">
          People you talked to today
        </label>
        <div className="flex items-center mt-2">
          <button 
            onClick={decrementCount}
            className="w-10 h-10 flex items-center justify-center rounded-l-lg bg-secondary hover:bg-secondary/80 transition-colors"
            disabled={peopleCount === 0}
          >
            <Minus size={18} className={peopleCount === 0 ? "text-muted-foreground" : "text-foreground"} />
          </button>
          <div className="w-16 h-10 flex items-center justify-center bg-white border-y border-border">
            <span className="text-lg font-medium">{peopleCount}</span>
          </div>
          <button 
            onClick={incrementCount}
            className="w-10 h-10 flex items-center justify-center rounded-r-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="conversationNotes" className="subtle-heading">
          Interesting conversations
        </label>
        <textarea
          id="conversationNotes"
          value={conversationNotes}
          onChange={(e) => setConversationNotes(e.target.value)}
          placeholder="Any memorable conversations today?"
          className="w-full min-h-[100px] p-4 rounded-lg border border-border bg-white/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        />
      </div>
      
      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={metNewPerson}
            onChange={(e) => setMetNewPerson(e.target.checked)}
            className="w-5 h-5 rounded border-border focus:ring-primary"
          />
          <span>I met someone new today</span>
        </label>
      </div>
    </section>
  );
};

export default SocialInteractions;
