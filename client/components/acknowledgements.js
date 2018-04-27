import { h, Component } from 'preact'
import ScrollableAnchor from 'react-scrollable-anchor'
import List from './list'

class Acknowledgements extends Component {
  render () {
    const list1 = {
      text: `The ALASKA contest is inspired by the BOSS competition has been jointly organized by:`,
      elements: [
        <div>
          <a href='http://lm2s.utt.fr/en/_plugins/mypage/mypage/content/cogrannr.html'>Rémi Cogranne</a>,
          from Troyes University of Technology
        </div>,
        <div>
          Quentin Giboulot, from Troyes University of Technology (PhD student of Rémi Cogranne, who
          did not really choose to be part of the organization but enjoyed it).
        </div>,
        <div>
          <a href='http://patrickbas.ec-lille.fr/Patrick_Bas_home_page/Home_Page.html'>Patrick Bas</a>,
          from École central de Lille.
        </div>
      ]
    }

    const list2 = {
      text: `We would like to thank all the individuals that help us organizing this contest. Those are mainly (but
        not exclusively) :`,
      elements: [
        <div>
          <a href='https://www.linkedin.com/in/antoine-prudhomme/'>Antoine Prudhomme</a>,
          for creating the present website.
        </div>,
        <div>
          Jean-Baptiste Gobin, Florent Pergoud, Luc Rodrigues and Emile Touron for kindly provide some
          of their raw images.
        </div>,
        <div>
          The computer ressource departement of Troyes University of Technology who accepted hosting
          the website and the material.
        </div>
      ]
    }

    return (
      <ScrollableAnchor id="acknowledgements">
        <section class="content-section text-center">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 margin-auto">
                <h2 class="text-center">Acknowledgements</h2>
                <div class="text-justify">
                  <p>
                    <List {...list1} />
                    <List {...list2} />
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

export default Acknowledgements
