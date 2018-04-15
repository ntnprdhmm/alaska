import { h, Component } from 'preact'

class Download extends Component {
  render() {
    return (
      <section id="dataset" class="download-section content-section text-center">
        <div class="container">
          <div class="col-lg-8 mx-auto">
            <h2>Alaska Dataset</h2>
            <p>You can download the images for the Alaska challenge by clicking on the link bellow.</p>
            <a href="" class="btn btn-default btn-lg">
              Download images
            </a>
          </div>
        </div>
      </section>
    )
  }
}

export default Download
