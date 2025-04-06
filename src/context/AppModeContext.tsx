
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppModeContextType {
  isDemoMode: boolean;
  setIsDemoMode: (isDemoMode: boolean) => void;
}

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export const AppModeProvider = ({ children }: { children: ReactNode }) => {
  // Setting isDemoMode to false by default for live mode
  const [isDemoMode, setIsDemoMode] = useState(false);

  return (
    <AppModeContext.Provider value={{ isDemoMode, setIsDemoMode }}>
      {children}
    </AppModeContext.Provider>
  );
};

export const useAppMode = (): AppModeContextType => {
  const context = useContext(AppModeContext);
  if (context === undefined) {
    throw new Error('useAppMode must be used within an AppModeProvider');
  }
  return context;
};
