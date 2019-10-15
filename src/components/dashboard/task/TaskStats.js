export default function calculateStatIncrease(task) {
    var strength = 0;
    var intelligence = 0;
    var stamina = 0;
    var grit = 0;
    var karma = 0;
    var luck = 0;

    var multiplier;
    var time = task.time;
    var diff = task.difficulty;

    switch (task.category) {
        case 'adulting':
            multiplier = 2 + Math.floor(Math.sqrt(time * diff));
            strength = 1 * multiplier;
            intelligence = 3 * multiplier;
            stamina = 2 * multiplier;
            grit = 2 * multiplier;
            karma = 0 * multiplier;
            luck = Math.floor(Math.random() * multiplier);
            break;
        case 'fun':
            multiplier = 2 + Math.floor(Math.sqrt(time * diff));
            strength = 1 * multiplier;
            intelligence = 1 * multiplier;
            stamina = 2 * multiplier;
            grit = 0 * multiplier;
            karma = 1 * multiplier;
            luck = Math.floor(Math.random() * multiplier);
            break;
        case 'exercise':
            multiplier = 2 + Math.floor(Math.sqrt(time * diff));
            strength = 4 * multiplier;
            intelligence = 1 * multiplier;
            stamina = 4 * multiplier;
            grit = 2 * multiplier;
            karma = 2 * multiplier;
            luck = Math.floor(Math.random() * multiplier);
            break;
        case 'chore':
            multiplier = 2 + Math.floor(Math.sqrt(time * diff));
            strength = 0 * multiplier;
            intelligence = 3 * multiplier;
            stamina = 1 * multiplier;
            grit = 2 * multiplier;
            karma = 2 * multiplier;
            luck = Math.floor(Math.random() * multiplier);
            break;
        case 'work':
            multiplier = 2 + Math.floor(Math.sqrt(time * diff));
            strength = 0 * multiplier;
            intelligence = 2 * multiplier;
            stamina = 1 * multiplier;
            grit = 1 * multiplier;
            karma = 0 * multiplier;
            luck = Math.floor(Math.random() * multiplier);
            break;
        // default:
        //     multiplier = 0;
        //     strength = 0;
        //     intelligence = 0;
        //     stamina = 0;
        //     grit = 0;
        //     karma = 0;
        //     luck = 2;
            /* falls through */
    }

    // task.category [adulting, fun, exercise, chore, work]
    // task.time 0-10
    // task.difficulty 0-10

    var stats = {
        strength: strength,
        intelligence: intelligence,
        stamina: stamina,
        grit: grit,
        karma: karma,
        luck: luck
    }

    return stats
}