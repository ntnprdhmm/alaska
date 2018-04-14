/**
 * Check if the waiting time for this submission has expired
 * @param  {Submission}  submission
 * @return {Boolean}
 */
const isWaitingTimeExpired = (submission) => {
  if (!submission) {
    return true
  }
  const lastSubTime = new Date(submission.createdAt).getTime()
  const nextSubTime = lastSubTime + Number(process.env.SUBMISSION_WAITING_TIME)
  return nextSubTime < new Date().getTime()
}

module.exports = { isWaitingTimeExpired }
