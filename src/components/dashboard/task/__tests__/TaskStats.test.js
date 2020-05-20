import TaskStats from '../TaskStats';
import calculateStatIncrease from '../TaskStats';

test('TaskStats are calculated correctly', () => {
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
    const statsIncrease = calculateStatIncrease(task)
    const expectedStatsIncrase = {
        strength: 3,
        intelligence: 9,
        stamina: 6,
        grit: 6,
        karma: 0,
        luck: 1,
        xp: 25
    }
    expect(statsIncrease.strength).toBe(expectedStatsIncrase.strength);
    expect(statsIncrease.intelligence).toBe(expectedStatsIncrase.intelligence);
    expect(statsIncrease.stamina).toBe(expectedStatsIncrase.stamina);
    expect(statsIncrease.grit).toBe(expectedStatsIncrase.grit);
    expect(statsIncrease.karma).toBe(expectedStatsIncrase.karma);
});