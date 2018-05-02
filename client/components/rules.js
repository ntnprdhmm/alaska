import { h, Component } from 'preact'
import ScrollableAnchor from 'react-scrollable-anchor'
import List from './list'

class Rules extends Component {
  render() {
    const list = {
      text: `The contest will take place from 1st of September 2018 to 28th of February 2019, lasting
      6 months in total. The rules are the following :`,
      elements: [
          <div>
            Competitors cannot submit more than a trial per hour.
          </div>,
          <div>
            Competitors must create an account to be able to participate and to download any material. The
            accounts will only be used for statistical purposes and to ensure that the limit of one submission per
            hour.
          </div>,
          <div>
            Each submission is evaluated over a randomly selected subset of 80% of the testing set. The final
            results, when contest closes, will be adjusted with evaluation over the whole testing set.
          </div>,
          <div>
            The ranking is made using the missed detection empirical probability for a fixed empirical
            probability of false alarm of 5%. We will count of many images with hidden data are incorrectly
            classified as not containing hidden data when 5% of images that does not contain hidden data are
            incorrectly classified as containing hidden data
          </div>,
          <div>
            Each submission is made by uploading a file containing the image numbers ordered from the most
            likely containing hidden data to the less likely one. This will allow us to process submission to
            compute false alarm and missed detection probabilities when adjusting the threshold ; typically to
            draw ROC curves.
          </div>,
          <div>
            An exemple of valid submission file is provided in the <b>submit an answer</b> section.
          </div>
      ]
    }

    return (
      <ScrollableAnchor id="rules">
        <section class="content-section text-center">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 margin-auto">
                <h2 class="text-center">Rules</h2>
                <div class="text-justify">
                  <p>
                    <List {...list} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}

export default Rules
