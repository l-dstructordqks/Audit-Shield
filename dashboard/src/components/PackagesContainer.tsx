import React, { useMemo, useState } from 'react'
import type { Filters } from '../types/filter';
import { PackagesTable } from './PackagesTable';
import { NavBar } from './NavBar';
import { useLocation } from 'react-router';
import RiskDistributionChart from './RiskDistributionChart';
import { ScoreGauge } from './ScoreGauge';



export const PackagesContainer: React.FC = () => {

  const location = useLocation();
  const { data } = location.state || {};

    const [filters, setFilters] = useState<Filters>({
        colors: [],
        outdated: false,
        action: "",
    });

    const filteredData = useMemo(() => {
        return data.packages.filter((item) => {
          const colorMatch =
            filters.colors.length === 0 ||
            filters.colors.includes(item.risk_level);
        
          const outdatedMatch =
            !filters.outdated || item.is_outdated === true;
            
          const actionMatch =
            filters.action.length === 0 ||
            !filters.action.includes(item.action);
    
          return colorMatch && outdatedMatch && actionMatch;
        });
      }, [filters, data.packages]);

      const [query, setQuery] = useState("");

  return (
    <div className='flex flex-col gap-2'>
        <RiskDistributionChart packages={filteredData}/>
        <NavBar onSearch={setQuery} filters={filters} setFilters={setFilters}/>
        <PackagesTable query={query} packages={filteredData}/>
        <ScoreGauge score={data.audit_score} level={data.audit_level} breakdown={data.breakdown} />
    </div>
  )
}