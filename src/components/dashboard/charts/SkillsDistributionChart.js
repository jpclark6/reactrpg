import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import '../../../../node_modules/react-vis/dist/style.css';
import { RadarChart, CircularGridLines} from 'react-vis';

class SkillsDistributionChart extends Component {
    render() {
        const { profile } = this.props;
        if (profile) {
            const strength = profile.attributes.strength;
            const intelligence = profile.attributes.intelligence;
            const stamina = profile.attributes.stamina;
            const grit = profile.attributes.grit;
            const karma = profile.attributes.karma;
            const luck = profile.attributes.luck;

            const DATA = [
                {
                    Strength: strength,
                    Intelligence: intelligence,
                    Stamina: stamina,
                    Grit: grit,
                    Karma: karma,
                    Luck: luck
                }
            ];

            const maxStat = Math.max(strength, intelligence, stamina, grit, karma, luck);

            const DOMAIN = [
                { name: 'Strength', domain: [0, maxStat], tickFormat: t => '' },
                { name: 'Intelligence', domain: [0, maxStat] },
                { name: 'Stamina', domain: [0, maxStat] },
                { name: 'Grit', domain: [0, maxStat] },
                { name: 'Karma', domain: [0, maxStat] },
                { name: 'Luck', domain: [0, maxStat] }
            ];

            return (
                maxStat === 0 ?
                <div></div>
                :
                <div className="center" style={{ margin: '15px 10px' }}>
                    <div className="center">
                        <h4>Skill Distribution</h4>
                    </div>
                    <div style={{ margin: '0px 150px' }}>
                        <RadarChart
                            data={DATA}
                            domains={DOMAIN}
                            style={{
                                polygons: {
                                    fillOpacity: 0,
                                    strokeWidth: 3
                                },
                                axes: {
                                    text: {
                                        opacity: 1
                                    }
                                },
                                labels: {
                                    textAnchor: 'middle'
                                }
                            }}
                            margin={{
                                left: 50,
                                top: 30,
                                bottom: 40,
                                right: 50
                            }}
                            tickFormat={t => ''}
                            width={300}
                            height={300}
                        >
                            <CircularGridLines
                                tickValues={[...new Array(10)].map((v, i) => i / 10 - 1)}
                            />
                        </RadarChart>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.firestore.ordered.tasks,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
        { collection: 'tasks', where: [['authorId', '==', props.auth.uid]] }
    ])
)(SkillsDistributionChart);