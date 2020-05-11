/** BASED ON
* @file insert Non-Breaking Space for CKEditor
* Copyright (C) 2016 Kevin Wenger of Antistatique
* Create a command and enable the Ctrl+Space shortcut
* to insert a non-breaking space in CKEditor
* Also add a non-breaking space button
*/


(function ($, CKEDITOR) {

  CKEDITOR.plugins.add('nbsp', {
    icons: 'nbsp',
//    hidpi: true,

    beforeInit: function (editor) {
      editor.addContentsCss(this.path + 'css/ckeditor.nbsp.css')
    },
    init: function (editor) {
      // Insert &nbsp; if Ctrl+Shift+Space is pressed:
      editor.addCommand('insertNbsp', {
        exec: function (editor) {
			var ecommand = editor.getCommand('ShowHideNbsp');
			if ( ecommand.state == CKEDITOR.TRISTATE_OFF ) {
				editor.insertHtml('&nbsp;')
			} else {
				editor.insertHtml('<span class="nbsp">&nbsp;</span>')
			}	
        }
      })
      editor.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 32 /* space */, 'insertNbsp')

      editor.addCommand('ShowHideNbsp', {
        exec: function (editor) {
			var edata = editor.getData();
			var ecommand = editor.getCommand('ShowHideNbsp');
			if ( ecommand.state == CKEDITOR.TRISTATE_OFF ) {
				var replaced_text = edata.replace(/<span.*?<\/span>|(&nbsp;)/g, '<span class="nbsp">&nbsp;</span>');
				ecommand.setState(CKEDITOR.TRISTATE_ON)
			} else {
				var replaced_text = edata.replace(/<span class="nbsp">&nbsp;<\/span>/g, '&nbsp;');
				ecommand.setState(CKEDITOR.TRISTATE_OFF)
			}
			editor.setData(replaced_text);        	
        }
      })

      editor.addCommand('ClearNbsp', {
        exec: function (editor) {
			var edata = editor.getData();
			var replaced_text = edata.replace(/<span class="nbsp">&nbsp;<\/span>/g, ' ');
			replaced_text = replaced_text.replace(/&nbsp;/g, ' ');
			editor.setData(replaced_text);        	
        }
      })

      // Register the toolbar button.
      if (editor.ui.addButton) {
        editor.ui.addButton('Nbsp_ShowHide', {
          label: 'Show/Hide Non-breaking space',
          command: 'ShowHideNbsp',
          icon: this.path + 'icons/nbsp.png',
          toolbar: 'others',
        })
      }

      if (editor.ui.addButton) {
        editor.ui.addButton('Nbsp_Insert', {
          label: 'Insert Non-breaking space',
          command: 'insertNbsp',
          icon: this.path + 'icons/nbsp_i.png',
          toolbar: 'others',
        })
      }

      if (editor.ui.addButton) {
        editor.ui.addButton('Nbsp_Clear', {
          label: 'Clear Non-breaking space',
          command: 'ClearNbsp',
          icon: this.path + 'icons/nbsp_c.png',
          toolbar: 'others',
        })
      }

    }
  })
})(jQuery, CKEDITOR)
