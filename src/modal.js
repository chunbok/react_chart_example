import React from 'react';
import './modal.scss';
import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'

const myTheme = {
    'common.bi.image': 'https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png',
    'common.backgroundColor': '#ffffff',
    'header.border': '0px'
};

class Modal extends React.Component {

    constructor(props) {
        super();
    }

    componentDidMount (){
        
    }

    render() {
        return (
            <React.Fragment>
            {
              this.props.isOpen ?
              <React.Fragment>
                <div className="Modal-overlay" onClick={this.props.close()} />
                <div className="Modal">
                  <p className="title">차트수정</p>
                  <div className="content">
                  <ImageEditor
                    includeUI={{
                                    loadImage: {
                                        path: this.props.imageObject,
                                        name: 'loadImage'
                                    },
                                    theme: myTheme,
                                    menu: ['text'],
                                    uiSize: {
                                        width: '950px',
                                        height: '500px'
                                    },
                                    menuBarPosition: 'bottom'
                                    }}
                                    cssMaxHeight={500}
                                    cssMaxWidth={950}
                                    selectionStyle={{
                                        cornerSize: 20,
                                        rotatingPointOffset: 70
                                    }}
                    usageStatistics={true}
                />
                  </div>
                  <div className="button-wrap">
                    <button>Confirm</button>
                  </div>
                </div>
              </React.Fragment>
              :
              null
            }   
            </React.Fragment>
        )
    }
    
}
export default Modal;