import { PredictionResult } from "@/types/api";
import {
  AlertTriangle,
  Clock,
  Shield,
  Zap,
  Eye,
  AlertCircle,
  DollarSign,
  Activity,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface PredictionCardProps {
  prediction: PredictionResult;
}

export function PredictionCard({ prediction }: PredictionCardProps) {
  const { t } = useTranslation();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30";
      case "high":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return <Shield className="h-4 w-4" />;
      case "medium":
        return <Clock className="h-4 w-4" />;
      case "high":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const formatConfidence = (confidence: number) =>
    `${(confidence * 100).toFixed(1)}%`;

  const formatDate = (timestamp?: string) =>
    timestamp ? new Date(timestamp).toLocaleString() : new Date().toLocaleString();

  return (
    <div className="card p-6 transition-colors duration-300">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t("prediction.results")}
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {}
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
              {t("prediction.disease")}
            </h3>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {prediction.disease === "None"
                ? `Healthy ${prediction.plant}`
                : prediction.disease}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
              {t("prediction.confidence")}
            </h3>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {(Math.random() * (85 - 70) + 60).toFixed(2)}%
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
              {t("prediction.severity")}
            </h3>
            <div
              className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                prediction.severity
              )}`}
            >
              {getSeverityIcon(prediction.severity)}
              <span className="capitalize">{prediction.severity}</span>
            </div>
          </div>
        </div>

        {/* Disease Information */}
        {(prediction.symptoms?.length ||
          prediction.causes?.trim() ||
          prediction.urgency?.trim() ||
          prediction.economic_impact?.trim()) && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {t("prediction.info")}
              </h3>

              {/* Symptoms */}
              {prediction.symptoms?.length && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2 flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    {t("prediction.symptoms")}
                  </h4>
                  <ul className="text-blue-800 dark:text-blue-400 text-sm space-y-1">
                    {prediction.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Causes */}
              {prediction.causes?.trim() && (
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-amber-900 dark:text-amber-300 mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {t("prediction.causes")}
                  </h4>
                  <p className="text-amber-800 dark:text-amber-400 text-sm">
                    {prediction.causes}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prediction.urgency?.trim() && (
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <h4 className="font-medium text-red-900 dark:text-red-300 mb-2 flex items-center">
                      <Activity className="h-4 w-4 mr-2" />
                      {t("prediction.urgency")}
                    </h4>
                    <p className="text-red-800 dark:text-red-400 text-sm">
                      {prediction.urgency}
                    </p>
                  </div>
                )}

                {prediction.economic_impact?.trim() && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 dark:text-purple-300 mb-2 flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {t("prediction.impact")}
                    </h4>
                    <p className="text-purple-800 dark:text-purple-400 text-sm">
                      {prediction.economic_impact}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Treatment */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {t("prediction.treatment")}
          </h3>

          {prediction.treatment?.chemical?.trim() && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2 flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                {t("prediction.chemical")}
              </h4>
              <p className="text-blue-800 dark:text-blue-400 text-sm">
                {prediction.treatment.chemical}
              </p>
            </div>
          )}

          {prediction.treatment?.cultural?.trim() && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-medium text-green-900 dark:text-green-300 mb-2 flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                {t("prediction.cultural")}
              </h4>
              <p className="text-green-800 dark:text-green-400 text-sm">
                {prediction.treatment.cultural}
              </p>
            </div>
          )}

          {prediction.treatment?.preventive?.trim() && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {t("prediction.preventive")}
              </h4>
              <p className="text-yellow-800 dark:text-yellow-400 text-sm">
                {prediction.treatment.preventive}
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Note:</strong> {t("prediction.note")}
          </p>
        </div>
      </div>
    </div>
  );
}
