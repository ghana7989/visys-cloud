// employeeContents-sagas.ts
import { AnyAction } from "redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_SKILL_ASSESSMENT_REPORT } from "../actions/employeeContents-action-constants";
import { statusEnum } from "../statusEnum";
import ApiRequest from "../api/ApiRequest"; // your helper

const XLSX_MIME =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

function parseFilename(cd: string | null | undefined, fallback: string) {
  if (!cd) return fallback;
  // handles: attachment; filename=Compass_data.xlsx
  //          attachment; filename="Compass data.xlsx"
  //          attachment; filename*=UTF-8''Compass_data.xlsx
  const m =
    /filename\*?=(?:UTF-8''|")?([^";]+)"?/i.exec(cd) ||
    /filename="?([^";]+)"?/i.exec(cd);
  return m ? decodeURIComponent(m[1]) : fallback;
}

function normalizeBlob(res: any, fallbackName: string) {
  // axios -> { data, headers }, fetch -> Response
  if (res?.blob && typeof res.blob === "function") {
    // it's a fetch Response
    return res.blob().then((b: Blob) => ({
      blob: b,
      filename: parseFilename(res.headers.get("content-disposition"), fallbackName),
    }));
  }

  if (res?.data instanceof Blob) {
    return {
      blob: res.data as Blob,
      filename: parseFilename(res.headers?.["content-disposition"], fallbackName),
    };
  }

  // arraybuffer case
  if (res?.data instanceof ArrayBuffer) {
    const blob = new Blob([new Uint8Array(res.data)], { type: XLSX_MIME });
    return {
      blob,
      filename: parseFilename(res.headers?.["content-disposition"], fallbackName),
    };
  }

  // raw Blob
  if (res instanceof Blob) {
    return { blob: res as Blob, filename: fallbackName };
  }

  // raw ArrayBuffer
  if (res instanceof ArrayBuffer) {
    return {
      blob: new Blob([new Uint8Array(res)], { type: XLSX_MIME }),
      filename: fallbackName,
    };
  }

  // last resort: binary string (PK...); avoid if possible
  if (typeof res?.data === "string") {
    const s: string = res.data;
    const bytes = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i) & 0xff;
    return {
      blob: new Blob([bytes], { type: XLSX_MIME }),
      filename: fallbackName,
    };
  }

  return { blob: new Blob([], { type: XLSX_MIME }), filename: fallbackName };
}

// --- Worker ---
export function* getSkillAssessmentReportSagas(action: AnyAction): any {
  try {
    const year = action.year; // you already pass this in your action creator
    const request = yield new ApiRequest();

    // If ApiRequest is axios-based, pass responseType + Accept:
    const res = yield call(
      request.call,
      // your existing URL builder already accepts year:
      // e.g., API_GET_SKILL_ASSESSMENT_REPORT(year)
      // If you call with a plain string URL, keep it the same.
      // @ts-ignore
      API_GET_SKILL_ASSESSMENT_REPORT(year),
      {
        method: "GET",
        responseType: "blob", // or "arraybuffer"
        headers: { Accept: "*/*" }, // matches Swagger
      }
    );

    const fallback = `skill-assessment-${year}.xlsx`;
    const { blob, filename } = yield call(normalizeBlob, res, fallback);

    yield put({
      type: action.type,
      status: statusEnum.SUCCESS,
      payload: { blob, filename },
    });
  } catch (error: any) {
    yield put({
      type: action.type,
      status: statusEnum.ERROR,
      payload: null,
      error: error?.message ?? error,
    });
  }
}

// --- Watcher ---
export function* watchGetSkillAssessmentReport() {
  yield takeLatest(GET_SKILL_ASSESSMENT_REPORT, getSkillAssessmentReportSagas);
}
