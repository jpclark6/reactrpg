import React from 'react';
import TaskDetails from '../TaskDetails';
import renderer from 'react-test-renderer';

test('TaskDetails are displayed', () => {
    const task = {
        id: '1',
        title: 'Example task',
        description: 'Load other tasks',
        reward: '',
        category: 'adulting',
        difficulty: 3,
        time: 1,
        recurring: 'none',
        completed: false,
        successful: false,
        createdAt: {
            seconds: 1589924745,
            nanoseconds: 4923
        }
    }
    const component = renderer.create(
        <TaskDetails task={task} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});