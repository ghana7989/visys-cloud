
describe('getSkillAssessmentReportSagas', () => {
  const actionType = 'GET_SKILL_ASSESSMENT_REPORT' as const;

  it("should call API, wrap arraybuffer into Blob, parse filename from 'content-disposition', and dispatch SUCCESS", () => {
    const action: any = { type: actionType, year: 2024 };

    // generator
    const gen = getSkillAssessmentReportSagas(action);

    // 1) should yield a call to the API endpoint
    const reqCall = gen.next().value;
    expect(reqCall).toBeTruthy(); // keep loose like the other specs
    // If you prefer strict:
    // expect(reqCall).toEqual(
    //   call(expect.any(Function), API_GET_SKILL_ASSESSMENT_REPORT, {
    //     method: 'GET',
    //     responseType: 'arraybuffer',
    //     headers: {},
    //     Accept: '*/*',
    //   })
    // );

    // 2) feed a successful response (arraybuffer + headers)
    const mockArrayBuffer = new ArrayBuffer(8);
    const mockRes = {
      data: mockArrayBuffer,
      headers: {
        'content-type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'content-disposition':
          'attachment; filename="skill-assessment-2024.xlsx"',
      },
    };

    const effectAfterResponse = gen.next(mockRes).value;

    // It should put SUCCESS with { blob, filename }
    // We don't assert exact blob instance identity, only shape
    const expectedPutMatcher = put({
      type: actionType,
      status: statusEnum.SUCCESS,
      payload: {
        blob: expect.any(Blob),
        filename: 'skill-assessment-2024.xlsx',
      },
    });

    // Jest can't deep-equal generator effects with expect.any directly,
    // so compare structurally:
    expect(effectAfterResponse.PUT?.action.type).toBe(expectedPutMatcher.PUT!.action.type);
    expect(effectAfterResponse.PUT?.action.status).toBe(statusEnum.SUCCESS);
    expect(effectAfterResponse.PUT?.action.payload.filename).toBe('skill-assessment-2024.xlsx');
    expect(effectAfterResponse.PUT?.action.payload.blob).toBeInstanceOf((global as any).Blob);

    // 3) generator should be done
    expect(gen.next().done).toBe(true);
  });

  it('should fallback filename when header missing and dispatch SUCCESS', () => {
    const action: any = { type: actionType, year: 2023 };
    const gen = getSkillAssessmentReportSagas(action);

    // first yield: api call
    expect(gen.next().value).toBeTruthy();

    // response without content-disposition
    const mockRes = {
      data: new Uint8Array([1, 2, 3]).buffer,
      headers: { 'content-type': 'application/octet-stream' },
    };

    const putEffect = gen.next(mockRes).value;

    // expect SUCCESS put with a defaulted filename (whatever your saga builds)
    // If your saga uses something like `skill-assessment-${year}.xlsx` as fallback:
    expect(putEffect.PUT?.action.type).toBe(actionType);
    expect(putEffect.PUT?.action.status).toBe(statusEnum.SUCCESS);
    expect(putEffect.PUT?.action.payload.blob).toBeInstanceOf((global as any).Blob);
    expect(putEffect.PUT?.action.payload.filename).toMatch(/skill-?assessment/i);

    expect(gen.next().done).toBe(true);
  });

  it('should handle API error and dispatch ERROR action', () => {
    const action: any = { type: actionType, year: 2025 };
    const gen = getSkillAssessmentReportSagas(action);

    // first yield: api call
    expect(gen.next().value).toBeTruthy();

    const mockError = { data: { message: 'network down' } };

    // throw into generator to simulate failed request
    const putEffect = gen.throw(mockError).value;

    expect(putEffect).toEqual(
      put({
        type: actionType,
        status: statusEnum.ERROR,
        payload: mockError.data,
      })
    );

    expect(gen.next().done).toBe(true);
  });
});
