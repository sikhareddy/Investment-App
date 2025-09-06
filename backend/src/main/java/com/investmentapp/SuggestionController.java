package com.investmentapp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SuggestionController {

    @PostMapping("/suggest")
    @CrossOrigin
    public Map<String,Object> suggest(@RequestBody Map<String,Object> body){
        double amount = ((Number)body.getOrDefault("amount",0)).doubleValue();
        int durationMonths = ((Number)body.getOrDefault("durationMonths",12)).intValue();
        Map<String,Object> resp = new HashMap<>();
        // naive simple model: annual return 8% for stocks, 5% for bonds, 3% for cash
        double stocks = amount * 0.6;
        double bonds = amount * 0.3;
        double cash = amount * 0.1;
        double years = durationMonths / 12.0;
        double projectedStocks = stocks * Math.pow(1.08, years);
        double projectedBonds = bonds * Math.pow(1.05, years);
        double projectedCash = cash * Math.pow(1.03, years);
        double total = projectedStocks + projectedBonds + projectedCash;
        resp.put("projected", Math.round(total*100.0)/100.0);
        List<Map<String,Object>> alloc = new ArrayList<>();
        alloc.add(Map.of("name","Stocks","value", Math.round(projectedStocks*100.0)/100.0));
        alloc.add(Map.of("name","Bonds","value", Math.round(projectedBonds*100.0)/100.0));
        alloc.add(Map.of("name","Cash","value", Math.round(projectedCash*100.0)/100.0));
        resp.put("allocation", alloc);
        resp.put("total", Math.round(amount*100.0)/100.0);
        return resp;
    }
}
