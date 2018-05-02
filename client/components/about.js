import { h, Component } from 'preact'
import ScrollableAnchor from 'react-scrollable-anchor'

class About extends Component {
  render() {
    return (
      <ScrollableAnchor id="about">
        <section class="content-section content-section--no-padding-bottom">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 margin-auto">
                <h2 class="text-center">About Alaska</h2>
                <div class="text-justify">
                  <p>
                    Since more that a decade, researchers all around the world have been striven to find novel methods
                    that allows hiding data into innocuous looking objects which are often digital media: videos,
                    sounds, images ; most frequently images. This is often refered to as "modern steganography". This
                    also give birth to another research domain usually refered to as "modern steganalysis". Indeed, in
                    while steganography was the focus of many researches, researchers have also developped various
                    methods for detecting objects, ans especially media, that contains hidden data.
                  </p>
                  <p>
                    ALASKA is the second contest on steganalysis ; after a fruitful first contest, called BOSS and
                    organized in 2010, which give birth to the developpement of large feature sets and dedicated
                    decision methods that has been extended and used for detection of steganography in images, both
                    uncompressed and compress using the JPEG standard, but also for forensics to give a few
                    exemples. The BOSS contest has also been a great success for providing a common and reference
                    dataset to the community.
                  </p>
                  <p>
                    So if BOSS contest has been a great success, why do we need a second contest ?
                    Indeed, BOSS contest geatly help the community, however, we believe that after 8 years, the field
                    has significantly changed, with the introduction of deep learning methods and with the
                    improvement of embedding techniques, and that it is time to organize a second competition to
                    benchmark current research in steganalysis.
                    Besides, we believe that BOSS dataset does not faithfully reflects the high diversity of media that
                    can be found "in the real world". Indeed those media are rather homogeneous since they are all
                    process from raw files in the same way, they are all uncompressed, in grayscale color, with have the
                    same size etc.
                  </p>
                  <p>
                    ALASKA, why such a strange name for a contest on steganalysis ? The origin of the present contest
                    finds its root in recent work that aims at detecting hidden data in highly heterogeneous images, that
                    would reflect what can be in found when inspecting images on the Internet. Surprisingly, we have
                    face tremendous difficulties on such dataset and found that the results obtained using the BOSS
                    dataset are not in agreement with what would be found in practical applications.
                    We have come with the name "steganalysis into the wild" to describe the high diversity of media
                    from the Internet and, refering to the movie and the book "into the wild" in which the hero spend a
                    while in the state of Alaska.
                    The present ALASKA contest aims at pushing the community to study the practical problems of
                    pushing steganalysis "into the wild", with highly heterogenous color images, and we have naturally
                    decided to use this name for this contest and match it with <i>Application on Large and heteregeneous
                    dataset of Steganalysis techniK for advances into the wild\\</i>.
                  </p>
                  <p>
                    Because we believe that the results of ALASKA contest are interesting for the whole community,
                    the methods used by the three competitors who achieve the best performances will be presented at
                    the ACM conference on Information Hiding and Multimedia Security (IH&MMSec) help in Paris in
                    June 2019. A special session will be dedicated to the description of ALASKA contest organization,
                    and presentation from the selected competitors.
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

export default About
