import React, {Component, Fragment} from 'react';
import {List, AutoSizer} from "react-virtualized";

import ImgLoader from './image_loader';

class LabelLister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resized: false,
            rowHeight: 400
        };
        this.rowHeight = 400;
    }

    resizeRowHeight = (rowHeight) => {
        this.setState({rowHeight});
    }

    renderImage = ({index, key, style, parent}) => {
        const items = [];
        const fromIndex = index * 2;
        const toIndex = Math.min(fromIndex + 2, this.props.data.length);

        for (let i = fromIndex; i < toIndex; i++) {
            items.push(<ImgLoader
                key={this.props.data[i].Img_Name + this.props.data[i].Left}
                rowheight={this.resizeRowHeight}
                imgdata={this.props.data[i]}/>);
        }
        return (
            <div id="image-containerX" className='Row' key={key} style={style}>
                {items}
            </div>
        );
    }

    render() {
        return <Fragment>
            <AutoSizer>
                {({width, height}) => {
                    return <List
                        className='List'
                        width={width}
                        height={height}
                        rowHeight={this.state.rowHeight}
                        rowRenderer={this.renderImage}
                        rowCount={this.props.data.length / 2}
                        overscanRowCount={4}/>
                }}
            </AutoSizer>
        </Fragment>;
    }
}

export default LabelLister;