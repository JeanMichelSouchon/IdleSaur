import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ClickableStatTarget } from '../types/ClickableStatTarget';

export type OverlayType =
  | 'inventory'
  | 'buildings'
  | 'shop'
  | 'dino-soul'
  | 'ranking'
  | 'pvp'
  | 'stat-detail'
  | null;

interface OverlayContextProps {
  currentOverlay: OverlayType;
  statDetailTarget: ClickableStatTarget | null;
  openOverlay: (overlay: OverlayType) => void;
  openStatDetail: (target: ClickableStatTarget) => void;
  closeOverlay: () => void;
}

const OverlayContext = createContext<OverlayContextProps | undefined>(undefined);

export const OverlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentOverlay, setCurrentOverlay] = useState<OverlayType>(null);
  const [statDetailTarget, setStatDetailTarget] = useState<ClickableStatTarget | null>(null);

  const openOverlay = (overlay: OverlayType) => {
    setCurrentOverlay(overlay);
    if (overlay !== 'stat-detail') {
      setStatDetailTarget(null);
    }
  };

  const openStatDetail = (target: ClickableStatTarget) => {
    setCurrentOverlay('stat-detail');
    setStatDetailTarget(target);
  };

  const closeOverlay = () => {
    setCurrentOverlay(null);
    setStatDetailTarget(null);
  };

  return (
    <OverlayContext.Provider value={{ currentOverlay, statDetailTarget, openOverlay, openStatDetail, closeOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = (): OverlayContextProps => {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
};