/**
 * PDF Generator Utility for SolarWise India
 * Formats a concise, executive 2-Page Solar Feasibility & Subsidy Report for printing or PDF save.
 */
export const downloadPdfReport = (reportData) => {
  if (!reportData) return;

  const report = reportData.results || reportData;
  const inputs = reportData.inputs || report.inputs || {};
  const roof = report.roof || {};
  const system = report.system || {};
  const financial = report.financial || {};
  const generation = report.generation || {};
  const environmental = report.environmental || {};
  const suitability = report.suitability || {};
  const lifetime = report.lifetime || {};

  const printWindow = window.open('', '_blank');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>SolarWise_Feasibility_Report_${inputs.city || 'India'}.pdf</title>
        <style>
          * {
            box-sizing: border-box;
          }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            color: #0f172a;
            background: #ffffff;
            font-size: 11px;
            line-height: 1.4;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2.5px solid #059669;
            padding-bottom: 10px;
            margin-bottom: 12px;
          }
          .brand {
            font-size: 22px;
            font-weight: 900;
            color: #064e3b;
            letter-spacing: -0.5px;
          }
          .brand span {
            color: #f59e0b;
          }
          .tagline {
            font-size: 10px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 700;
          }
          .meta {
            text-align: right;
            font-size: 10px;
            color: #475569;
          }
          .exec-summary {
            background: #f0fdf4;
            border: 1.5px solid #86efac;
            padding: 12px 16px;
            border-radius: 10px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .exec-summary h1 {
            margin: 0 0 3px 0;
            font-size: 18px;
            color: #064e3b;
            font-weight: 900;
          }
          .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 12px;
          }
          .card {
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            padding: 10px 12px;
            background: #f8fafc;
          }
          .card h3 {
            margin: 0 0 6px 0;
            font-size: 11px;
            text-transform: uppercase;
            color: #064e3b;
            border-bottom: 1.5px solid #cbd5e1;
            padding-bottom: 3px;
            font-weight: 800;
            letter-spacing: 0.5px;
          }
          .row {
            display: flex;
            justify-content: space-between;
            padding: 3px 0;
            border-bottom: 1px dashed #e2e8f0;
          }
          .row:last-child {
            border-bottom: none;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12px;
          }
          th, td {
            padding: 6px 8px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
            font-size: 10.5px;
          }
          th {
            background: #f1f5f9;
            font-weight: 800;
            color: #1e293b;
            text-transform: uppercase;
            font-size: 9.5px;
          }
          .badge-green {
            background: #dcfce7;
            color: #15803d;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 800;
          }
          .highlight-green {
            color: #059669;
            font-weight: 900;
            font-size: 14px;
          }
          .page-break {
            page-break-after: always;
            break-after: page;
          }
          .footer-note {
            padding-top: 8px;
            border-top: 1px solid #cbd5e1;
            font-size: 9px;
            color: #64748b;
            text-align: justify;
            margin-top: 10px;
          }
          @media print {
            @page {
              size: A4 portrait;
              margin: 10mm 12mm;
            }
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <!-- Print Trigger Bar -->
        <div class="no-print" style="margin-bottom: 12px; text-align: right;">
          <button onclick="window.print()" style="background: #059669; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 12px;">
            🖨️ Save as 2-Page PDF
          </button>
        </div>

        <!-- PAGE 1 OF 2 -->
        <div className="header">
          <div>
            <div className="brand">SolarWise<span>.in</span></div>
            <div className="tagline">India Solar Feasibility & PM Surya Ghar Report</div>
          </div>
          <div className="meta">
            <div><strong>Report Date:</strong> ${new Date().toLocaleDateString('en-IN')}</div>
            <div><strong>Location:</strong> ${inputs.city || 'Kolkata'}, ${inputs.state || 'West Bengal'}</div>
            <div><strong>Page:</strong> 1 of 2</div>
          </div>
        </div>

        <!-- Executive Summary Banner -->
        <div className="exec-summary">
          <div>
            <h1>${system.recommendedKw || 4.4} kW Rooftop Solar Plant</h1>
            <div style="font-size: 11px; color: #334155;">Recommended Configuration: <strong>${system.panelCount || 8} × 550W ${inputs.panelType || 'Monocrystalline PERC'} Panels</strong></div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 10px; color: #64748b; font-weight: bold;">ROOF SUITABILITY</div>
            <span className="badge-green">${suitability.score || 100} / 100 (${suitability.rating || 'Excellent'})</span>
          </div>
        </div>

        <!-- Section 1 & 2 Cards -->
        <div className="grid-2">
          <div className="card">
            <h3>1. Rooftop & Solar Potential</h3>
            <div className="row"><span>Terrace Size:</span><strong>${inputs.terraceLengthFt || 30} ft × ${inputs.terraceWidthFt || 20} ft (${roof.totalRoofAreaSqFt || 600} sq.ft)</strong></div>
            <div className="row"><span>Usable Area (80% Rule):</span><strong>${roof.usableRoofAreaSqFt || 480} sq.ft (${roof.usableRoofAreaSqM || 44.6} m²)</strong></div>
            <div className="row"><span>Roof Construction:</span><strong>${inputs.roofType || 'RCC Concrete'}</strong></div>
            <div className="row"><span>Shadow Obstruction:</span><strong>${inputs.shadowLevel || 'None'}</strong></div>
            <div className="row"><span>Solar Irradiance:</span><strong>5.5 Peak Sun Hrs / Day</strong></div>
          </div>

          <div className="card">
            <h3>2. Equipment & Technology Specs</h3>
            <div className="row"><span>Module Technology:</span><strong>${inputs.panelType || 'Monocrystalline PERC'}</strong></div>
            <div className="row"><span>Single Panel Wattage:</span><strong>550 Watts High-Efficiency</strong></div>
            <div className="row"><span>Total Modules Required:</span><strong>${system.panelCount || 8} Modules</strong></div>
            <div className="row"><span>Inverter Type:</span><strong>Grid-Tied String Inverter (MPPT)</strong></div>
            <div className="row"><span>Performance Warranty:</span><strong>25 Years (83.6% Retention)</strong></div>
          </div>
        </div>

        <!-- Section 3: Financials & PM Surya Ghar Subsidy -->
        <div className="card" style="margin-bottom: 12px;">
          <h3>3. Turnkey Cost & PM Surya Ghar Subsidy Breakdown</h3>
          <div className="grid-2" style="gap: 10px; margin-bottom: 0;">
            <div>
              <div className="row"><span>Turnkey Gross Cost (₹55k/kW):</span><strong>₹${(financial.grossInstallationCost || 246840).toLocaleString('en-IN')}</strong></div>
              <div className="row"><span>PM Surya Ghar Subsidy (DBT):</span><strong style="color: #059669;">- ₹${(financial.centralSubsidy || 78000).toLocaleString('en-IN')}</strong></div>
              <div className="row"><span>Net Out-of-Pocket Cost:</span><span className="highlight-green">₹${(financial.finalPayableAmount || 168840).toLocaleString('en-IN')}</span></div>
            </div>
            <div>
              <div className="row"><span>Estimated Payback Period:</span><strong>${financial.breakEvenYears || 2.8} Years</strong></div>
              <div className="row"><span>25-Year Cumulative ROI:</span><strong>${lifetime.roiPercentage || 1479.9}%</strong></div>
              <div className="row"><span>DISCOM Tariff Benchmark:</span><strong>₹${inputs.electricityRate || 8}/unit (+5% annual hike)</strong></div>
            </div>
          </div>
        </div>

        <!-- Section 4: Daily / Monthly Yield Table -->
        <h3 style="font-size: 11px; color: #064e3b; margin: 0 0 4px 0; text-transform: uppercase;">4. Estimated Power Generation & Yield</h3>
        <table>
          <thead>
            <tr>
              <th>Time Horizon</th>
              <th>Energy Output (kWh / Units)</th>
              <th>Estimated Electricity Savings (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Daily Output</td>
              <td>${generation.dailyGenerationKwh || 19.4} kWh / day</td>
              <td>₹${generation.monthlySavingsRs ? Math.round(generation.monthlySavingsRs / 30) : 166} / day</td>
            </tr>
            <tr>
              <td>Monthly Output</td>
              <td>${generation.monthlyGenerationKwh || 589} kWh / month</td>
              <td>₹${(generation.monthlySavingsRs || 5005).toLocaleString('en-IN')} / month</td>
            </tr>
            <tr>
              <td>Annual Output (Year 1)</td>
              <td>${(generation.annualGenerationKwh || 7066).toLocaleString('en-IN')} kWh / year</td>
              <td>₹${(generation.annualSavingsRs || 60061).toLocaleString('en-IN')} / year</td>
            </tr>
          </tbody>
        </table>

        <div style="text-align: center; font-size: 9px; color: #94a3b8; margin-top: 8px;">
          Page 1 of 2 • SolarWise.in Rooftop Solar Intelligence
        </div>

        <!-- FORCE PAGE BREAK FOR EXACT 2-PAGE FORMAT -->
        <div className="page-break"></div>

        <!-- PAGE 2 OF 2 -->
        <div className="header">
          <div>
            <div className="brand">SolarWise<span>.in</span></div>
            <div className="tagline">Financial Return & Ecological Impact Matrix</div>
          </div>
          <div className="meta">
            <div><strong>Location:</strong> ${inputs.city || 'Kolkata'}, ${inputs.state || 'West Bengal'}</div>
            <div><strong>Page:</strong> 2 of 2</div>
          </div>
        </div>

        <!-- Section 5: 25-Year Savings Projection Table -->
        <h3 style="font-size: 11px; color: #064e3b; margin: 0 0 4px 0; text-transform: uppercase;">5. 25-Year Cumulative Financial Projections</h3>
        <table>
          <thead>
            <tr>
              <th>Milestone Year</th>
              <th>Est. DISCOM Tariff (₹/kWh)</th>
              <th>Annual Savings (₹)</th>
              <th>Cumulative Net Savings (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Year 1 (Commissioning)</td>
              <td>₹${Number(inputs.electricityRate || 8).toFixed(2)}</td>
              <td>₹${(generation.annualSavingsRs || 60061).toLocaleString('en-IN')}</td>
              <td>- ₹${(financial.finalPayableAmount || 168840).toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td>Year 3 (Break-Even Milestone)</td>
              <td>₹${(Number(inputs.electricityRate || 8) * 1.10).toFixed(2)}</td>
              <td>₹${Math.round((generation.annualSavingsRs || 60061) * 1.10).toLocaleString('en-IN')}</td>
              <td><span className="badge-green">Break-Even Reached (₹0 Net Cost)</span></td>
            </tr>
            <tr>
              <td>Year 5</td>
              <td>₹${(Number(inputs.electricityRate || 8) * 1.21).toFixed(2)}</td>
              <td>₹${Math.round((generation.annualSavingsRs || 60061) * 1.21).toLocaleString('en-IN')}</td>
              <td>₹${Math.round((generation.annualSavingsRs || 60061) * 3).toLocaleString('en-IN')} Profit</td>
            </tr>
            <tr>
              <td>Year 10</td>
              <td>₹${(Number(inputs.electricityRate || 8) * 1.55).toFixed(2)}</td>
              <td>₹${Math.round((generation.annualSavingsRs || 60061) * 1.55).toLocaleString('en-IN')}</td>
              <td>₹${Math.round((generation.annualSavingsRs || 60061) * 8).toLocaleString('en-IN')} Profit</td>
            </tr>
            <tr>
              <td>Year 25 (End of Warranty)</td>
              <td>₹${(Number(inputs.electricityRate || 8) * 3.22).toFixed(2)}</td>
              <td>₹${Math.round((generation.annualSavingsRs || 60061) * 3.22).toLocaleString('en-IN')}</td>
              <td><strong>₹${(lifetime.total25YearSavings || 2498686).toLocaleString('en-IN')} Total Net Profit</strong></td>
            </tr>
          </tbody>
        </table>

        <!-- Section 6: Environmental Impact Scorecard -->
        <h3 style="font-size: 11px; color: #064e3b; margin: 0 0 4px 0; text-transform: uppercase;">6. Ecological & Environmental Scorecard</h3>
        <table>
          <thead>
            <tr>
              <th>Ecological Metric</th>
              <th>Annual Reduction</th>
              <th>25-Year Lifetime Offset</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CO2 Emissions Avoided</td>
              <td><strong>${environmental.annualCo2SavedTons || 5.79} Tons CO2 / yr</strong></td>
              <td><strong>~${Math.round((environmental.annualCo2SavedTons || 5.79) * 25)} Tons CO2 Lifetime</strong></td>
            </tr>
            <tr>
              <td>Thermal Coal Burn Avoided</td>
              <td><strong>${(environmental.coalAvoidedKg || 2826).toLocaleString('en-IN')} kg Coal / yr</strong></td>
              <td><strong>~${Math.round(((environmental.coalAvoidedKg || 2826) * 25) / 1000)} Metric Tons Coal</strong></td>
            </tr>
            <tr>
              <td>Trees Planted Equivalent</td>
              <td><strong>${environmental.treesEquivalent || 290} Mature Trees / yr</strong></td>
              <td><strong>~${(environmental.treesEquivalent || 290) * 25} Tree-Years</strong></td>
            </tr>
            <tr>
              <td>Passenger Vehicles Off Road</td>
              <td><strong>${environmental.carsRemovedEquivalent || 2.5} Vehicles / yr</strong></td>
              <td>Equivalent to removing ${environmental.carsRemovedEquivalent || 2.5} petrol cars for 25 yrs</td>
            </tr>
          </tbody>
        </table>

        <!-- Section 7: AI Recommendations & DISCOM Checklist -->
        <div className="card" style="background: #fffbeb; border-color: #fcd34d;">
          <h3 style="color: #92400e; border-color: #fde68a;">7. AI Smart Recommendations & Installation Next Steps</h3>
          <ul style="margin: 4px 0; padding-left: 18px; color: #78350f; font-size: 10px; line-height: 1.5;">
            <li><strong>PM Surya Ghar Subsidy:</strong> File application on the National Portal for rooftop solar to claim your <strong>₹${(financial.centralSubsidy || 78000).toLocaleString('en-IN')} central subsidy</strong> via direct bank transfer.</li>
            <li><strong>DISCOM Net-Metering:</strong> Submit bi-directional net-metering application to local DISCOM in ${inputs.city || 'Kolkata'} prior to commissioning.</li>
            <li><strong>Vendor Selection:</strong> Work exclusively with DISCOM-empanelled solar EPC contractors offering 5-year comprehensive maintenance (AMC) and 25-year panel performance warranties.</li>
          </ul>
        </div>

        <div className="footer-note">
          <strong>Disclaimer:</strong> This 2-page solar feasibility report is generated by SolarWise India (https://solarwise.in) using solar irradiance data, DISCOM tariff rates, and PM Surya Ghar Muft Bijli Yojana guidelines. Actual solar yield may vary based on micro-climatic shading and seasonal weather variations.
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};
