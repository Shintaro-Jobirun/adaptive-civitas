// app/dashboard/microgrid/page.tsx
"use client"

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MicrogridManagementDashboard from '@/components/dashboard/MicrogridManagement';

const MicrogridPage = () => {
  const serviceName = '地域マイクログリッド管理';
  const serviceCategory = 'resource-management';
  
  return (
    <DashboardLayout 
      serviceName={serviceName} 
      serviceCategory={serviceCategory}
      currentPage="microgrid"
    >
      <MicrogridManagementDashboard />
    </DashboardLayout>
  );
};

export default MicrogridPage;