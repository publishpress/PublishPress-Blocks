( function ( wpI18n, wpBlocks, wpElement, wpBlockEditor, wpData ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { __ } = wpI18n;
    const { Fragment, Component } = wpElement;
    const { registerBlockType, createBlock } = wpBlocks;
    const { RichText } = wpBlockEditor;
    const { insertBlock } = wpData;

    const previewImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAADzCAYAAACv4wv1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACRpJREFUeNrs3b+LFP0dwPGZ3b1f/qqexERUsDEBUZsUIUgiERP/AbG3EZQUgZBAqhRp0uQHBnwsIsFOsVUCD0kRCLHQVkQ5G6+IJEI89Lw7d3ey38vuPeM8M3P7Y+5ud329YHK6PrlbHN77+c7s7BhFAAAAAAAAAEBPXNU3ajQa2/J94ROVhP9pNpu7H3oq7ng7X0TgU4w8+9go0ccjRB4XfK+45PuLH8qjTnIeT0YNPh4i8LyY45zYY4HDwLGnQ0/K4h8k+MYIkWejjnOiFzv0H3o28t4W57wYxAVL/NEmek7kRVutZMoD5dO8aGsXTfl+Jnujgshr6a+3b9/++qlTp47Mzs7ub7fbUZIkcWfb/Ap8qVarJXEcRysrK28fP368dPXq1X9nom7nTPp2aqL3NdnjPkMvi3xju3v37jcvXLjwy07g3+08+SOdJ7/PboQ+x3qSvGu1Wi/X1tYe3rlz5zdXrlz5Vzfo7JY73bea6nEfkUclS/R6+Lq4uPjjw4cP/y4EbpfBaDrBLz1//vxnJ0+e/KIbdSsVeisv9k7opVO9NsRx/EeT/OHDhyePHDnyucihGvV6/fDx48f/+ODBg5PdYVpPN5czdLMXrA0WeuaCmDjzw+rnzp2b77zq/LqzTP/M7oFKj90/O3PmzK9Onz69EP3/XFo29lo0wLtatSGew2b0169f/8HMzMwZuwWqNz8//70bN258PzXV61H+u1pbHoLX+og6Kjg+rx08ePB8Z5rP2iVQvdDWsWPHfrjF8j1vBT7SMXp26V6bm5v7tt0B22dhYeFbOaHnXaA20kSPcpYH6ak+Y1fAtpqJPr5WJS/0LS9KG/QY/aOLZFwAAzuiljk+z1u6j3wybqtLXYFtEq4ozYS9LSfjtooe2H5lny3pe0mQq+Tz5ulXG7sAdjb2odf+w/zAKDLRYScjjwqOyys56x5v8RXY2diLgq98okeD/ABg99VEDhO1dN/x0IFPYKIDQgeEDggdEDogdEDoIHRA6IDQAaEDQgeEDggdEDoIHRA6IHRA6IDQAaEDQgeEDggdhA4IHRA6IHRA6IDQAaEDQgehA0IHhA4IHRA6IHRA6IDQQeiA0AGhA0IHhA4IHRA6IHRA6CB0QOiA0AGhA0IHhA4IHfhSY5Kf/Pv37zc2GGcHDhyIGo3dTc1EB0t3QOiA0IHxMFYn48KJtbW1tShJkmhmZiZaWFiI6vW6vQTTMtFXVlY2Qm+32xuhr6+vR8vLyxu/B6Yg9BD26upq348DExh6q9Ua6s+ACQq9Vit+Go7RYYpCn5+f/8rjcRznPg4MZmzOuu/Zs2cj7HBM3jvrHh4rm/bAhIUehLfTwgZM4dIdEDowTUt3S30w0QGhA0IHx+iTya2kmARuJQUIHZjC0MOlr81m0yfWYFqP0cOdZcLNJ0LsQfjUWji2Cde/A1Mw0cMUf/fu3WbkQZjq4Q4zwJSEHqZ5nhC7ZTxMSehl94VLT3lggkMPnz3PE47Pd/v9RxB6Rebm5nJvGRVuPAGMbizGZZjc4Qx7OFYPJ+bCXWVmZ2dNc5im0Huxuz8cTPHSHRA6IHRgYo7Rh+FWUmCiA0IHoQOO0cdDuLjmw4cP9iJjLVz5udv/tNhEhx4id884xl34LMduh27pDpbuOytc6977yOo4LHdA6BV7+/ZttL6+vvn78M8n7927d+PDLcAULN3DJE9HHoQbToTbSwFTEnrRmfPeXWGBKQi97E6v7gILUxJ60a2kwsm4vDvPABMYejjhlr3pRIh8//799hBUYGzOuof7w4XYe2+vuY0UTGHovSnuvXOY0qU7IHRA6MBEHaMPquhtORiraToG550mOvRwZt7ZebB0ByZ9ooebTrjxBOMu/HNju73yNNHB0h2wdK9Q+Ehq+Fx6+MhqOEsZ7jDjRBtMUegh8uXl5ajVam0+FqIPd5gJwQNTsHQPUacj71lZWdl4EQCmIPSyO8zkvQAAExh62ZVDPs0GUxJ60XH4ONz4HoRekXB2PZx4S98fLkS+b98+ewiqaGxcnkiY6mELd311AwqY0tDT0x2YwqU7IHRA6MDEHaMPYmFhYWMDTHQQur8CEDogdEDogNABoQNCB4QOCB2EDggdEDogdEDogNABoQNCB6EDQgeEDggdEDogdEDogNBB6IDQAaEDQgeEDggdEDogdEDoIHRA6IDQAaEDQgeEDggdEDoIHRA6IHRA6IDQAaEDQgeEDkIHhA4IHRA6IHRA6MCuh57464MdkYzaXK2iJwBM8EQvfSVptVr/9VcI2+fDhw9v+hiqyaih533Dze3Vq1f/sCtg+7x8+fKfRf2ltpEmerLVq8b9+/f/1mw2X9odUL319fWle/fu/X2QoIvEZX/YaDTi7otBb6uHh7vbTNgWFxd/cvTo0Z/bLVCtZ8+e/f7EiROfd37ZDKv47tZMfW11t3Z3SzqDNxl26Z6UbZcuXfrTmzdv/mK3QHVev379xcWLF//c7ay9VYdVH6NHqR+8sT169Oj9+fPnf/rixYvf2j0wuqdPn/7h7Nmzv3jy5MlqKvJ2enLnBJ6MunTvbb2lez21hJ9JLeUb165d+8bly5d/dOjQoe/Mzs5+rZ+fAUTR6urqf5aWlh7fvHnzr7du3XrVDbq3PG+mtsJle3fpPnLocSryWk7ovfjTx/Tp/y9QvEqOciZ3Kyf0Zir0dr+hN/p8Ar0Xhd4TiVNPJBtyPbWsEDr0F3qvtbzQW5kJnnt8XhR5P6HnPZl07K1UxOk/N9GhutALJ3jU58m40tDDK0Rn+Z63tIhSAbdylh9loYsevnoiLTtI2wXTPBt63vcbaqInmamdDb73+3om8lomcrHDYKG3U4G3yqZ52bK9r9BzpnqUiTzKWbLnTXNxQ3n06ffM2yXbQNN8kGP03lTPiz39KpQXudBhsMneLog+GWaaDxRfd6rHmePz7CZyGG2iRwVRtzP/3eavKw19i9iL4s/7GaKH/CV3khNz3tn1gSIfKrqc2PPiz35vccNgUz3v60fL/H4jHzrATOxFvzbJYbipXhR/1D0mH/gjqyPFlxO8wKH64Aee4NF2RVgQfSR66DvuqMq4dzS87gsAUKKqoAEAgIn2PwEGAH9ZFbruawVFAAAAAElFTkSuQmCC';

    class itemEdit extends Component {

        constructor() {
            super( ...arguments );
        }

        componentWillMount() {
            const { attributes, setAttributes } = this.props;
            const currentBlockConfig = advgbDefaultConfig['advgb-list-item'];

            // No override attributes of blocks inserted before
            if (attributes.changed !== true) {
                if (typeof currentBlockConfig === 'object' && currentBlockConfig !== null) {
                    Object.keys(currentBlockConfig).map((attribute) => {
                        if (typeof attributes[attribute] === 'boolean') {
                            attributes[attribute] = !!currentBlockConfig[attribute];
                        } else {
                            attributes[attribute] = currentBlockConfig[attribute];
                        }
                    });
                }

                // Finally set changed attribute to true, so we don't modify anything again
                setAttributes( { changed: true } );
            }
        }

        componentDidMount() {

        }

        render() {
            const { attributes, setAttributes, clientId } = this.props;
            const { isPreview, content } = attributes;

            const insertBlockOnEnter = event => {

                console.log(event.key);

                if ( event.key !== 'Enter' ) {
                    return;
                }

                const { insertBlock } = wp.data.dispatch( 'core/block-editor' );

                const parentId = wp.data.select('core/block-editor').getBlockParents( clientId );

                // Get parent props
                const parentBlock = wp.data.select('core/block-editor').getBlocksByClientId( parentId );

                console.log('parentId',parentId);
                console.log('parentBlock',parentBlock);
                console.log('parentBlock[0].innerBlocks',parentBlock[0].innerBlocks);

                // @TODO Don't save <br> alone (when no text for a li)
                // Insert a new List item
                insertBlock(
                    createBlock( 'advgb/list-item' ),
                    parentBlock[0].innerBlocks.length, // @TODO insert in a different position if we're not pressing enter in last nested block
                    parentId
                );
            }

            return (
                isPreview ?
                    <img alt={ __( 'List item', 'advanced-gutenberg' ) } width='100%' src={ previewImageData }/>
                    :
                    <Fragment>
                        <li onKeyDown={ insertBlockOnEnter }>
                            <RichText
                                tagName="span"
                                onChange={ ( value ) =>
                                    setAttributes( { content: value } )
                                }
                                value={ content }
                                placeholder={ __( 'Type a list item', 'advanced-gutenberg' ) }
                                allowedFormats={ [
                                    'core/bold',
                                    'core/italic',
                                    'core/text-color',
                                    'core/link'
                                ] }
                            />
                        </li>
                    </Fragment>
            );
        }
    }

    const blockIcon = (
        <svg height="20" viewBox="2 2 22 22" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    );

    const blockAttrs = {
        content: {
            type: 'string',
            default: '',
        },
        changed: {
            type: 'boolean',
            default: false,
        },
        isPreview: {
            type: 'boolean',
            default: false,
        },
    };

    registerBlockType( 'advgb/list-item', {
        title: __( 'List item - PublishPress', 'advanced-gutenberg' ),
        description: __( 'Insert a list item inside List block.', 'advanced-gutenberg'),
        icon: {
            src: blockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        parent: [ 'advgb/list' ],
        category: 'advgb-category',
        attributes: blockAttrs,
        supports: {
            className: false
        },
        edit: itemEdit,
        save: function ( { attributes } ) {
            const { content } = attributes;

            return (
                <RichText.Content
                    tagName="li"
                    value={ content }
                />
            );
        },
    } );
} )( wp.i18n, wp.blocks, wp.element, wp.blockEditor, wp.data );
