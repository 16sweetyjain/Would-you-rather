import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSaveAnswer } from '../actions/shared'
import QuestionComponent from './QuestionComponent';

class HomeForHome extends Component {
    constructor(props) {
        super(props)
    }

    render() {
       // console.log(this.props);
        const { answered, unanswered } = this.props;

        const ans = answered.map(qid =>{
           // console.log(qid)
        return (
            <QuestionComponent id={qid} />
        )
        })

        const unans = unanswered.map(qid =>
            <QuestionComponent id={qid} />)


        return (
            <div >
                <div>
               unanswered:->
                    {unans}
                </div>
                <div>
                    answered:->
               
                    {ans}
                </div>

            </div>
        );
    }
}

function mapStateToProps({ users, questions, authedUser }) {
    const user = users[authedUser];
    const uid = user.id
    // console.log(uid)

    const answered = Object.keys(user.answers)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    const unanswered = Object.keys(questions).filter(qid =>
        !answered.includes(qid))
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    return {

        answered, unanswered
    }
}


function mapDispatchToProps(dispatch) {
    return {
        handleSave: (qid, option) => {
            dispatch(handleSaveAnswer(qid, option))
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeForHome)