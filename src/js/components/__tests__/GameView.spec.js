import {configure, shallow, mount} from 'enzyme';
import React from 'react';
import GameView from '../container/game-view/GameView'
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('GameView > presentation behavior', () => {

    it('should renders correctly', () => {
        const rendered = renderer.create(
            <GameView/>
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    });

});

describe('GameView > componentDidMount', () => {

    it('calls componentDidMount', () => {
        const spy = jest.spyOn(GameView.prototype, 'componentDidMount');
        const wrapper = mount(<GameView/>);
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
        spy.mockRestore();
    });

});