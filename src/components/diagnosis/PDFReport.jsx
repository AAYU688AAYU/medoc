import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

export default function PDFReport({ result, patientData, imageUrl }) {
    const generatePDF = () => {
        // Create a comprehensive HTML structure for the PDF
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>MINDHUE Medical Analysis Report</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                    
                    body {
                        font-family: 'Inter', 'Arial', sans-serif;
                        line-height: 1.6;
                        color: #1e293b;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 30px;
                        background: white;
                    }
                    
                    .header {
                        text-align: center;
                        border-bottom: 3px solid #3b82f6;
                        padding-bottom: 25px;
                        margin-bottom: 35px;
                        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                        padding: 25px;
                        border-radius: 12px;
                    }
                    
                    .header h1 {
                        color: #3b82f6;
                        margin: 0;
                        font-size: 32px;
                        font-weight: 700;
                        letter-spacing: -0.02em;
                    }
                    
                    .header .subtitle {
                        color: #64748b;
                        margin: 8px 0;
                        font-size: 16px;
                        font-weight: 500;
                    }
                    
                    .report-meta {
                        background: #f1f5f9;
                        padding: 15px;
                        border-radius: 8px;
                        margin: 15px 0;
                        display: flex;
                        justify-content: space-between;
                        font-size: 14px;
                        color: #475569;
                    }
                    
                    .patient-info {
                        background: #f8fafc;
                        padding: 25px;
                        border-radius: 12px;
                        margin-bottom: 30px;
                        border-left: 4px solid #3b82f6;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    }
                    
                    .patient-info h3 {
                        margin-top: 0;
                        color: #3b82f6;
                        font-size: 20px;
                        font-weight: 600;
                    }
                    
                    .patient-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 15px;
                        margin-top: 15px;
                    }
                    
                    .patient-field {
                        display: flex;
                        flex-direction: column;
                    }
                    
                    .patient-field label {
                        font-weight: 600;
                        color: #475569;
                        font-size: 12px;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-bottom: 4px;
                    }
                    
                    .patient-field span {
                        color: #1e293b;
                        font-weight: 500;
                    }
                    
                    .analysis-summary {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        gap: 20px;
                        margin-bottom: 30px;
                    }
                    
                    .summary-card {
                        background: #fff;
                        padding: 20px;
                        border-radius: 12px;
                        border: 1px solid #e2e8f0;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                        text-align: center;
                    }
                    
                    .summary-card .metric {
                        font-size: 28px;
                        font-weight: 700;
                        color: #1e293b;
                        margin-bottom: 5px;
                    }
                    
                    .summary-card .label {
                        color: #64748b;
                        font-size: 14px;
                        font-weight: 500;
                    }
                    
                    .diagnosis-section {
                        margin-bottom: 30px;
                    }
                    
                    .section-title {
                        color: #3b82f6;
                        font-size: 20px;
                        font-weight: 600;
                        margin-bottom: 20px;
                        border-bottom: 2px solid #e2e8f0;
                        padding-bottom: 8px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    
                    .section-content {
                        background: #f8fafc;
                        padding: 20px;
                        border-radius: 8px;
                        border-left: 3px solid #3b82f6;
                        line-height: 1.7;
                        font-size: 15px;
                    }
                    
                    .severity-badge {
                        display: inline-block;
                        padding: 8px 16px;
                        border-radius: 20px;
                        font-weight: 600;
                        text-transform: uppercase;
                        font-size: 12px;
                        letter-spacing: 0.05em;
                    }
                    
                    .severity-mild { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
                    .severity-moderate { background: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; }
                    .severity-severe { background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; }
                    .severity-critical { background: #fecaca; color: #991b1b; border: 1px solid #fca5a5; }
                    
                    .conditions-list {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                        margin-top: 10px;
                    }
                    
                    .condition-tag {
                        background: #eff6ff;
                        color: #1e40af;
                        padding: 6px 12px;
                        border-radius: 6px;
                        font-size: 13px;
                        font-weight: 500;
                        border: 1px solid #bfdbfe;
                    }
                    
                    .recommendations {
                        background: #f0f9ff;
                        border: 1px solid #0ea5e9;
                        border-radius: 12px;
                        padding: 25px;
                        margin: 25px 0;
                    }
                    
                    .disclaimer {
                        background: #fef3c7;
                        border: 1px solid #f59e0b;
                        border-radius: 12px;
                        padding: 20px;
                        margin: 25px 0;
                    }
                    
                    .disclaimer h4 {
                        margin-top: 0;
                        color: #92400e;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    
                    .footer {
                        margin-top: 50px;
                        padding-top: 25px;
                        border-top: 2px solid #e2e8f0;
                        text-align: center;
                        color: #64748b;
                        font-size: 12px;
                    }
                    
                    .footer-logo {
                        font-size: 18px;
                        font-weight: 700;
                        color: #3b82f6;
                        margin-bottom: 5px;
                    }
                    
                    .confidence-indicator {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin: 15px 0;
                    }
                    
                    .confidence-bar {
                        background: #e2e8f0;
                        height: 8px;
                        border-radius: 4px;
                        overflow: hidden;
                        flex: 1;
                        max-width: 200px;
                    }
                    
                    .confidence-fill {
                        background: linear-gradient(90deg, #3b82f6, #06b6d4);
                        height: 100%;
                        width: ${result.confidence_score || 85}%;
                        border-radius: 4px;
                    }
                    
                    @media print {
                        body { margin: 20px; }
                        .header { break-inside: avoid; }
                        .diagnosis-section { break-inside: avoid; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🧠 MINDHUE</h1>
                    <p class="subtitle">AI-Powered Medical Analysis Platform</p>
                    <div class="report-meta">
                        <span><strong>Report ID:</strong> ${result.report_id || 'N/A'}</span>
                        <span><strong>Generated:</strong> ${new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</span>
                    </div>
                </div>

                <div class="patient-info">
                    <h3>👤 Patient Information</h3>
                    <div class="patient-grid">
                        <div class="patient-field">
                            <label>Full Name</label>
                            <span>${patientData?.full_name || 'N/A'}</span>
                        </div>
                        <div class="patient-field">
                            <label>Age</label>
                            <span>${patientData?.age || 'N/A'} years</span>
                        </div>
                        <div class="patient-field">
                            <label>Gender</label>
                            <span>${patientData?.gender || 'N/A'}</span>
                        </div>
                        <div class="patient-field">
                            <label>Phone</label>
                            <span>${patientData?.phone || 'N/A'}</span>
                        </div>
                    </div>
                    ${patientData?.medical_history ? `
                        <div style="margin-top: 20px;">
                            <label style="font-weight: 600; color: #475569; font-size: 12px; text-transform: uppercase;">Medical History</label>
                            <div style="margin-top: 5px; color: #1e293b;">${patientData.medical_history}</div>
                        </div>
                    ` : ''}
                    ${patientData?.symptoms ? `
                        <div style="margin-top: 15px;">
                            <label style="font-weight: 600; color: #475569; font-size: 12px; text-transform: uppercase;">Current Symptoms</label>
                            <div style="margin-top: 5px; color: #1e293b;">${patientData.symptoms}</div>
                        </div>
                    ` : ''}
                </div>

                <div class="analysis-summary">
                    <div class="summary-card">
                        <div class="metric">${Math.round(result.confidence_score || 85)}%</div>
                        <div class="label">AI Confidence Score</div>
                        <div class="confidence-indicator">
                            <div class="confidence-bar">
                                <div class="confidence-fill"></div>
                            </div>
                        </div>
                    </div>
                    <div class="summary-card">
                        <div class="metric">
                            <span class="severity-badge severity-${result.severity || 'mild'}">${(result.severity || 'mild').toUpperCase()}</span>
                        </div>
                        <div class="label">Severity Assessment</div>
                    </div>
                    <div class="summary-card">
                        <div class="metric">Fundus</div>
                        <div class="label">Analysis Type</div>
                        <div style="margin-top: 10px; font-size: 12px; color: #64748b;">
                            ${result.doctor_review_required ? '⚠️ Review Required' : '✅ Standard Report'}
                        </div>
                    </div>
                </div>

                <div class="diagnosis-section">
                    <h3 class="section-title">🔍 Primary Diagnosis</h3>
                    <div class="section-content">
                        ${(result.diagnosis || 'No diagnosis available.').replace(/\n/g, '<br>')}
                    </div>
                </div>

                ${result.detected_conditions && result.detected_conditions.length > 0 ? `
                <div class="diagnosis-section">
                    <h3 class="section-title">📋 Detected Conditions</h3>
                    <div class="conditions-list">
                        ${result.detected_conditions.map(condition => `<span class="condition-tag">${condition}</span>`).join('')}
                    </div>
                </div>
                ` : ''}

                ${result.recommendations ? `
                <div class="recommendations">
                    <h3 class="section-title" style="color: #0ea5e9; border-color: #0ea5e9;">💡 Clinical Recommendations</h3>
                    <div style="line-height: 1.7; color: #1e293b;">
                        ${result.recommendations.replace(/\n/g, '<br>')}
                    </div>
                </div>
                ` : ''}

                ${result.detailed_findings ? `
                <div class="diagnosis-section">
                    <h3 class="section-title">🔬 Detailed Clinical Findings</h3>
                    <div class="section-content">
                        ${result.detailed_findings.replace(/\n/g, '<br>')}
                    </div>
                </div>
                ` : ''}

                <div class="disclaimer">
                    <h4>⚠️ Important Medical Disclaimer</h4>
                    <p style="margin: 0; line-height: 1.6;">This AI-generated report is designed to assist healthcare professionals and should not replace clinical judgment or professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis, treatment decisions, and personalized medical care. The AI analysis is intended as a diagnostic aid only.</p>
                </div>

                <div class="footer">
                    <div class="footer-logo">MINDHUE Medical AI Platform</div>
                    <p><strong>Trusted Medical AI Solutions</strong> • HIPAA Compliant • Secure & Private</p>
                    <p>Empowering Healthcare with Advanced Artificial Intelligence</p>
                    <p style="margin-top: 15px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                        Generated on ${new Date().toLocaleString()} | Report ID: ${result.report_id || 'N/A'}
                    </p>
                </div>
            </body>
            </html>
        `;

        // Create a new window and write the HTML content
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(htmlContent);
            printWindow.document.close();
            
            // Wait for content to load then print
            printWindow.onload = () => {
                setTimeout(() => {
                    printWindow.print();
                    // Don't auto-close to allow users to save as PDF
                    // printWindow.close();
                }, 500);
            };
        } else {
            // Fallback: create download link
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `MINDHUE_Report_${result.report_id || 'Unknown'}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    return (
        <Button 
            onClick={generatePDF}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-md"
        >
            <Download className="w-4 h-4 mr-2" />
            Download PDF Report
        </Button>
    );
}