// SkillAssessmentReport.tsx (excerpt)
import React from "react";
import { useSelector } from "react-redux";

export default function DownloadButton() {
  const { data, status } = useSelector((s: any) => s.skillAssessmentReport);

  const handleDownload = () => {
    const blob: Blob = data?.blob;
    const filename: string = data?.filename || "skill-assessment.xlsx";
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button disabled={status !== "SUCCESS" || !data?.blob} onClick={handleDownload}>
      Download Excel
    </button>
  );
}
