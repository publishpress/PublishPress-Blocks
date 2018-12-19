(function ( wpI18n, wpHooks, wpEditor, wpComponents, wpElement ) {
    const { addFilter } = wpHooks;
    const { __ } = wpI18n;
    const { Fragment, renderToString } = wpElement;
    const { InspectorControls, PanelColorSettings, MediaUpload } = wpEditor;
    const { PanelBody, BaseControl, SelectControl, RangeControl, ToggleControl, Button } = wpComponents;

    const DIVIDER_STYLES = {
        sl1: (
            <Fragment>
                <path d="M1280 140V0H0l1280 140z" />
            </Fragment>
        ),
        sl2: (
            <Fragment>
                <path d="M1280 140V0H0l1280 140z" fill-opacity=".5" />
                <path d="M1280 98V0H0l1280 98z" />
            </Fragment>
        ),
        ar1: (
            <Fragment>
                <path d="M640 140L1280 0H0z" />
            </Fragment>
        ),
        ar2: (
            <Fragment>
                <path d="M640 139L0 0v140h1280V0L640 139z" />
            </Fragment>
        ),
        ar3: (
            <Fragment>
                <path d="M640 140L1280 0H0z" fill-opacity=".5" />
                <path d="M640 98l640-98H0z" />
            </Fragment>
        ),
        ar4: (
            <Fragment>
                <path d="M640 139L0 0v140h1280V0L640 139z" fill-opacity=".5" />
                <path d="M640 139L0 42v98h1280V42l-640 97z" />
            </Fragment>
        ),
        ar5: (
            <Fragment>
                <path d="M1280 0L640 70 0 0v140l640-70 640 70V0z" fill-opacity=".5" />
                <path d="M1280 0H0l640 70 640-70z" />
            </Fragment>
        ),
        cv1: (
            <Fragment>
                <path d="M0 0s573.08 140 1280 140V0z" />
            </Fragment>
        ),
        cv2: (
            <Fragment>
                <path d="M0 0v60s573.09 80 1280 80V0z" fill-opacity=".3" />
                <path d="M0 0v30s573.09 110 1280 110V0z" fill-opacity=".5" />
                <path d="M0 0s573.09 140 1280 140V0z" />
            </Fragment>
        ),
        cv3: (
            <Fragment>
                <path d="M0 140h1280C573.08 140 0 0 0 0z" />
            </Fragment>
        ),
        cv4: (
            <Fragment>
                <path d="M0 140h1280C573.08 140 0 0 0 0z" fill-opacity=".3" />
                <path d="M0 140h1280C573.08 140 0 30 0 30z" fill-opacity=".5" />
                <path d="M0 140h1280C573.08 140 0 60 0 60z" />
            </Fragment>
        ),
        rd1: (
            <Fragment>
                <path d="M640 140C286.54 140 0 0 0 0h1280S993.46 140 640 140z" />
            </Fragment>
        ),
        rd2: (
            <Fragment>
                <path d="M1280 140V0S993.46 140 640 139 0 0 0 0v140z" />
            </Fragment>
        ),
        rd3: (
            <Fragment>
                <path d="M0 0v.48C18.62 9.38 297.81 140 639.5 140 993.24 140 1280 0 1280 0z" fill-opacity=".3" />
                <path d="M0 .6c14 8.28 176.54 99.8 555.45 119.14C952.41 140 1280 0 1280 0H0z" fill-opacity=".5" />
                <path d="M726.29 101.2C1126.36 79.92 1281 0 1281 0H1c.05 0 325.25 122.48 725.29 101.2z" />
            </Fragment>
        ),
        rd4: (
            <Fragment>
                <path d="M725.29 101.2C325.22 122.48 0 0 0 0v140h1280V0s-154.64 79.92-554.71 101.2z" fill-opacity=".3" />
                <path d="M556.45 119.74C953.41 140 1280 14 1280 14v126H0V0s159.5 99.48 556.45 119.74z" fill-opacity=".5" />
                <path d="M640 140c353.46 0 640-140 640-139v140H0V0s286.54 140 640 140z" />
            </Fragment>
        ),
        zz1: (
            <Fragment>
                <path d="M1280 69.65l-320 49.24L320 20.4 0 69.65V0h1280v69.65z" />
            </Fragment>
        ),
        zz2: (
            <Fragment>
                <path d="M0 90.72l140-28.28 315.52 24.14L796.48 65.8 1140 104.89l140-14.17V0H0v90.72z" fill-opacity=".5" />
                <path d="M0 0v47.44L170 0l626.48 94.89L1110 87.11l170-39.67V0H0z" />
            </Fragment>
        ),
        zz3: (
            <Fragment>
                <path d="M978.81 122.25L0 0h1280l-262.1 116.26a73.29 73.29 0 0 1-39.09 5.99z" />
            </Fragment>
        ),
        zz4: (
            <Fragment>
                <path d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z" />
            </Fragment>
        ),
        zz5: (
            <Fragment>
                <path d="M978.81 122.25L0 0h1280l-262.1 116.26a73.29 73.29 0 0 1-39.09 5.99z" fill-opacity=".5" />
                <path d="M983.19 95.23L0 0h1280l-266 91.52a72.58 72.58 0 0 1-30.81 3.71z" />
            </Fragment>
        ),
        zz6: (
            <Fragment>
                <path d="M1280 0l-266 91.52a72.59 72.59 0 0 1-30.76 3.71L0 0v140h1280z" fill-opacity=".5" />
                <path d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z" />
            </Fragment>
        ),
        zz7: (
            <Fragment>
                <path d="M1280 0l-131.81 111.68c-16.47 14-35.47 21-54.71 20.17L173 94a76.85 76.85 0 0 1-36.79-11.46L0 0z" />
            </Fragment>
        ),
        zz8: (
            <Fragment>
                <path d="M1093.48 131.85L173 94a76.85 76.85 0 0 1-36.79-11.46L0 0v140h1280V0l-131.81 111.68c-16.47 13.96-35.47 20.96-54.71 20.17z" />
            </Fragment>
        ),
        zz9: (
            <Fragment>
                <path d="M1093.48 131.85L173 94a76.85 76.85 0 0 1-36.79-11.46L0 0h1280l-131.81 111.68c-16.47 13.96-35.47 20.96-54.71 20.17z" fill-opacity=".5" />
                <path d="M1094.44 119L172.7 68.72a74.54 74.54 0 0 1-25.19-5.95L0 0h1280l-133.85 102c-15.84 12.09-33.7 17.95-51.71 17z" />
            </Fragment>
        ),
        zz10: (
            <Fragment>
                <path d="M1094.44 119L172.7 68.72a74.54 74.54 0 0 1-25.19-5.95L0 0v140h1280V0l-133.85 102c-15.84 12.09-33.7 17.95-51.71 17z" fill-opacity=".5" />
                <path d="M1093.48 131.85L173 94a76.85 76.85 0 0 1-36.79-11.46L0 0v140h1280V0l-131.81 111.68c-16.47 13.96-35.47 20.96-54.71 20.17z" />
            </Fragment>
        ),
        wv1: (
            <Fragment>
                <path d="M320 28C160 28 80 49 0 70V0h1280v70c-80 21-160 42-320 42-320 0-320-84-640-84z" />
            </Fragment>
        ),
        wv2: (
            <Fragment>
                <path d="M320 28c320 0 320 84 640 84 160 0 240-21 320-42v70H0V70c80-21 160-42 320-42z" />
            </Fragment>
        ),
        wv3: (
            <Fragment>
                <path d="M0 51.76c36.21-2.25 77.57-3.58 126.42-3.58 320 0 320 57 640 57 271.15 0 312.58-40.91 513.58-53.4V0H0z" fill-opacity=".3" />
                <path d="M0 24.31c43.46-5.69 94.56-9.25 158.42-9.25 320 0 320 89.24 640 89.24 256.13 0 307.28-57.16 481.58-80V0H0z" fill-opacity=".5" />
                <path d="M0 0v3.4C28.2 1.6 59.4.59 94.42.59c320 0 320 84.3 640 84.3 285 0 316.17-66.85 545.58-81.49V0z" />
            </Fragment>
        ),
        wv4: (
            <Fragment>
                <path d="M1280 3.4C1050.59 18 1019.4 84.89 734.42 84.89c-320 0-320-84.3-640-84.3C59.4.59 28.2 1.6 0 3.4V140h1280z" fill-opacity=".3" />
                <path d="M0 24.31c43.46-5.69 94.56-9.25 158.42-9.25 320 0 320 89.24 640 89.24 256.13 0 307.28-57.16 481.58-80V140H0z" fill-opacity=".5" />
                <path d="M1280 51.76c-201 12.49-242.43 53.4-513.58 53.4-320 0-320-57-640-57-48.85.01-90.21 1.35-126.42 3.6V140h1280z" />
            </Fragment>
        ),
        wv5: (
            <Fragment>
                <path d="M0 0v100c20 17.3 40 29.51 80 29.51 51.79 0 74.69-48.57 151.75-48.57 73.72 0 91 54.88 191.56 54.88C543.95 135.8 554 14 665.69 14c109.46 0 98.85 87 188.2 87 70.37 0 69.81-33.73 115.6-33.73 55.85 0 62 39.62 115.6 39.62 58.08 0 57.52-46.59 115-46.59 39.8 0 60 22.48 79.89 39.69V0z" />
            </Fragment>
        ),
        wv6: (
            <Fragment>
                <path d="M1280 86c-19.9-17.21-40.08-39.69-79.89-39.69-57.49 0-56.93 46.59-115 46.59-53.61 0-59.76-39.62-115.6-39.62C923.7 53.27 924.26 87 853.89 87c-89.35 0-78.74-87-188.2-87C554 0 543.95 121.8 423.32 121.8c-100.52 0-117.84-54.88-191.56-54.88-77.06 0-100 48.57-151.75 48.57-40 0-60-12.21-80-29.51v54H1280z" />
            </Fragment>
        ),
        wv7: (
            <Fragment>
                <path d="M504.854,80.066c7.812,0,14.893,0.318,21.41,0.879 c-25.925,22.475-56.093,40.852-102.946,40.852c-20.779,0-37.996-2.349-52.898-6.07C413.517,107.295,434.056,80.066,504.854,80.066z M775.938,51.947c19.145,18.596,39.097,35.051,77.956,35.051c46.907,0,62.299-14.986,80.912-24.98 c-21.357-15.783-46.804-28.348-85.489-28.348C816.829,33.671,794.233,41.411,775.938,51.947z" fill-opacity=".3" />
                <path d="M1200.112,46.292c39.804,0,59.986,22.479,79.888,39.69v16.805 c-19.903-10.835-40.084-21.777-79.888-21.777c-72.014,0-78.715,43.559-147.964,43.559c-56.84,0-81.247-35.876-117.342-62.552 c9.309-4.998,19.423-8.749,34.69-8.749c55.846,0,61.99,39.617,115.602,39.617C1143.177,92.887,1142.618,46.292,1200.112,46.292z M80.011,115.488c-40.006,0-60.008-12.206-80.011-29.506v16.806c20.003,10.891,40.005,21.782,80.011,21.782 c80.004,0,78.597-30.407,137.669-30.407c55.971,0,62.526,24.026,126.337,24.026c9.858,0,18.509-0.916,26.404-2.461 c-57.186-14.278-80.177-48.808-138.66-48.808C154.698,66.919,131.801,115.488,80.011,115.488z M526.265,80.945 c56.848,4.902,70.056,28.726,137.193,28.726c54.001,0,73.43-35.237,112.48-57.724C751.06,27.782,727.548,0,665.691,0 C597.381,0,567.086,45.555,526.265,80.945z" fill-opacity=".5" />
                <path d="M0,0v85.982c20.003,17.3,40.005,29.506,80.011,29.506c51.791,0,74.688-48.569,151.751-48.569 c58.482,0,81.473,34.531,138.66,48.808c43.096-8.432,63.634-35.662,134.433-35.662c7.812,0,14.893,0.318,21.41,0.879 C567.086,45.555,597.381,0,665.691,0c61.856,0,85.369,27.782,110.246,51.947c18.295-10.536,40.891-18.276,73.378-18.276 c38.685,0,64.132,12.564,85.489,28.348c9.309-4.998,19.423-8.749,34.69-8.749c55.846,0,61.99,39.617,115.602,39.617 c58.08,0,57.521-46.595,115.015-46.595c39.804,0,59.986,22.479,79.888,39.69V0H0z" />
            </Fragment>
        ),
        wv8: (
            <Fragment>
                <path d="M853.893,86.998c-38.859,0-58.811-16.455-77.956-35.051c18.295-10.536,40.891-18.276,73.378-18.276 c38.685,0,64.132,12.564,85.489,28.347C916.192,72.012,900.8,86.998,853.893,86.998z M526.265,80.945 c-6.517-0.562-13.599-0.879-21.41-0.879c-70.799,0-91.337,27.229-134.433,35.662c14.901,3.72,32.118,6.07,52.898,6.07 C470.171,121.797,500.34,103.421,526.265,80.945z" fill-opacity=".3" />
                <path d="M663.458,109.671c-67.137,0-80.345-23.824-137.193-28.726C567.086,45.555,597.381,0,665.691,0 c61.857,0,85.369,27.782,110.246,51.947C736.888,74.434,717.459,109.671,663.458,109.671z M217.68,94.163 c55.971,0,62.526,24.026,126.337,24.026c9.858,0,18.508-0.916,26.404-2.461c-57.186-14.278-80.177-48.808-138.659-48.808 c-77.063,0-99.96,48.569-151.751,48.569c-40.006,0-60.008-12.206-80.011-29.506v16.806c20.003,10.891,40.005,21.782,80.011,21.782 C160.014,124.57,158.608,94.163,217.68,94.163z M1200.112,46.292c-57.493,0-56.935,46.595-115.015,46.595 c-53.612,0-59.755-39.618-115.602-39.618c-15.267,0-25.381,3.751-34.69,8.749c36.096,26.675,60.503,62.552,117.342,62.552 c69.249,0,75.951-43.559,147.964-43.559c39.804,0,59.986,10.943,79.888,21.777V85.982 C1260.097,68.771,1239.916,46.292,1200.112,46.292z" fill-opacity=".5" />
                <path d="M1052.147,124.57c-56.84,0-81.247-35.876-117.342-62.552c-18.613,9.994-34.005,24.98-80.912,24.98 c-38.859,0-58.811-16.455-77.956-35.051c-39.05,22.487-58.479,57.724-112.48,57.724c-67.137,0-80.345-23.824-137.193-28.726 c-25.925,22.475-56.093,40.852-102.946,40.852c-20.779,0-37.996-2.349-52.898-6.07c-7.895,1.545-16.546,2.461-26.404,2.461 c-63.811,0-70.366-24.026-126.337-24.026c-59.072,0-57.665,30.407-137.669,30.407c-40.006,0-60.008-10.891-80.011-21.782V140h1280 v-37.212c-19.903-10.835-40.084-21.777-79.888-21.777C1128.098,81.011,1121.397,124.57,1052.147,124.57z" />
            </Fragment>
        ),
    };

    // Register extra attributes to separator blocks
    addFilter( 'blocks.registerBlockType', 'advgb/registerExtraBlocksAttrs', function ( settings ) {
        if (!!settings.attributes) {
            settings.attributes = Object.assign( settings.attributes, {
                blockWidth: {
                    type: 'number',
                },
                blockBgColor: {
                    type: 'string',
                },
                blockBgImage: {
                    type: 'string',
                },
                blockBgImageID: {
                    type: 'number',
                },
                blockBgImageSize: {
                    type: 'string',
                },
                blockBgImageSizeCustom: {
                    type: 'number',
                },
                blockBgImageAlignH: {
                    type: 'string',
                },
                blockBgImageAlignV: {
                    type: 'string',
                },
                blockOverlayDisplay: {
                    type: 'boolean',
                },
                blockOverlayColor: {
                    type: 'string',
                },
                blockOverlayOpacity: {
                    type: 'number',
                },
                blockTopDivider: {
                    type: 'string',
                },
                blockTopDividerColor: {
                    type: 'string',
                },
                blockTopDividerHeight: {
                    type: 'number',
                },
                blockTopDividerPosition: {
                    type: 'number',
                },
                blockTopDividerRotateX: {
                    type: 'boolean',
                },
                blockTopDividerRotateY: {
                    type: 'boolean',
                },
                blockTopDividerOnTop: {
                    type: 'boolean',
                },
                blockBottomDivider: {
                    type: 'string',
                },
                blockBottomDividerColor: {
                    type: 'string',
                },
                blockBottomDividerHeight: {
                    type: 'number',
                },
                blockBottomDividerPosition: {
                    type: 'number',
                },
                blockBottomDividerRotateX: {
                    type: 'boolean',
                },
                blockBottomDividerRotateY: {
                    type: 'boolean',
                },
                blockBottomDividerOnTop: {
                    type: 'boolean',
                },
            } );
        }

        return settings;
    } );

    // Add option to select styles for separator
    addFilter( 'editor.BlockEdit', 'advgb/addExtraBlocksStyle', function ( BlockEdit ) {
        return ( props ) => {
            const { attributes, setAttributes, clientId } = props;
            const {
                blockWidth,
                blockBgColor,
                blockBgImage,
                blockBgImageID,
                blockBgImageSize,
                blockBgImageSizeCustom,
                blockBgImageAlignH,
                blockBgImageAlignV,
                blockOverlayDisplay,
                blockOverlayColor,
                blockOverlayOpacity,
                blockTopDivider,
                blockTopDividerColor,
                blockTopDividerHeight,
                blockTopDividerPosition,
                blockTopDividerRotateX,
                blockTopDividerRotateY,
                blockTopDividerOnTop,
                blockBottomDivider,
                blockBottomDividerColor,
                blockBottomDividerHeight,
                blockBottomDividerPosition,
                blockBottomDividerRotateX,
                blockBottomDividerRotateY,
                blockBottomDividerOnTop,
            } = attributes;

            const topDividerMod = [
                blockTopDividerRotateX && 'rotateX(180deg)',
                blockTopDividerRotateY && 'rotateY(180deg)'
            ].filter( Boolean ).join(' ');
            const topDividerElm = (
                <svg width="100%" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
                     style={ {
                         transform: topDividerMod ? topDividerMod : undefined,
                     } }
                >
                    <g fill={ blockTopDividerColor }>
                        { DIVIDER_STYLES[ blockTopDivider ] }
                    </g>
                </svg>
            );
            const topDividerString = blockTopDivider ? renderToString( topDividerElm ).replace(/preserveaspectratio/g, 'preserveAspectRatio').replace(/viewbox/g, 'viewBox') : '';
            const topDividerURI = topDividerString ? `data:image/svg+xml;base64,${window.btoa(topDividerString)}` : '';

            const bottomDividerMod = [
                blockBottomDividerRotateX && 'rotateX(180deg)',
                blockBottomDividerRotateY && 'rotateY(180deg)'
            ].filter( Boolean ).join( ' ' );
            const bottomDividerElm = (
                <svg width="100%" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
                     style={ {
                         transform: bottomDividerMod ? bottomDividerMod : undefined,
                     } }
                >
                    <g fill={ blockBottomDividerColor }>
                        { DIVIDER_STYLES[ blockBottomDivider ] }
                    </g>
                </svg>
            );
            const bottomDividerString = blockBottomDivider ? renderToString( bottomDividerElm ).replace(/preserveaspectratio/g, 'preserveAspectRatio').replace(/viewbox/g, 'viewBox') : '';
            const bottomDividerURI = bottomDividerString ? `data:image/svg+xml;base64,${window.btoa(bottomDividerString)}` : '';

            return (
                <Fragment>
                    <BlockEdit {...props} />
                    {typeof agTheme !== 'undefined' && !!agTheme.activated && (
                        <InspectorControls>
                            <PanelBody title={ __( 'Blocks Settings' ) }>
                                <RangeControl
                                    label={ __( 'Block width (%)' ) }
                                    value={ blockWidth }
                                    min={ 10 }
                                    max={ 100 }
                                    onChange={ ( value ) => setAttributes( { blockWidth: value } ) }
                                    allowReset
                                />
                                <PanelColorSettings
                                    title={ __( 'Block Color' ) }
                                    initialOpen={ false }
                                    colorSettings={ [
                                        {
                                            label: __( 'Background color' ),
                                            value: blockBgColor,
                                            onChange: ( value ) => setAttributes( { blockBgColor: value } ),
                                        },
                                        {
                                            label: __( 'Overlay color' ),
                                            value: blockOverlayColor,
                                            onChange: ( value ) => setAttributes( { blockOverlayColor: value } ),
                                        },
                                    ] }
                                />
                                {blockOverlayColor && (
                                    <Fragment>
                                        <RangeControl
                                            label={ __( 'Overlay opacity (%)' ) }
                                            value={ blockOverlayOpacity }
                                            min={ 10 }
                                            max={ 90 }
                                            onChange={ ( value ) => setAttributes( { blockOverlayOpacity: value } ) }
                                        />
                                        <ToggleControl
                                            label={ __( 'Always show overlay' ) }
                                            checked={ blockOverlayDisplay }
                                            onChange={ () => setAttributes( { blockOverlayDisplay: !blockOverlayDisplay } ) }
                                        />
                                    </Fragment>
                                ) }
                                <PanelBody title={ __( 'Block Background' ) } initialOpen={ false }>
                                    <MediaUpload
                                        allowedTypes={ ["image"] }
                                        value={ blockBgImageID }
                                        onSelect={ (image) => setAttributes( { blockBgImage: image.url, blockBgImageID: image.id } ) }
                                        render={ ( { open } ) => {
                                            return (
                                                <BaseControl label={ [
                                                    __( 'Background Image' ),
                                                    blockBgImage && (
                                                        <a key="icon-remove"
                                                           style={ { marginLeft: '10px', cursor: 'pointer' } }
                                                           onClick={ () => setAttributes( {
                                                               blockBgImage: undefined,
                                                               blockBgImageID: undefined,
                                                           } ) }
                                                        >
                                                            { __( 'Remove' ) }
                                                        </a>
                                                    )
                                                ] }
                                                >
                                                    <Button className={ 'button button-large' }
                                                            onClick={ open }
                                                    >
                                                        { __( 'Choose' ) }
                                                    </Button>
                                                    {!!blockBgImage &&
                                                    <img style={ { maxHeight: '30px', marginLeft: '10px' } }
                                                         src={ blockBgImage }
                                                         alt={ __( 'Background image' ) }/>
                                                    }
                                                </BaseControl>
                                            )
                                        } }
                                    />
                                    {!!blockBgImage && (
                                        <PanelBody title={ __( 'Background Image Options' ) }>
                                            <SelectControl
                                                label={__( 'Image Size' )}
                                                value={ blockBgImageSize }
                                                options={[
                                                    { label: __( 'Auto' ), value: 'auto' },
                                                    { label: __( 'Fit height' ), value: 'contain' },
                                                    { label: __( 'Fit width' ), value: 'cover' },
                                                    { label: __( 'Custom' ), value: 'custom' },
                                                ]}
                                                onChange={( value ) => setAttributes( { blockBgImageSize: value } )}
                                            />
                                            {blockBgImageSize === 'custom' && (
                                                <RangeControl
                                                    label={__( 'Image size (%)' )}
                                                    value={ blockBgImageSizeCustom }
                                                    min={ 1 }
                                                    max={ 100 }
                                                    onChange={ ( value ) => setAttributes( { blockBgImageSizeCustom: value } ) }
                                                />
                                            ) }
                                            <SelectControl
                                                label={__( 'Horizontal Align' )}
                                                value={ blockBgImageAlignH }
                                                options={[
                                                    { label: __( 'Left' ), value: 'left' },
                                                    { label: __( 'Center' ), value: 'center' },
                                                    { label: __( 'Right' ), value: 'right' },
                                                ]}
                                                onChange={( value ) => setAttributes( { blockBgImageAlignH: value } )}
                                            />
                                            <SelectControl
                                                label={__( 'Vertical Align' )}
                                                value={ blockBgImageAlignV }
                                                options={[
                                                    { label: __( 'Top' ), value: 'top' },
                                                    { label: __( 'Center' ), value: 'center' },
                                                    { label: __( 'Bottom' ), value: 'bottom' },
                                                ]}
                                                onChange={( value ) => setAttributes( { blockBgImageAlignV: value } )}
                                            />
                                        </PanelBody>
                                    ) }
                                </PanelBody>
                            </PanelBody>
                            <PanelBody title={ __( 'Block Dividers' ) } initialOpen={ false }>
                                <PanelBody title={ __( 'Top Divider' ) } initialOpen={ false }>
                                    <PanelBody title={ __( 'Divider Styles' ) } initialOpen={ false }>
                                        <div className="advgb-styles-select-wrapper">
                                            <div className="advgb-styles-item"
                                                 onClick={ () => setAttributes( { blockTopDivider: undefined } ) }
                                                 style={ { textAlign: 'center' } }
                                            >
                                                <span style={ { verticalAlign: 'middle' } }>{ __( 'None' ) }</span>
                                            </div>
                                            {Object.keys( DIVIDER_STYLES ).map( ( key, index ) => (
                                                <div className={`advgb-styles-item ${blockTopDivider === key && 'selected'}`}
                                                     onClick={ () => setAttributes( { blockTopDivider: key } ) }
                                                     key={ index }
                                                >
                                                    <svg width="100%" height="30px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g fill="#333">
                                                            { DIVIDER_STYLES[ key ] }
                                                        </g>
                                                    </svg>
                                                </div>
                                            ) ) }
                                        </div>
                                    </PanelBody>
                                    <PanelBody title={ __( 'Divider Modification' ) } initialOpen={ false }>
                                        {blockTopDivider ?
                                        <Fragment>
                                            <PanelColorSettings
                                                title={ __( 'Divider Color' ) }
                                                initialOpen={ false }
                                                colorSettings={ [
                                                    {
                                                        label: __( 'Color' ),
                                                        value: blockTopDividerColor,
                                                        onChange: ( value ) => setAttributes( { blockTopDividerColor: value } ),
                                                    },
                                                ] }
                                            />
                                            <RangeControl
                                                label={ __( 'Divider height(px)' ) }
                                                value={ blockTopDividerHeight }
                                                min={ 20 }
                                                max={ 500 }
                                                onChange={ (value) => setAttributes( { blockTopDividerHeight: value } ) }
                                            />
                                            <RangeControl
                                                label={ __( 'Divider position' ) }
                                                value={ blockTopDividerPosition }
                                                min={ 0 }
                                                max={ 99 }
                                                onChange={ (value) => setAttributes( { blockTopDividerPosition: value } ) }
                                            />
                                            <ToggleControl
                                                label={ __( 'Flip Horizontal' ) }
                                                checked={ blockTopDividerRotateX }
                                                onChange={ () => setAttributes( { blockTopDividerRotateX: !blockTopDividerRotateX } ) }
                                            />
                                            <ToggleControl
                                                label={ __( 'Flip Vertical' ) }
                                                checked={ blockTopDividerRotateY }
                                                onChange={ () => setAttributes( { blockTopDividerRotateY: !blockTopDividerRotateY } ) }
                                            />
                                            <ToggleControl
                                                label={ __( 'Divider on top' ) }
                                                help={ __( 'Show divider on top of text' ) }
                                                checked={ blockTopDividerOnTop }
                                                onChange={ () => setAttributes( { blockTopDividerOnTop: !blockTopDividerOnTop } ) }
                                            />
                                        </Fragment>
                                        : __( ' Choose styles first' )
                                        }
                                    </PanelBody>
                                </PanelBody>
                                <PanelBody title={ __( 'Bottom Divider' ) } initialOpen={ false }>
                                    <PanelBody title={ __( 'Divider Styles' ) } initialOpen={ false }>
                                        <div className="advgb-styles-select-wrapper">
                                            <div className="advgb-styles-item"
                                                 onClick={ () => setAttributes( { blockBottomDivider: undefined } ) }
                                                 style={ { textAlign: 'center' } }
                                            >
                                                <span style={ { verticalAlign: 'middle' } }>{ __( 'None' ) }</span>
                                            </div>
                                            {Object.keys( DIVIDER_STYLES ).map( ( key, index ) => (
                                                <div className={`advgb-styles-item ${blockBottomDivider === key && 'selected'}`}
                                                     onClick={ () => setAttributes( { blockBottomDivider: key } ) }
                                                     key={ index }
                                                >
                                                    <svg width="100%" height="30px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g fill="#333">
                                                            { DIVIDER_STYLES[ key ] }
                                                        </g>
                                                    </svg>
                                                </div>
                                            ) ) }
                                        </div>
                                    </PanelBody>
                                    <PanelBody title={ __( 'Divider Modification' ) } initialOpen={ false }>
                                        {blockBottomDivider ?
                                            <Fragment>
                                                <PanelColorSettings
                                                    title={ __( 'Divider Color' ) }
                                                    initialOpen={ false }
                                                    colorSettings={ [
                                                        {
                                                            label: __( 'Color' ),
                                                            value: blockBottomDividerColor,
                                                            onChange: ( value ) => setAttributes( { blockBottomDividerColor: value } ),
                                                        },
                                                    ] }
                                                />
                                                <RangeControl
                                                    label={ __( 'Divider height(px)' ) }
                                                    value={ blockBottomDividerHeight }
                                                    min={ 20 }
                                                    max={ 500 }
                                                    onChange={ (value) => setAttributes( { blockBottomDividerHeight: value } ) }
                                                />
                                                <RangeControl
                                                    label={ __( 'Divider position' ) }
                                                    value={ blockBottomDividerPosition }
                                                    min={ 0 }
                                                    max={ 99 }
                                                    onChange={ (value) => setAttributes( { blockBottomDividerPosition: value } ) }
                                                />
                                                <ToggleControl
                                                    label={ __( 'Flip Horizontal' ) }
                                                    checked={ blockBottomDividerRotateX }
                                                    onChange={ () => setAttributes( { blockBottomDividerRotateX: !blockBottomDividerRotateX } ) }
                                                />
                                                <ToggleControl
                                                    label={ __( 'Flip Vertical' ) }
                                                    checked={ blockBottomDividerRotateY }
                                                    onChange={ () => setAttributes( { blockBottomDividerRotateY: !blockBottomDividerRotateY } ) }
                                                />
                                                <ToggleControl
                                                    label={ __( 'Divider on top' ) }
                                                    help={ __( 'Show divider on top of text' ) }
                                                    checked={ blockBottomDividerOnTop }
                                                    onChange={ () => setAttributes( { blockBottomDividerOnTop: !blockBottomDividerOnTop } ) }
                                                />
                                            </Fragment>
                                            : __( ' Choose styles first' )
                                        }
                                    </PanelBody>
                                </PanelBody>
                            </PanelBody>
                        </InspectorControls>
                    ) }
                    <style>
                        {`#block-${clientId} .editor-block-list__block-edit {
                            max-width: ${blockWidth ? parseInt(blockWidth) + 8 : undefined}%;
                        }`}
                        {`#block-${clientId} > .editor-block-list__block-edit::before {
                            background-color: ${blockBgColor};
                            background-image: url(${blockBgImage});
                            background-size: ${blockBgImageSize === 'custom' ? blockBgImageSizeCustom + '%' : blockBgImageSize};
                            background-position: ${blockBgImageAlignV} ${blockBgImageAlignH};
                        }`}
                        {`#block-${clientId} > .editor-block-list__block-edit::after {
                            background-color: ${blockOverlayColor};
                            ${blockOverlayDisplay && `opacity: ${blockOverlayOpacity/100};`}
                        }`}
                        {!blockOverlayDisplay &&
                        `#block-${clientId} > .editor-block-list__block-edit:hover::after {
                            opacity: ${blockOverlayOpacity/100};
                        }`}
                        {blockTopDivider &&
                        `#editor div[data-block="${clientId}"]:before {
                            background-image: url(${topDividerURI});
                            height: ${blockTopDividerHeight}px;
                            z-index: ${blockTopDividerOnTop ? 5 : 0};
                            bottom: calc(100% - ${blockTopDividerPosition ? blockTopDividerPosition : 0}%);
                        }`}
                        {blockBottomDivider &&
                        `#editor div[data-block="${clientId}"]:after {
                            background-image: url(${bottomDividerURI});
                            height: ${blockBottomDividerHeight}px;
                            z-index: ${blockBottomDividerOnTop ? 5 : 0};
                            top: calc(100% - ${blockBottomDividerPosition ? blockBottomDividerPosition : 0}%);
                        }`}
                    </style>
                </Fragment>
            );
        }
    } );

    // Apply custom styles on front-end
    addFilter( 'blocks.getSaveContent.extraProps', 'advgb/saveExtraBlocksStyles', function ( extraProps, blockType, attributes ) {


        return extraProps;
    } );
})( wp.i18n, wp.hooks, wp.editor, wp.components, wp.element );