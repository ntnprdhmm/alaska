import { h, Component } from 'preact'
import ScrollableAnchor from 'react-scrollable-anchor'

class Acknowledgements extends Component {
  render() {
    return (
      <ScrollableAnchor id="acknowledgements">
        <section class="content-section text-center">
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <h2>Acknowledgements</h2>
                <p>
                The ALASKA contest is inspired by the BOSS competition has been jointly organized by:
                <ul>
                  <li>
                    <a href='http://lm2s.utt.fr/en/_plugins/mypage/mypage/content/cogrannr.html'>Rémi Cogranne</a>,
                    from Troyes University of Technology
                  </li>
                  <li>
                    Quentin Giboulot, from Troyes University of Technology (PhD student of Rémi Cogranne, who
                    did not really choose to be part of the organization but enjoyed it).
                  </li>
                  <li>
                    <a href='http://patrickbas.ec-lille.fr/Patrick_Bas_home_page/Home_Page.html'>Patrick Bas</a>,
                    from École central de Lille.
                  </li>
                </ul>
                We would like to thank all the individuals that help us organizing this contest. Those are mainly (but
                not exclusively) :
                <ul>
                  <li>
                    <a href='https://www.linkedin.com/in/antoine-prudhomme/'>Antoine Prudhomme</a>,
                    for creating the present website.
                  </li>
                  <li>
                    Jean-Baptiste Gobin, Florent Pergoud, Luc Rodrigues and Emile Touron for kindly provide some
                    of their raw images.
                  </li>
                  <li>
                    The computer ressource departement of Troyes University of Technology who accepted hosting
                    the website and the material.
                  </li>
                </ul>
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}

export default Acknowledgements
