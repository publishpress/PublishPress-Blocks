(function () {
    if (typeof (advGb_CS) === 'undefined') return;
    advGb_CS = advGb_CS.filter(function(cstyle) {return cstyle.label !== 'Paragraph'});

    tinyMCE.PluginManager.add('customstyles', function (editor, url) {
        var output = [{
            text: 'Paragraph',
            value: ' '
        }];
        for (var i = 0; i < advGb_CS.length; i++) {
            var style = {};
            classText = advGb_CS[i]['name'];
            style['text'] = advGb_CS[i]['title'];
            style['value'] = classText;
            output.push(style);
        }

        editor.addButton('customstyles', {
            type: 'listbox',
            text: 'Custom styles',
            icon: false,
            fixedWidth: true,
            onselect: function () {
                addCustomStyle(this.value());
            },
            onPostRender: createListBoxChangeHandler(),
            values: output
        });

        function addCustomStyle(classes) {
            var element = editor.selection.getNode();
            var par = editor.dom.getParent(element, 'div.wpsestyles');
            if (par) {
                if (par.className.indexOf(classes) > -1) {
                    var cont = document.createElement('p');
                    cont.id = par.id;
                    editor.dom.replace(cont, par, true);
                    editor.focus();
                    return false;
                } else {
                    par.className = 'wpsestyles ' + classes;
                    return false;
                }
            } else {
                if (element.nodeName === 'BODY') {
                    alert(data.confirmText);
                    return false;
                }
                var wrapper = document.createElement('div');
                wrapper.id = element.id;
                wrapper.className = 'wpsestyles ' + classes;
                editor.dom.replace(wrapper, element, true);
                editor.focus();
            }
        }

        function createListBoxChangeHandler() {
            return function () {
                var self = this;

                editor.on('nodeChange', function (e) {
                    var selected = editor.selection.getStart();
                    var classes = '';

                    if (selected.className && selected.className.indexOf('wpsestyles') > -1) {
                        classes = selected.className;
                        classes = classes.replace('wpsestyles ', '');
                    }

                    self.value(classes);
                })
            }
        }
    });
})();