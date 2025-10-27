describe('skillAssessmentReportReducer', () => {
  it('returns initial state for unknown action', () => {
    const state = skillAssessmentReportReducer(undefined, { type: 'UNKNOWN_ACTION' } as AnyAction);

    // Don’t rely on exact shape—just ensure the key fields exist
    expect(state).toBeTruthy();
    expect(state).toEqual(
      expect.objectContaining({
        status: expect.anything(),
      })
    );
    // data may be undefined/null/empty; just assert the key exists
    expect('data' in state).toBe(true);
  });

  it('handles GET_SKILL_ASSSESSMENT_REPORT (SUCCESS) and stores blob + filename', () => {
    const mockPayload = {
      blob: new (global as any).Blob(['abc'], { type: 'application/octet-stream' }),
      filename: 'skill-assessment-2024.xlsx',
    };

    const action: AnyAction = {
      type: GET_SKILL_ASSSESSMENT_REPORT, // note: your file shows GET_SKILL_ASSESSMENT_REPORT; use your exact constant
      status: statusEnum.SUCCESS,
      payload: mockPayload,
    } as any;

    const state = skillAssessmentReportReducer(undefined, action);

    // The reducer returns { data: payload, status }
    expect(state).toEqual(
      expect.objectContaining({
        status: statusEnum.SUCCESS,
        data: expect.objectContaining({
          filename: 'skill-assessment-2024.xlsx',
        }),
      })
    );
    expect(state.data.blob).toBeTruthy();
  });

  it('handles GET_SKILL_ASSSESSMENT_REPORT (ERROR) and stores error payload', () => {
    const mockError = { message: 'failed to fetch report' };

    const action: AnyAction = {
      type: GET_SKILL_ASSSESSMENT_REPORT,
      status: statusEnum.ERROR,
      payload: mockError,
    } as any;

    const state = skillAssessmentReportReducer(undefined, action);

    expect(state.status).toBe(statusEnum.ERROR);
    expect(state.data).toEqual(expect.objectContaining({ message: 'failed to fetch report' }));
  });
});
