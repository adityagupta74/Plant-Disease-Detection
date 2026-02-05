"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import {
  Upload,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

import { predict } from "@/services/api";
import { PredictionResult } from "@/types/api";
import { PredictionCard } from "@/components/PredictionCard";

export function HomePage() {
  const { t } = useTranslation();

  const [prediction, setPrediction] =
    useState<PredictionResult | null>(null);

  /* ---------------- REFS ---------------- */
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const leafRefs = useRef<(HTMLImageElement | null)[]>([]);

  /* ---------------- API ---------------- */
  const mutation = useMutation({
    mutationFn: predict,
    onSuccess: (data) => setPrediction(data),
  });

  /* ---------------- DROPZONE ---------------- */
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

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".webp"],
      },
      multiple: false,
      maxSize: 10 * 1024 * 1024,
    });

  /* ---------------- PAGE LOAD ANIMATION ---------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        delay: 0.2,
        duration: 0.8,
      });

      gsap.from(uploadRef.current, {
        opacity: 0,
        scale: 0.95,
        delay: 0.4,
        duration: 0.6,
      });

      gsap.from(featuresRef.current?.children || [], {
        opacity: 0,
        y: 20,
        delay: 0.6,
        duration: 0.6,
        stagger: 0.15,
      });
    });

    return () => ctx.revert();
  }, []);

  /* ---------------- FLOATING LEAVES ---------------- */
  useEffect(() => {
    leafRefs.current.forEach((leaf, index) => {
      if (!leaf) return;

      gsap.to(leaf, {
        y: 20 + index * 6,
        x: 15 + index * 4,
        rotation: index % 2 === 0 ? 10 : -10,
        duration: 4 + index,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
  }, []);

  /* ---------------- RESULT ANIMATION ---------------- */
  useEffect(() => {
    if (!prediction) return;

    gsap.from(resultRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [prediction]);

  return (
    <div
      ref={pageRef}
      className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-hidden"
    >
      {/* 🍃 FLOATING LEAVES */}
      {[
        "top-10 right-6",
        "top-40 left-6",
        "bottom-24 right-20",
        "top-1/2 left-1/4",
        "bottom-10 left-1/2",
      ].map((pos, i) => (
        <img
          key={i}
          ref={(el) => (leafRefs.current[i] = el)}
          src="/leaf.png"
          alt="Floating Leaf"
          className={`pointer-events-none select-none
            absolute ${pos}
            w-14 sm:w-20 opacity-30`}
        />
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* HEADER */}
        <div ref={headerRef} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {t("home.title")}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("home.subtitle")}
          </p>
        </div>

        {/* UPLOAD */}
        <div ref={uploadRef} className="mb-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${isDragActive
                ? "border-primary-500 bg-primary-50"
                : "border-gray-300 hover:border-primary-400 hover:bg-gray-50"
              }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <Upload className="h-12 w-12 text-gray-400" />
              <div>
                <p className="font-medium text-lg">
                  {isDragActive
                    ? t("home.drop")
                    : t("home.upload")}
                </p>
                <p className="text-sm text-gray-500">
                  {t("home.formats")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LOADING */}
        {mutation.isPending && (
          <div className="p-6 rounded-lg border mb-8 text-center">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            <p>{t("home.analyzing")}</p>
          </div>
        )}

        {/* ERROR */}
        {mutation.isError && (
          <div className="p-6 rounded-lg border border-red-300 bg-red-50 mb-8">
            <AlertCircle className="h-6 w-6 text-red-600 mb-2" />
            <p>{t("home.errorDesc")}</p>
          </div>
        )}

        {/* RESULT */}
        {prediction && !mutation.isPending && (
          <div ref={resultRef} className="space-y-6">
            <div className="p-6 rounded-lg bg-primary-50 border">
              <CheckCircle className="h-6 w-6 text-primary-600 mb-2" />
              <h3 className="font-medium">
                {t("home.successTitle")}
              </h3>
              <p className="text-sm text-primary-700">
                {t("home.successDesc")}
              </p>
            </div>

            <PredictionCard prediction={prediction} />
          </div>
        )}

        {/* FEATURES */}
        {!prediction && !mutation.isPending && (
          <div
            ref={featuresRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12"
          >
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
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary-100">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="font-medium mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">
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
