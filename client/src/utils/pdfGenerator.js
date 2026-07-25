/**
 * PDF Generator Utility for SolarWise India
 * Generates and opens a formatted printable PDF Solar Feasibility & Subsidy Report
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
        <title>SolarWise_Report_${inputs.city || 'India'}.pdf</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 30px;
            color: #0f172a;
            background: #ffffff;
            font-size: 13px;
            line-height: 1.5;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 3px solid #059669;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          .brand {
            font-size: 24px;
            font-weight: 800;
            color: #064e3b;
          }
          .brand span {
            color: #f59e0b;
          }
          .tagline {
            font-size: 11px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .meta {
            text-align: right;
            font-size: 11px;
            color: #475569;
          }
          .title-box {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
          }
          .title-box h1 {
            margin: 0 0 5px 0;
            font-size: 20px;
            color: #064e3b;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
          }
          .card {
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 15px;
            background: #fafafa;
          }
          .card h3 {
            margin: 0 0 8px 0;
            font-size: 13px;
            text-transform: uppercase;
            color: #0f172a;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 4px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
          }
          th, td {
            padding: 8px 10px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
            font-size: 12px;
          }
          th {
            background: #f1f5f9;
            font-weight: 700;
            color: #334155;
          }
          .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 11px;
            background: #dcfce7;
            color: #15803d;
          }
          .highlight {
            font-size: 18px;
            font-weight: 800;
            color: #059669;
          }
          .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
            font-size: 10px;
            color: #94a3b8;
            text-align: center;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div className="no-print" style="margin-bottom: 15px; text-align: right;">
          <button onclick="window.print()" style="background: #059669; color: white; border: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; cursor: pointer;">
            🖨️ Save as PDF / Print
          </button>
        </div>

        <div className="header">
          <div>
            <div className="brand">SolarWise<span>.in</span></div>
            <div className="tagline">India Solar Intelligence & Subsidy Report</div>
          </div>
          <div className="meta">
            <div><strong>Report Date:</strong> ${new Date().toLocaleDateString('en-IN')}</div>
            <div><strong>Location:</strong> ${inputs.city || 'Mumbai'}, ${inputs.state || 'Maharashtra'}</div>
            <div><strong>MNRE Compliant:</strong> PM Surya Ghar Scheme</div>
          </div>
        </div>

        <div className="title-box">
          <h1>${system.recommendedKw || 4.4} kW Rooftop Solar Feasibility Report</h1>
          <div>Target Equipment: <strong>${system.panelCount || 8} × 550W ${inputs.panelType || 'Monocrystalline'} Modules</strong></div>
        </div>

        <div className="grid">
          <div className="card">
            <h3>1. Rooftop & Location Specs</h3>
            <div><strong>Terrace Dimensions:</strong> ${inputs.terraceLengthFt || 30} ft × ${inputs.terraceWidthFt || 20} ft</div>
            <div><strong>Total Area:</strong> ${roof.totalRoofAreaSqFt || 600} sq.ft (${roof.totalRoofAreaSqM || 55.7} m²)</div>
            <div><strong>Usable Area (80%):</strong> ${roof.usableRoofAreaSqFt || 480} sq.ft</div>
            <div><strong>Roof Type:</strong> ${inputs.roofType || 'RCC Concrete'}</div>
            <div><strong>Shadow Obstruction:</strong> ${inputs.shadowLevel || 'None'}</div>
            <div><strong>Roof Suitability Score:</strong> <span className="badge">${suitability.score || 100} / 100 (${suitability.rating || 'Excellent'})</span></div>
          </div>

          <div className="card">
            <h3>2. Cost & Govt Subsidy Breakdown</h3>
            <div><strong>Gross Installation Cost:</strong> ₹${(financial.grossInstallationCost || 246840).toLocaleString('en-IN')}</div>
            <div><strong>PM Surya Ghar Central Subsidy:</strong> ₹${(financial.centralSubsidy || 78000).toLocaleString('en-IN')}</div>
            <div><strong>Final Out-of-Pocket Net Cost:</strong> <span className="highlight">₹${(financial.finalPayableAmount || 168840).toLocaleString('en-IN')}</span></div>
            <div><strong>Estimated Payback Period:</strong> ${financial.breakEvenYears || 2.8} Years</div>
            <div><strong>25-Year Cumulative ROI:</strong> ${lifetime.roiPercentage || 1479.9}%</div>
          </div>
        </div>

        <h3>3. Energy Generation & Financial Returns</h3>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Estimated Output</th>
              <th>Financial Value (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Daily Power Generation</td>
              <td>${generation.dailyGenerationKwh || 19.4} kWh / Units</td>
              <td>₹${generation.monthlySavingsRs ? Math.round(generation.monthlySavingsRs / 30) : 166} / day</td>
            </tr>
            <tr>
              <td>Monthly Power Generation</td>
              <td>${generation.monthlyGenerationKwh || 589} kWh / Units</td>
              <td>₹${(generation.monthlySavingsRs || 5005).toLocaleString('en-IN')} / month</td>
            </tr>
            <tr>
              <td>Annual Power Generation</td>
              <td>${(generation.annualGenerationKwh || 7066).toLocaleString('en-IN')} kWh / Units</td>
              <td>₹${(generation.annualSavingsRs || 60061).toLocaleString('en-IN')} / year</td>
            </tr>
            <tr>
              <td>25-Year Cumulative Savings</td>
              <td>~${((generation.annualGenerationKwh || 7066) * 25).toLocaleString('en-IN')} kWh Total</td>
              <td><strong>₹${(lifetime.total25YearSavings || 2498686).toLocaleString('en-IN')}</strong></td>
            </tr>
          </tbody>
        </table>

        <h3>4. Environmental Impact & Equivalency Scorecard</h3>
        <table>
          <thead>
            <tr>
              <th>Ecological Parameter</th>
              <th>Offset Equivalent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Annual CO2 Reduced (0.82 kg / kWh)</td>
              <td><strong>${environmental.annualCo2SavedTons || 5.79} Tons / Year</strong> (${environmental.co2SavedUntilBreakEvenTons || 16.2} Tons until break-even)</td>
            </tr>
            <tr>
              <td>Trees Planted Equivalent</td>
              <td><strong>${environmental.treesEquivalent || 290} mature trees / year</strong></td>
            </tr>
            <tr>
              <td>Passenger Cars Off Road</td>
              <td><strong>${environmental.carsRemovedEquivalent || 2.5} passenger cars / year</strong></td>
            </tr>
            <tr>
              <td>Thermal Coal Avoided</td>
              <td><strong>${(environmental.coalAvoidedKg || 2826).toLocaleString('en-IN')} kg coal / year</strong></td>
            </tr>
          </tbody>
        </table>

        <div className="card" style="margin-top: 15px; background: #fffbebfb; border-color: #fcd34d;">
          <h3 style="color: #92400e; border-color: #fde68a;">5. AI Smart Solar Recommendation</h3>
          <p style="margin: 5px 0; color: #78350f;">
            • Your rooftop qualifies for the maximum <strong>₹78,000 Direct Benefit Transfer subsidy</strong> under PM Surya Ghar Muft Bijli Yojana.<br/>
            • Installing <strong>550W Monocrystalline PERC modules</strong> delivers high energy yield even during monsoon months in ${inputs.state || 'Maharashtra'}.<br/>
            • Net-metering approval from local DISCOM takes ~14 business days post installation.
          </p>
        </div>

        <div className="footer">
          Generated automatically by SolarWise India (https://solarwise.in) • Clean Energy & Rooftop Solar Intelligence Platform
        </div>

        <script>
          // Auto trigger print dialog when opened
          window.onload = function() {
            setTimeout(function() { window.print(); }, 500);
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};
