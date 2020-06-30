import React from 'react';
import {shallow} from 'enzyme';
import ExternalLink from './ExternalLink';

describe('ExternalLink', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<ExternalLink label="test label" url="http://example.com"/>)
            expect(component).toMatchSnapshot()
        });
    });
});
