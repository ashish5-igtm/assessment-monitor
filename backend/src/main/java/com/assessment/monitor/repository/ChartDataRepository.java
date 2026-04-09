package com.assessment.monitor.repository;

import com.assessment.monitor.model.ChartData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChartDataRepository extends JpaRepository<ChartData, Long> {
}
