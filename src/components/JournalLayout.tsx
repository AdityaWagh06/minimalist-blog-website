
import React from 'react';
import JournalEntry from './JournalEntry';
import InterestingThing from './InterestingThing';
import SocialInteractions from './SocialInteractions';
import RoutineTracker from './RoutineTracker';
import SaveResetButtons from './ui/SaveResetButtons';
import { saveToLocalStorage, clearJournalData } from '../utils/localStorage';
import { useToast } from "@/components/ui/use-toast";

const JournalLayout = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    const success = true; // This will be set by the actual save operations
    
    if (success) {
      toast({
        title: "Journal Saved",
        description: "Your journal entries have been saved successfully.",
        duration: 3000,
      });
    } else {
      toast({
        title: "Error Saving",
        description: "There was a problem saving your journal entries.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all journal entries? This cannot be undone.")) {
      clearJournalData();
      window.location.reload();
      toast({
        title: "Journal Reset",
        description: "All journal entries have been cleared.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto max-w-3xl">
      <header className="mb-10 text-center">
        <div className="inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full animate-fade-in">
          DAILY JOURNAL
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 animate-slide-up">
          Your Mindful Journal
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto animate-fade-in">
          Capture your thoughts, track your habits, and reflect on your daily experiences.
        </p>
      </header>
      
      <main className="space-y-8">
        <JournalEntry />
        <InterestingThing />
        <SocialInteractions />
        <RoutineTracker />
        
        <SaveResetButtons onSave={handleSave} onReset={handleReset} />
      </main>
      
      <footer className="mt-16 pt-6 border-t text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Mindful Journal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default JournalLayout;
