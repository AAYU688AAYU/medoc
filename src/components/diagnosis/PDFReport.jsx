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
                    body {
                        font-family: 'Arial', sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                        background: white;
                    }
                    .header {
                        text-align: center;
                        border-bottom: 3px solid #0ea5e9;
                        padding-bottom: 20px;
                        margin-bottom: 30px;
                    }
                    .header h1 {
                        color: #0ea5e9;
                        margin: 0;
                        font-size: 28px;
                    }
                    .header p {
                        color: #666;
                        margin: 5px 0;
                    }
                    .patient-info {
                        background: #f8fafc;
                        padding: 20px;
                        border-radius: 10px;
                        margin-bottom: 25px;
                        border-left: 4px solid #0ea5e9;
                    }
                    .analysis-summary {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;
                        margin-bottom: 25px;
                    }
                    .summary-card {
                        background: #fff;
                        padding: 15px;
                        border-radius: 8px;
                        border: 1px solid #e2e8f0;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .diagnosis-section {
                        margin-bottom: 25px;
                    }
                    .section-title {
                        color: #0ea5e9;
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 15px;
                        border-bottom: 2px solid #e2e8f0;
                        padding-bottom: 5px;
                    }
                    .severity-badge {
                        display: inline-block;
                        padding: 5px 15px;
                        border-radius: 20px;
                        font-weight: bold;
                        text-transform: uppercase;
                        font-size: 12px;
                    }
                    .severity-mild { background: #dcfdf7; color: #059669; }
                    .severity-moderate { background: #dbeafe; color: #2563eb; }
                    .severity-severe { background: #e0e7ff; color: #4f46e5; }
                    .severity-critical { background: #fef2f2; color: #dc2626; }
                    .conditions-list {
                        list-style: none;
                        padding: 0;
                    }
                    .conditions-list li {
                        background: #f1f5f9;
                        margin: 5px 0;
                        padding: 10px;
                        border-radius: 5px;
                        border-left: 3px solid #0ea5e9;
                    }
                    .footer {
                        margin-top: 40px;
                        padding-top: 20px;
                        border-top: 2px solid #e2e8f0;
                        text-align: center;
                        color: #666;
                        font-size: 12px;
                    }
                    .disclaimer {
                        background: #fef3c7;
                        border: 1px solid #f59e0b;
                        border-radius: 8px;
                        padding: 15px;
                        margin: 20px 0;
                    }
                    .confidence-bar {
                        background: #e2e8f0;
                        height: 20px;
                        border-radius: 10px;
                        overflow: hidden;
                        position: relative;
                    }
                    .confidence-fill {
                        background: linear-gradient(90deg, #0ea5e9, #06b6d4);
                        height: 100%;
                        width: ${result.confidence_score || 85}%;
                        border-radius: 10px;
                    }
                    .recommendations {
                        background: #f0f9ff;
                        border: 1px solid #0ea5e9;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🧠 MINDHUE</h1>
                    <p>AI-Powered Medical Analysis Report</p>
                    <p><strong>Report ID:</strong> ${result.report_id || 'N/A'} | <strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
                </div>

                <div class="patient-info">
                    <h3 style="margin-top: 0; color: #0ea5e9;">Patient Information</h3>
                    <p><strong>Name:</strong> ${patientData?.full_name || 'N/A'}</p>
                    <p><strong>Age:</strong> ${patientData?.age || 'N/A'} years</p>
                    <p><strong>Gender:</strong> ${patientData?.gender || 'N/A'}</p>
                    <p><strong>Medical History:</strong> ${patientData?.medical_history || 'No significant history provided'}</p>
                    <p><strong>Current Symptoms:</strong> ${patientData?.symptoms || 'No specific symptoms reported'}</p>
                </div>

                <div class="analysis-summary">
                    <div class="summary-card">
                        <h4 style="margin-top: 0; color: #0ea5e9;">Analysis Summary</h4>
                        <p><strong>Type:</strong> Fundus Image Analysis</p>
                        <p><strong>Severity:</strong> <span class="severity-badge severity-${result.severity || 'mild'}">${(result.severity || 'mild').toUpperCase()}</span></p>
                        <p><strong>Review Required:</strong> ${result.doctor_review_required ? 'Yes' : 'No'}</p>
                    </div>
                    <div class="summary-card">
                        <h4 style="margin-top: 0; color: #0ea5e9;">AI Confidence</h4>
                        <div class="confidence-bar">
                            <div class="confidence-fill"></div>
                        </div>
                        <p style="text-align: center; margin-top: 10px;"><strong>${result.confidence_score || 85}%</strong></p>
                    </div>
                </div>

                <div class="diagnosis-section">
                    <h3 class="section-title">🔍 Primary Diagnosis</h3>
                    <p style="font-size: 16px; line-height: 1.8;">${result.diagnosis || 'No diagnosis available'}</p>
                </div>

                ${result.detected_conditions && result.detected_conditions.length > 0 ? `
                <div class="diagnosis-section">
                    <h3 class="section-title">📋 Detected Conditions</h3>
                    <ul class="conditions-list">
                        ${result.detected_conditions.map(condition => `<li>• ${condition}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                ${result.recommendations ? `
                <div class="recommendations">
                    <h3 class="section-title">💡 Clinical Recommendations</h3>
                    <p style="line-height: 1.8;">${result.recommendations}</p>
                </div>
                ` : ''}

                ${result.detailed_findings ? `
                <div class="diagnosis-section">
                    <h3 class="section-title">🔬 Detailed Findings</h3>
                    <p style="line-height: 1.8;">${result.detailed_findings}</p>
                </div>
                ` : ''}

                <div class="disclaimer">
                    <h4 style="margin-top: 0; color: #b45309;">⚠️ Medical Disclaimer</h4>
                    <p style="margin-bottom: 0;">This AI-generated report is for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment decisions.</p>
                </div>

                <div class="footer">
                    <p><strong>MINDHUE Medical AI Platform</strong></p>
                    <p>Powered by Advanced Medical AI • HIPAA Compliant • Trusted by Healthcare Professionals</p>
                    <p>Generated on ${new Date().toLocaleString()}</p>
                </div>
            </body>
            </html>
        `;

        // Create a new window and write the HTML content
        const printWindow = window.open('', '_blank');
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        // Wait for content to load then print
        printWindow.onload = () => {
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 250);
        };
    };

    return (
        <Button 
            onClick={generatePDF}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-md"
        >
            <Download className="w-4 h-4 mr-2" />
            Download PDF Report
        </Button>
    );
}