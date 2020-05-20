import React from 'react';

const StatList = (props) => {
    const { profile } = props;
    return profile.isEmpty ? <h4>Loading...</h4> :
     (
        <div className="brown-text text-darken-4">
            <h3 className="center" style={{margin: "20px 0 px 12px 0px"}}>{profile.firstName}'s Stats</h3>
            <h4 className="center" style={{margin: "12px"}}>Xp: {profile.attributes.xp}</h4>
            <h4 className="center" style={{margin: "12px"}}>Level: {profile.attributes.level}</h4>
            <table className="flow-text">
                <thead>
                    <tr>
                        <th>Skill</th>
                        <th>Points</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Strength</td>
                        <td>{profile.attributes.strength}</td>
                    </tr>
                    <tr>
                        <td>Intelligence</td>
                        <td>{profile.attributes.intelligence}</td>
                    </tr>
                    <tr>
                        <td>Stamina</td>
                        <td>{profile.attributes.stamina}</td>
                    </tr>
                    <tr>
                        <td>Grit</td>
                        <td>{profile.attributes.grit}</td>
                    </tr>
                    <tr>
                        <td>Karma</td>
                        <td>{profile.attributes.karma}</td>
                    </tr>
                    <tr>
                        <td>Luck</td>
                        <td>{profile.attributes.luck}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StatList;
