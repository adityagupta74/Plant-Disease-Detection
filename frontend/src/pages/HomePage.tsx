import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { Upload, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { predict } from "@/services/api";
import { PredictionResult } from "@/types/api";
import { PredictionCard } from "@/components/PredictionCard";

export function HomePage() {
  const { t } = useTranslation();

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const mutation = useMutation({
    mutationFn: predict,
    onSuccess: (data) => {
      setPrediction(data);
    },
    onError: (error) => {
      console.error("Prediction error:", error);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setPrediction(null);
        mutation.mutate(file);
      }
    },
    [mutation]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
            {t("home.title")}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("home.subtitle")}
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-6 sm:mb-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-colors cursor-pointer ${isDragActive
              ? "border-primary-500 bg-primary-50 dark:bg-gray-800"
              : "border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">
                  {isDragActive
                    ? t("home.drop")
                    : t("home.upload")}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t("home.formats")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {mutation.isPending && (
          <div className="p-4 sm:p-6 mb-6 sm:mb-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin text-primary-600" />
              <span className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">
                {t("home.analyzing")}
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {mutation.isError && (
          <div className="p-4 sm:p-6 mb-6 sm:mb-8 rounded-lg border border-danger-200 dark:border-danger-700 bg-danger-50 dark:bg-danger-900/20 transition-colors">
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-danger-600 dark:text-danger-400 mt-1" />
              <div>
                <h3 className="text-base sm:text-lg font-medium text-danger-900 dark:text-danger-300">
                  {t("home.errorTitle")}
                </h3>
                <p className="text-sm sm:text-base text-danger-700 dark:text-danger-400 mt-1">
                  {(mutation.error as any)?.message ||
                    t("home.errorDesc")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success State */}
        {prediction && !mutation.isPending && (
          <div className="space-y-4 sm:space-y-6">
            <div className="p-4 sm:p-6 rounded-lg border border-primary-200 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/20 transition-colors">
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 dark:text-primary-400 mt-1" />
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-primary-900 dark:text-primary-300">
                    {t("home.successTitle")}
                  </h3>
                  <p className="text-sm sm:text-base text-primary-700 dark:text-primary-400 mt-1">
                    {t("home.successDesc")}
                  </p>
                </div>
              </div>
            </div>

            <PredictionCard prediction={prediction} />
          </div>
        )}

        {/* Features */}
        {!prediction && !mutation.isPending && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 sm:mt-12">
            {[
              {
                icon: Upload,
                title: t("home.features.upload"),
                desc: t("home.features.uploadDesc"),
              },
              {
                icon: AlertCircle,
                title: t("home.features.ai"),
                desc: t("home.features.aiDesc"),
              },
              {
                icon: CheckCircle,
                title: t("home.features.treatment"),
                desc: t("home.features.treatmentDesc"),
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center px-2">
                  <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center transition-colors">
                    <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
