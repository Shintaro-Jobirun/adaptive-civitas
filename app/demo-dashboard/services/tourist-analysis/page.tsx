// app/dashboard/tourist-analysis/page.tsx
"use client"

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TouristAnalysisDashboard from '@/components/dashboard/TouristAnalysis';

const TouristAnalysisPage = () => {
  const serviceName = '観光客行動分析';
  const serviceCategory = 'revitalization';
  
  return (
    <DashboardLayout 
      serviceName={serviceName} 
      serviceCategory={serviceCategory}
      currentPage="tourist-analysis"
    >
      <TouristAnalysisDashboard />
    </DashboardLayout>
  );
};

export default TouristAnalysisPage;