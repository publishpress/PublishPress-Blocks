#!/usr/bin/env bash

locales=( es_MX es_ES it_IT fr_FR nb_NO da_DK de_DE ja pl_PL ro_RO zh_CN )

for locale in "${locales[@]}"
do
    npx po2json ./languages/advanced-gutenberg-$locale.po ./languages/advanced-gutenberg-$locale-editor.json -f jed1.x
done
