/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
import React from 'react';
import Gallery from 'react-photo-gallery';
import Measure from 'react-measure';
import Lightbox from 'react-images';

class ProjectGallery extends React.Component {

	constructor(props) {
		super(props);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);

        this.state = {
            photos: this.props.project.images.map(image => {
                return {
                    src: image.path,
                    width: image.width,
                    height: image.height
                };
            })
        };

	}

    componentWillReceiveProps(nextProps) {
        this.setState({
            photos: nextProps.project.images.map(image => {
                return {
                    src: image.path,
                    width: image.width,
                    height: image.height
                };
            })
        });
    }

    openLightbox(index, event){
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
    }

    closeLightbox(){
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }

    gotoPrevious(){
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }

    gotoNext(){
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    renderGallery(){
        return(
			<Measure whitelist={['width']}>
                {
                    ({ width }) => {
                        var cols = 1;
                        if (width >= 480){
                            cols = 2;
                        }
                        if (width >= 1024){
                            cols = 3;
                        }
                        return <Gallery photos={this.state.photos} cols={cols} onClickPhoto={this.openLightbox} />
                    }
                }
			</Measure>
        );
    }

    render() {

        if (this.state.photos) {
            return (
                <div className="App">
                    {this.renderGallery()}
                    <Lightbox
                        images={this.state.photos}
                        backdropClosesModal={true}
                        onClose={this.closeLightbox}
                        onClickPrev={this.gotoPrevious}
                        onClickNext={this.gotoNext}
                        currentImage={this.state.currentImage}
                        isOpen={this.state.lightboxIsOpen}
                        width={1600}
                    />
                    {!this.state.loadedAll && <div className="loading-msg" id="msg-loading-more">Loading</div>}
                </div>
            );
        }
        else {
            return (
                <div className="App">
                    <div id="msg-app-loading" className="loading-msg">Loading</div>
                </div>
            );
        }
	}
};

export default ProjectGallery;
