const XLSX_MIME =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

function parseFilename(cd: string | null | undefined, fallback: string) {
  if (!cd) return fallback;
  const m =
    /filename\*?=(?:UTF-8''|")?([^";]+)"?/i.exec(cd) ||
    /filename="?([^";]+)"?/i.exec(cd);
  return m ? decodeURIComponent(m[1]) : fallback;
}

function* getSkillAssessmentReportSagas(action: any): any {
  try {
    const year = action.year;
    const request = yield new ApiRequest();

    const res = yield call(
      request.call,
      API_GET_SKILL_ASSESSMENT_REPORT(year),
      {
        method: "GET",
        responseType: "arraybuffer",     // 👈 key line (or 'blob')
        headers: { Accept: "*/*" },
      }
    );

    const contentType =
      res.headers?.["content-type"] || XLSX_MIME;
    const filename =
      parseFilename(res.headers?.["content-disposition"], `skill-assessment-${year}.xlsx`);

    const blob =
      res.data instanceof Blob
        ? res.data
        : new Blob([res.data], { type: contentType });

    // sanity check: sizes should match
    console.log("content-length:", res.headers?.["content-length"], "blob.size:", blob.size);

    yield put({
      type: action.type,
      status: statusEnum.SUCCESS,
      payload: { blob, filename },
    });
  } catch (error: any) {
    yield put({ type: action.type, status: statusEnum.ERROR, payload: null, error });
  }
}
