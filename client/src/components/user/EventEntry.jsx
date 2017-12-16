import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const EventEntry = ({event, canEdit, uid, buttonAction}) => {
  
  let buttons = [
    <button key={'edit'} className="editOrVoteEventButton" onClick={()=> buttonAction('edit', event.eid, uid)}>edit</button>,
    <button key={'swipe'} className="editOrVoteEventButton" onClick={()=> buttonAction('swipe', event.eid, uid)}>vote</button>
  ]
  if (!canEdit) {
    buttons = [<button className="editOrVoteEventButton" onClick={()=> buttonAction('swipe', event.eid, uid)}>vote</button>]
  }

  let isExpired = event.voteCutOffDateTimeMoment.isBefore(moment())
  let timeLeft = event.voteCutOffDateTimeMoment.fromNow()
  if (isExpired) buttons = [null]

  if (event.groupConsensusRestaurant) {
    buttons.push(<button className="results" onClick={()=> buttonAction('swipe', event.eid, uid)}>Results</button>)
  }

  let inviteGroupButton = <Link key={event.eid} to={{pathname: './inputForm', state: {dummyData: 'dummayData'}}}><button className="inviteGroup" >Invite Group To New Meal</button></Link>
  buttons.push(inviteGroupButton)

  return (
    <tr>
      <td className="usersEventItemTitle">{event.eventName}</td>
      <td className="eventFootType">{event.foodType}</td>
      <td className="userEventCutOff">{timeLeft}</td>
      <td>{buttons}</td>
    </tr>

  )
}
export default EventEntry