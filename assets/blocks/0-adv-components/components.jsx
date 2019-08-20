export function AdvColorControl(props) {
    const {ColorIndicator, BaseControl} = wp.components;
    const {ColorPalette} = wp.blockEditor || wp.editor;

    const {label, value, onChange} = props;

    return (
        <BaseControl
            className="editor-color-palette-control block-editor-color-palette-control"
        >
            <BaseControl.VisualLabel>
                {label}
                {value && (
                    <ColorIndicator colorValue={value}/>
                )}
            </BaseControl.VisualLabel>
            <ColorPalette
                className="editor-color-palette-control__color-palette block-editor-color-palette-control__color-palette"
                value={value}
                onChange={onChange}
            />
        </BaseControl>
    )
}