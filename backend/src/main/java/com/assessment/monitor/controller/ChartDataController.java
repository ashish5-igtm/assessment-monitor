package com.assessment.monitor.controller;

import com.assessment.monitor.model.ChartData;
import com.assessment.monitor.repository.ChartDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/charts")
public class ChartDataController {

    @Autowired
    private ChartDataRepository chartDataRepository;

    @GetMapping("/bar-data")
    public ResponseEntity<List<ChartData>> getBarChartData() {
        List<ChartData> data = chartDataRepository.findAll();
        // If empty, let's inject some mock data on the fly for demonstration
        if (data.isEmpty()) {
            chartDataRepository.save(new ChartData("Port 80", 120.0));
            chartDataRepository.save(new ChartData("Port 443", 450.0));
            chartDataRepository.save(new ChartData("Port 8080", 300.0));
            chartDataRepository.save(new ChartData("Port 3306", 80.0));
            data = chartDataRepository.findAll();
        }
        return ResponseEntity.ok(data);
    }

    @PostMapping("/bar-data")
    public ResponseEntity<ChartData> addBarChartData(@RequestBody ChartData chartData) {
        ChartData savedData = chartDataRepository.save(chartData);
        return ResponseEntity.ok(savedData);
    }
}
