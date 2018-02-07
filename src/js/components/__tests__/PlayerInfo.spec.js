import {configure, shallow} from 'enzyme';
import React from 'react';
import PlayerInfo from '../presentational/player-info/PlayerInfo'
import Adapter from 'enzyme-adapter-react-16';
import Helpers from "../container/helpers";
import renderer from 'react-test-renderer';


configure({ adapter: new Adapter() });

describe('PlayerInfo > presentation behavior', () => {

    it('should renders correctly', () => {
        const rendered = renderer.create(
            <PlayerInfo/>
        );

        expect(rendered.toJSON()).toMatchSnapshot();
    });

    it('should show startDate in correct format', () => {
        const formattedDate = Helpers.getCurrentDate();
        const regX = new RegExp(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/);
        expect(formattedDate).toMatch(regX);
    });

});
