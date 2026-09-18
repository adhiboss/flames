import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout/Layout';
import { Calculator } from './components/Calculator/Calculator';
import { FlamesCards } from './components/FlamesCards/FlamesCards';
import { RememberSection } from './components/RememberSection/RememberSection';
import { WhitespaceDecorations } from './components/WhitespaceDecorations/WhitespaceDecorations';
import { ResultCard } from './components/ResultCard/ResultCard';
import { HistoryView } from './components/HistoryView/HistoryView';
import { StatsView } from './components/StatsView/StatsView';
import { DevTestPanel } from './components/DevTestPanel/DevTestPanel';
import { calculateFlames } from './utils/flamesLogic';
import type { FlamesCalculation, FlamesResultType } from './utils/flamesLogic';
import { logCalculation } from './utils/analytics';
import { useHistory } from './hooks/useHistory';
import type { ViewType } from './components/SidebarLeft/SidebarLeft';
import { Analytics } from '@vercel/analytics/react';
import './index.css';

// Loading text sequence
const LOADING_STEPS = [
  "MATCHING NAMES...",
  "REMOVING COMMON LETTERS...",
  "COUNTING THE REMAINING LETTERS...",
  "LETTING FATE DECIDE..."
];

export const App: React.FC = () => {
  useEffect(() => {
    const playClickSound = () => {
      const audio = new Audio('/mixkit-fast-double-click-on-mouse-275.wav');
      audio.play().catch(() => {});
    };
    document.addEventListener('click', playClickSound);
    return () => document.removeEventListener('click', playClickSound);
  }, []);

  const [currentView, setCurrentView] = useState<ViewType>('home');
  const { addRecord } = useHistory();

  const [calculationState, setCalculationState] = useState<{
    status: 'idle' | 'calculating' | 'animating' | 'done';
    stepIndex: number;
    calculation: FlamesCalculation | null;
    animatingLetter: FlamesResultType | null;
    eliminatedLetters: FlamesResultType[];
    name1: string;
    name2: string;
  }>({
    status: 'idle',
    stepIndex: 0,
    calculation: null,
    animatingLetter: null,
    eliminatedLetters: [],
    name1: '',
    name2: ''
  });

  const handleCalculate = (name1: string, name2: string) => {
    const result = calculateFlames(name1, name2);
    
    setCalculationState({
      status: 'calculating',
      stepIndex: 0,
      calculation: result,
      animatingLetter: null,
      eliminatedLetters: [],
      name1,
      name2
    });

    // Start cinematic sequence
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep < LOADING_STEPS.length) {
        setCalculationState(prev => ({ ...prev, stepIndex: currentStep }));
      } else {
        clearInterval(stepInterval);
        startFlamesAnimation(result, name1, name2);
      }
    }, 800);
  };

  const startFlamesAnimation = (result: FlamesCalculation, n1: string, n2: string) => {
    setCalculationState(prev => ({ ...prev, status: 'animating', eliminatedLetters: [] }));
    
    const sequence = result.eliminationSequence;
    let index = 0;
    
    const animInterval = setInterval(() => {
      if (index < sequence.length) {
        setCalculationState(prev => ({ 
          ...prev, 
          animatingLetter: sequence[index],
          eliminatedLetters: index > 0 ? [...prev.eliminatedLetters, sequence[index - 1]] : []
        }));
        index++;
      } else {
        clearInterval(animInterval);
        setCalculationState(prev => ({ 
          ...prev, 
          status: 'done', 
          animatingLetter: null,
          eliminatedLetters: [...prev.eliminatedLetters, sequence[sequence.length - 1]]
        }));
        
        // Save to history when done
        addRecord({
          name1: n1,
          name2: n2,
          result: result.result,
          fullMeaning: result.fullMeaning
        });
        
        // Log to global anonymous stats async
        logCalculation(result.fullMeaning);
      }
    }, 800); // Slow down for full animation (shake -> particles -> dissolve)
  };

  const handleCloseResult = () => {
    setCalculationState({
      status: 'idle',
      stepIndex: 0,
      calculation: null,
      animatingLetter: null,
      eliminatedLetters: [],
      name1: '',
      name2: ''
    });
  };

  const renderContent = () => {
    if (currentView === 'history') {
      return <HistoryView onPlay={() => setCurrentView('home')} />;
    }
    
    if (currentView === 'stats') {
      return <StatsView />;
    }

    // Default Home View
    return (
      <>
        <WhitespaceDecorations />
        
        <Calculator 
          onCalculate={handleCalculate}
          isCalculating={calculationState.status !== 'idle' && calculationState.status !== 'done'}
        />
        
        {calculationState.status === 'calculating' && (
          <div style={{
            fontFamily: 'var(--font-pixel)',
            color: 'var(--color-secondary)',
            margin: '24px 0',
            animation: 'beat 1s infinite'
          }}>
            {LOADING_STEPS[calculationState.stepIndex]}
          </div>
        )}

        <FlamesCards 
          finalResult={calculationState.status === 'done' ? calculationState.calculation?.result || null : null}
          animatingLetter={calculationState.animatingLetter}
          eliminatedLetters={calculationState.eliminatedLetters}
        />

        <RememberSection />

        {calculationState.status === 'done' && calculationState.calculation && (
          <ResultCard 
            name1={calculationState.name1}
            name2={calculationState.name2}
            calculation={calculationState.calculation}
            onClose={handleCloseResult}
          />
        )}
      </>
    );
  };

  return (
    <Layout 
      currentView={currentView} 
      onViewChange={setCurrentView}
      finalResult={calculationState.status === 'done' ? calculationState.calculation?.result || null : null}
    >
      {renderContent()}
      <DevTestPanel />
      <Analytics />
    </Layout>
  );
};

export default App;
