// app/dashboard/visitor-analysis/page.tsx
"use client"

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import VisitorAnalysisDashboard from '@/components/dashboard/VisitorAnalysis';

const VisitorAnalysisPage = () => {
  const serviceName = '来街者分析・商圏分析';
  const serviceCategory = 'revitalization';
  
  return (
    <DashboardLayout 
      serviceName={serviceName} 
      serviceCategory={serviceCategory}
      currentPage="visitor-analysis"
    >
      <VisitorAnalysisDashboard />
    </DashboardLayout>
  );
};

export default VisitorAnalysisPage;