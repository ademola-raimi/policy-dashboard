import { useContext } from "react";
import RecommendationsContext from "../context/RecommendationsContext";

export function useRecommendationsContext() {
  const context = useContext(RecommendationsContext);
  if (!context) {
    throw new Error('useRecommendationsContext must be used within RecommendationsProvider');
  }
  return context;
}