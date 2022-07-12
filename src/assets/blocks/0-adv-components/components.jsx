export function AdvColorControl(props) {
    const {ColorIndicator, BaseControl} = wp.components;
    const {ColorPalette} = wp.blockEditor || wp.editor;
    const BaseLabel = BaseControl.VisualLabel ? BaseControl.VisualLabel : "span";

    const {label, value, onChange} = props;
    return (
        <BaseControl
            className="editor-color-palette-control block-editor-color-palette-control"
        >
            <BaseLabel className="components-base-control__label">
                {label}
                {value && (
                    <ColorIndicator colorValue={value} />
                )}
            </BaseLabel>
            <ColorPalette
                className="editor-color-palette-control__color-palette block-editor-color-palette-control__color-palette"
                value={value}
                onChange={onChange}
            />
        </BaseControl>
    )
}

export function AdvDateTimeControl(props) {
    const { Button, DateTimePicker,  Popover } = wp.components;
    const { Fragment, useState } = wp.element;
    const { __ } = wp.i18n;

    const [popupState, setPopupState] = useState( false );
    const togglePopup = () => {
        setPopupState( ( state ) => ! state );
    };

    const {
        buttonLabel,
        dateTimeLabel,
        date,
        onChangeDate
    } = props;

    return (
        <Fragment>
            <div className="advgb-advcalendar-control">
                <label>
                    { dateTimeLabel }
                </label>
                <div>
                    <Button
                        isLink
                        icon="calendar"
                        onClick={ () => setPopupState( togglePopup ) }
                    >
                        { date ? moment( date ).format( "MMMM DD YYYY, h:mm a" ) : buttonLabel }
                    </Button>
                </div>
            </div>
            { popupState &&
                <Popover
                    className="advgb-advcalendar-popover"
                    onClose={ setPopupState.bind( null, false ) }
                >
                    <label className="advgb-advcalendar-popover-label">
                        { dateTimeLabel }
                    </label>
                    <DateTimePicker
                        currentDate={ date }
                        onChange={ onChangeDate }
                        is12Hour={ true }
                    />
                </Popover>
            }
        </Fragment>

    )
}
