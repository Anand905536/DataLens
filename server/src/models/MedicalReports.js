import mongoose from 'mongoose'

const medicalReportSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        reportType: {
            type: String,
            required: true,
            trim: true,
        },
        reportDate: {
            type: Date,
            required: true,
        },
        fileName: {
            type: String,
            required: true
        },
        filePath: {
            type: String,
            required: true
        },
        extractedText: {
            type: String,
            default: ""
        },
        extractedData: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    }, {
    timestamps: true,
}
)

const MedicalReports = mongoose.model(
    "MedicalReport",
    medicalReportSchema
)

export default MedicalReports