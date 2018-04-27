import { h, Component } from 'preact'
import ScrollableAnchor from 'react-scrollable-anchor'

class Material extends Component {
  render() {
    return (
      <ScrollableAnchor id="material">
        <section class="download-section content-section text-center">
          <div class="container">
            <div class="col-lg-10 margin-auto">
              <h2 class="text-center">Material</h2>
              <div class="text-justify">
                <p>
                  The material are mostly of three kind.
                  <ul>
                    <li>
                      First, and perhaps most important ones, we provide two datasets. The training dataset consists of a
                      set of 50,000 raw images. The testing dataset consists of a subset of 5,000 (color) images
                      compressed using the JPEG standard which some of those containing hidden data. The competitors
                      should find which images contain hidden data, and which images don’t.
                    </li>
                    <li>
                      We provide a set of scripts that have been used to convert the raw images into jpeg format. This
                      python script uses library such as <a href="http://www.numpy.org/">numpy</a> (version xx),
                      <a href="https://pillow.readthedocs.io/en/5.1.x/">pillow</a> (version xx), ... and the open
                      source software image manipulation software <a href="http://rawtherapee.com/">Rawtherapee</a>
                      (version 5.4).
                      Those scripts are those that we have used to generate the images from the testing dataset.
                    </li>
                    <li>
                      Eventually, we also provide the code of the embedding methods that have been used. Some are
                      current-art embedding methods, such as J-UNIWARD and XXX while some are rather old and rusty
                      steganographic schemes such as ns-F5 and ....
                      ns-F5
                    </li>
                  </ul>
                </p>
              </div>
              <a href="" class="btn btn-default btn-lg">
                Download
              </a>
            </div>
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}

export default Material
