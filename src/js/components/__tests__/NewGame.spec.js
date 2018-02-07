import {configure, shallow} from 'enzyme';
import React from 'react';
import NewGame from '../container/new-game/NewGame'
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('NewGame > container behavior', () => {

    it('should renders correctly', () => {
        const rendered = renderer.create(
            <NewGame/>
        );

        expect(rendered.toJSON()).toMatchSnapshot();
    });

    it('should retrieve the correct value when some option is selected', () => {
        const component = shallow(<NewGame/>);
        component.find('#level-select').simulate('change', { target: {
            value: '50' }
        });

        expect(component.find('#level-select').props().value).toBe("50");
    });

    it('should pass a selected value to the onChange function', () => {
        const component = shallow(<NewGame/>);
        component.find('#level-select').simulate('change', { target: {
            value: '50' }
        });

        expect(toJson(component)).toMatchSnapshot();
    });

    it('should call unlockAttemptFields() on level select change', () => {
        const spy = jest.spyOn(NewGame.prototype, 'unlockAttemptFields');
        const wrapper = shallow(<NewGame/>);
        wrapper.find('#level-select').simulate('change', { target: {
            value: '50' }
        });
        expect(spy).toHaveBeenCalled();
    });

});

describe('NewGame > container logic', () => {

    it('should enable attempts input when Custom level is selected', () => {
        const component = shallow(<NewGame/>);

        component.find('#level-select').simulate('change', { target: {
            value: '0' }
        });

        const attempts = component.find('#attempts')
        expect(attempts.prop('disabled')).toEqual(false);
    });

    it('should disable attempts input when Custom level is not selected', () => {
        const component = shallow(<NewGame/>);
        const attempts = component.find('#attempts')

        component.find('#level-select').simulate('change', { target: {
            value: '50' }
        });

        expect(attempts.prop('disabled')).toEqual(true);
    })

});