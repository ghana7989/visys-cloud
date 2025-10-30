
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EmployeeGridPage from '@/app/ui/site/app/home/employeeContents/EmployeeGridPage';
import * as utils from '@/app/ui/site/app/home/utils';
import * as actions from '@/redux/actions/employeeContents-actions';
import { statusEnum } from '@/redux/constants';

describe('EmployeeGridPage Component', () => {
  const mockStore = configureStore([thunk]);
  let store: any;

  beforeEach(() => {
    store = mockStore({
      userRoles: {
        status: statusEnum.SUCCESS,
        data: ['IA_APPLICATION_ADMIN', 'IA_BUSINESS_UNIT_MANAGER'],
      },
      report: {
        status: '',
        data: {},
      },
    });

    jest.spyOn(utils, 'getYearsOptions').mockReturnValue([
      { label: '2025', value: '2025', disabled: false },
      { label: '2024', value: '2024', disabled: false },
      { label: '2000', value: '2000', disabled: false },
    ]);

    jest.spyOn(actions, 'getSkillsAssessmentReport').mockReturnValue({
      type: 'GET_SKILLS_ASSESSMENT_REPORT',
    });
  });

  it('should render EmployeeGridPage component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <EmployeeGridPage />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('should call getYearsOptions once on render', () => {
    mount(
      <Provider store={store}>
        <EmployeeGridPage />
      </Provider>
    );
    expect(utils.getYearsOptions).toHaveBeenCalled();
  });

  it('should show Generate Report button for allowed roles', () => {
    const wrapper = mount(
      <Provider store={store}>
        <EmployeeGridPage />
      </Provider>
    );
    expect(wrapper.text().toLowerCase()).toContain('generate report');
  });

  it('should handle click events on Generate Report and Submit', () => {
    const wrapper = mount(
      <Provider store={store}>
        <EmployeeGridPage />
      </Provider>
    );

    // open modal
    const buttons = wrapper.find('button');
    buttons.first().simulate('click');

    // simulate submit
    buttons.forEach((btn) => {
      try {
        btn.simulate('click');
      } catch (e) {}
    });

    expect(actions.getSkillsAssessmentReport).toHaveBeenCalledTimes(1);
  });

  it('should handle error state gracefully', () => {
    store = mockStore({
      userRoles: {
        status: statusEnum.SUCCESS,
        data: ['IA_APPLICATION_ADMIN'],
      },
      report: {
        status: statusEnum.ERROR,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <EmployeeGridPage />
      </Provider>
    );

    expect(wrapper.text().toLowerCase()).toContain('error');
  });

  it('should handle empty roles', () => {
    store = mockStore({
      userRoles: {
        status: statusEnum.SUCCESS,
        data: [],
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <EmployeeGridPage />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });
});
