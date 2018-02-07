import {configure} from 'enzyme';
import React from 'react';
import PlayerInfo from '../presentational/player-info/PlayerInfo'
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('PlayerInfo > presentation behavior', () => {

    it('should renders correctly', () => {
        const rendered = renderer.create(
            <PlayerInfo/>
        );

        expect(rendered.toJSON()).toMatchSnapshot();
    });

});
