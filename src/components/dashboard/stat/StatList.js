import React from 'react';

const StatList = () => {
    return (
        <div className="brown-text text-darken-4">
            <h3 className="center">Xp 3028</h3>
            <table className="flow-text">
                <thead>
                    <tr>
                        <th>Skill</th>
                        <th>Points</th>
                        <th>Level</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Strength</td>
                        <td>2,194</td>
                        <td>42</td>
                    </tr>
                    <tr>
                        <td>Intelligence</td>
                        <td>1,328</td>
                        <td>21</td>
                    </tr>
                    <tr>
                        <td>Luck</td>
                        <td>522</td>
                        <td>14</td>
                    </tr>
                    <tr>
                        <td>Strength</td>
                        <td>2,194</td>
                        <td>42</td>
                    </tr>
                    <tr>
                        <td>Intelligence</td>
                        <td>1,328</td>
                        <td>21</td>
                    </tr>
                    <tr>
                        <td>Luck</td>
                        <td>522</td>
                        <td>14</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StatList;