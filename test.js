it('renders without crashing (mock useSelector by call order)', () => {
    const useSelector = jest.spyOn(ReactRedux, 'useSelector');

    // Return values in the SAME ORDER the component calls useSelector.
    // Example ordering (adjust count/order if your component selects more slices):
    // 1) userRoles
    useSelector.mockReturnValueOnce({
      status: statusEnum.SUCCESS,
      data: ['IA_APPLICATION_ADMIN', 'IA_BUSINESS_UNIT_MANAGER'],
    });
    // 2) report slice (whatever your component reads, e.g., status/data/blob)
    useSelector.mockReturnValueOnce({
      status: '',
      data: {},
      error: undefined,
    });
    // If there are more selectors, keep chaining:
    // useSelector.mockReturnValueOnce(...)

    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());

    const wrapper = shallow(<EmployeeGridPage />);
    expect(wrapper.exists()).toBe(true);
  });

  it('covers error branch safely', () => {
    const useSelector = jest.spyOn(ReactRedux, 'useSelector');

    useSelector
      // userRoles
      .mockReturnValueOnce({
        status: statusEnum.SUCCESS,
        data: ['IA_APPLICATION_ADMIN'],
      })
      // report (ERROR)
      .mockReturnValueOnce({
        status: statusEnum.ERROR,
        data: {},
        error: 'boom',
      });

    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());

    const wrapper = shallow(<EmployeeGridPage />);
    expect(wrapper.text().toLowerCase()).toContain('error');
  });

  it('covers empty roles branch (no crash)', () => {
    const useSelector = jest.spyOn(ReactRedux, 'useSelector');

    useSelector
      // userRoles
      .mockReturnValueOnce({
        status: statusEnum.SUCCESS,
        data: [], // important: still provide data: []
      })
      // report
      .mockReturnValueOnce({
        status: '',
        data: {},
        error: undefined,
      });

    jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());

    const wrapper = shallow(<EmployeeGridPage />);
    expect(wrapper.exists()).toBe(true);
  });
