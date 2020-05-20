import React from 'react';
import StatList from '../StatList';
import renderer from 'react-test-renderer';

test('StatList is displayed', () => {
    const profile = {
        attributes: {
            grit: 0,
            intelligence: 0,
            karma: 0,
            level: 1,
            luck: 0,
            stamina: 0,
            strength: 0,
            xp: 0
        },
        firstName: "Bob",
        isEmpty: false,
        isLoaded: true,
        lastName: "Bobalo"
    }
    const tasks = [
        {
            id: '1',
            title: 'Example task',
            description: 'Load other tasks',
            reward: '',
            category: 'adulting',
            difficulty: 3,
            time: 1,
            recurring: 'none',
            completed: false,
            successful: false
        }
    ]
    const component = renderer.create(
        <StatList profile={profile} tasks={tasks} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});